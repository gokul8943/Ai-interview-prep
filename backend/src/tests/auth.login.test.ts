import { beforeAll, afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app, clearDatabase, connectTestDb, createUser, disconnectTestDb, resetRateLimiterStore } from "./helpers";

const API = "/auth/v1/sign-in";

describe("POST /auth/v1/sign-in", () => {
    beforeAll(connectTestDb);
    afterAll(disconnectTestDb);
    beforeEach(async () => {
        await clearDatabase();
        resetRateLimiterStore();
    });

    it("returns an access token, sets an HttpOnly refresh cookie, and hides secrets", async () => {
        await createUser({ email: "user@example.com", password: "Password123" });

        const response = await request(app).post(API).send({ email: "user@example.com", password: "Password123" });

        expect(response.status).toBe(200);
        expect(typeof response.body.accessToken).toBe("string");
        expect(response.body.refreshToken).toBeUndefined();
        expect(response.body.user.password).toBeUndefined();

        const setCookie = (response.headers["set-cookie"] as unknown as string[]) ?? [];
        const refreshCookie = setCookie.find((cookie) => cookie.startsWith("ip_rt="));
        expect(refreshCookie).toBeTruthy();
        expect(refreshCookie).toMatch(/HttpOnly/i);
        expect(refreshCookie).toMatch(/SameSite=Lax/i);
        expect(refreshCookie).toMatch(/Path=\/auth/i);
    });

    it("returns a uniform 401 for unknown email and wrong password", async () => {
        await createUser({ email: "known@example.com", password: "Password123" });

        const unknown = await request(app).post(API).send({ email: "unknown@example.com", password: "Password123" });
        const wrongPassword = await request(app).post(API).send({ email: "known@example.com", password: "WrongPassword1" });

        expect(unknown.status).toBe(401);
        expect(wrongPassword.status).toBe(401);
        expect(unknown.body.message).toBe(wrongPassword.body.message);
    });

    it("is case-insensitive on email", async () => {
        await createUser({ email: "casey@example.com", password: "Password123" });

        const response = await request(app).post(API).send({ email: "CASEY@example.com", password: "Password123" });

        expect(response.status).toBe(200);
    });

    it("upgrades a legacy low-cost password hash on successful login", async () => {
        const bcrypt = (await import("bcrypt")).default;
        const weakHash = await bcrypt.hash("Password123", 8);
        const { user } = await createUser({ email: "legacy@example.com", password: "Password123" });
        await (await import("../framework/models/user.model")).default.updateOne(
            { _id: user._id },
            { $set: { password: weakHash } }
        );

        const response = await request(app).post(API).send({ email: "legacy@example.com", password: "Password123" });
        expect(response.status).toBe(200);

        const stored = await (await import("../framework/models/user.model")).default.findById(user._id);
        const rounds = Number(/^\$2[aby]\$(\d{2})\$/.exec(stored!.password)![1]);
        expect(rounds).toBeGreaterThanOrEqual(12);
    });

    it("rate limits repeated login attempts", async () => {
        await createUser({ email: "target@example.com", password: "Password123" });

        for (let i = 0; i < 5; i++) {
            await request(app).post(API).send({ email: "target@example.com", password: "WrongPassword1" });
        }
        const limited = await request(app).post(API).send({ email: "target@example.com", password: "Password123" });

        expect(limited.status).toBe(429);
    });
});
