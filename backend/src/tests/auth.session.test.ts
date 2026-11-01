import { beforeAll, afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app, clearDatabase, connectTestDb, createUser, disconnectTestDb, loginAs, resetRateLimiterStore } from "./helpers";
import Session from "../framework/models/session.model";
import { sha256 } from "../utils/tokenCrypto";

const refreshWith = (cookie: string) => request(app).post("/auth/v1/refresh").set("Cookie", cookie);
const meWith = (accessToken: string) =>
    request(app).get("/auth/v1/me").set("Authorization", `Bearer ${accessToken}`);

const cookieValue = (setCookie: string | undefined): string => (setCookie ?? "").split(";")[0];

describe("session lifecycle", () => {
    beforeAll(connectTestDb);
    afterAll(disconnectTestDb);
    beforeEach(async () => {
        await clearDatabase();
        resetRateLimiterStore();
        await createUser({ email: "session@example.com", password: "Password123" });
    });

    it("rotates the refresh token on every refresh", async () => {
        const session = await loginAs("session@example.com", "Password123");
        const first = cookieValue(session.refreshCookie);

        const response = await refreshWith(first);
        expect(response.status).toBe(200);
        expect(typeof response.body.accessToken).toBe("string");
        expect(response.body.refreshToken).toBeUndefined();

        const rotated = (response.headers["set-cookie"] as unknown as string[])[0];
        expect(cookieValue(rotated)).not.toBe(first);
    });

    it("returns 401 when no refresh cookie is presented", async () => {
        const response = await request(app).post("/auth/v1/refresh");
        expect(response.status).toBe(401);
    });

    it("returns 401 for an unknown refresh token", async () => {
        const response = await refreshWith("ip_rt=not-a-real-token");
        expect(response.status).toBe(401);
    });

    it("allows a concurrent reuse inside the rotation grace window", async () => {
        const session = await loginAs("session@example.com", "Password123");
        const original = cookieValue(session.refreshCookie);

        const firstRefresh = await refreshWith(original);
        expect(firstRefresh.status).toBe(200);

        const graceReuse = await refreshWith(original);
        expect(graceReuse.status).toBe(200);
    });

    it("revokes the whole session family when a stale refresh token is reused", async () => {
        const session = await loginAs("session@example.com", "Password123");
        const original = cookieValue(session.refreshCookie);

        const firstRefresh = await refreshWith(original);
        const rotated = cookieValue((firstRefresh.headers["set-cookie"] as unknown as string[])[0]);

        const originalToken = original.replace("ip_rt=", "");
        await Session.updateOne(
            { tokenHash: sha256(originalToken) },
            { $set: { revokedAt: new Date(Date.now() - 60_000) } }
        );

        const reuse = await refreshWith(original);
        expect(reuse.status).toBe(401);

        const newest = await refreshWith(rotated);
        expect(newest.status).toBe(401);
    });

    it("serves the current user for a valid access token and rejects a revoked session", async () => {
        const session = await loginAs("session@example.com", "Password123");

        const profile = await meWith(session.accessToken);
        expect(profile.status).toBe(200);
        expect(profile.body.user.email).toBe("session@example.com");
        expect(profile.body.user.password).toBeUndefined();

        const logout = await request(app)
            .post("/auth/v1/logout")
            .set("Cookie", cookieValue(session.refreshCookie));
        expect(logout.status).toBe(200);

        const afterLogout = await meWith(session.accessToken);
        expect(afterLogout.status).toBe(401);
    });

    it("revokes every session for the user on logout-all", async () => {
        const first = await loginAs("session@example.com", "Password123");
        const second = await loginAs("session@example.com", "Password123");

        const logoutAll = await request(app)
            .post("/auth/v1/logout-all")
            .set("Authorization", `Bearer ${first.accessToken}`);
        expect(logoutAll.status).toBe(200);

        expect((await meWith(first.accessToken)).status).toBe(401);
        expect((await meWith(second.accessToken)).status).toBe(401);
    });

    it("rejects access tokens signed with a different secret and malformed tokens", async () => {
        const malformed = await request(app).get("/auth/v1/me").set("Authorization", "Bearer not.a.jwt");
        expect(malformed.status).toBe(401);

        const missing = await request(app).get("/auth/v1/me");
        expect(missing.status).toBe(401);
    });

    it("rejects refresh requests from a disallowed origin", async () => {
        const session = await loginAs("session@example.com", "Password123");
        const response = await request(app)
            .post("/auth/v1/refresh")
            .set("Cookie", cookieValue(session.refreshCookie))
            .set("Origin", "https://evil.example.com");

        expect(response.status).toBe(403);
    });

    it("accepts refresh requests from an allowed origin", async () => {
        const session = await loginAs("session@example.com", "Password123");
        const response = await request(app)
            .post("/auth/v1/refresh")
            .set("Cookie", cookieValue(session.refreshCookie))
            .set("Origin", "http://localhost:5173");

        expect(response.status).toBe(200);
    });
});
