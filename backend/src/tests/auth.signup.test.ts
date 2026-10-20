import { beforeAll, afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app, clearDatabase, connectTestDb, disconnectTestDb, registerUser, resetRateLimiterStore } from "./helpers";
import User from "../framework/models/user.model";

const API = "/auth/v1/sign-up";

describe("POST /auth/v1/sign-up", () => {
    beforeAll(connectTestDb);
    afterAll(disconnectTestDb);
    beforeEach(async () => {
        await clearDatabase();
        resetRateLimiterStore();
    });

    it("creates an account and never returns the password hash", async () => {
        const response = await registerUser("newbie@example.com");

        expect(response.status).toBe(201);
        expect(response.body.user).toMatchObject({
            name: "Test User",
            email: "newbie@example.com",
            isVerified: false,
        });
        expect(response.body.user.password).toBeUndefined();

        const stored = await User.findOne({ email: "newbie@example.com" });
        expect(stored).toBeTruthy();
        expect(stored!.password).not.toBe("Password123");
        expect(stored!.password.startsWith("$2")).toBe(true);
    });

    it("normalizes email casing and stores an international phone number", async () => {
        const response = await registerUser("MixedCase@Example.com", "Password123", {
            phone: "+1 555 123 4567",
        });

        expect(response.status).toBe(201);
        const stored = await User.findOne({ email: "mixedcase@example.com" });
        expect(stored).toBeTruthy();
        expect(stored!.phone).toBe("+15551234567");
    });

    it("rejects duplicate emails with 409", async () => {
        await registerUser("dupe@example.com");
        const second = await registerUser("dupe@example.com");

        expect(second.status).toBe(409);
        expect(second.body.message).toBeTruthy();
    });

    it("rejects duplicate phone numbers with 409", async () => {
        await registerUser("phone-a@example.com", "Password123", { phone: "+15550001111" });
        const second = await registerUser("phone-b@example.com", "Password123", { phone: "+15550001111" });

        expect(second.status).toBe(409);
    });

    it("allows multiple users without a phone (sparse unique index)", async () => {
        const first = await registerUser("nophone-a@example.com");
        const second = await registerUser("nophone-b@example.com");

        expect(first.status).toBe(201);
        expect(second.status).toBe(201);
    });

    it("rejects weak passwords and malformed input with 400", async () => {
        const shortPassword = await registerUser("short@example.com", "short");
        expect(shortPassword.status).toBe(400);

        const badEmail = await request(app).post(API).send({ name: "X", email: "not-an-email", password: "Password123" });
        expect(badEmail.status).toBe(400);

        const badPhone = await registerUser("badphone@example.com", "Password123", { phone: "12345" });
        expect(badPhone.status).toBe(400);

        const noName = await request(app).post(API).send({ email: "noname@example.com", password: "Password123" });
        expect(noName.status).toBe(400);
    });

    it("ignores privilege fields supplied by the client (no mass assignment)", async () => {
        const response = await registerUser("escalate@example.com", "Password123", {
            role: "admin",
            isVerified: true,
        });

        expect(response.status).toBe(201);
        const stored = await User.findOne({ email: "escalate@example.com" });
        expect(stored!.role).toBe("user");
        expect(stored!.isVerified).toBe(false);
    });

    it("rate limits repeated signup attempts", async () => {
        for (let i = 0; i < 5; i++) {
            await registerUser(`flood-${i}@example.com`);
        }
        const limited = await registerUser("flood-final@example.com");

        expect(limited.status).toBe(429);
    });
});
