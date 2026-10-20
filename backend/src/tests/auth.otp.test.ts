import { beforeAll, afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import type { Mock } from "vitest";
import { app, clearDatabase, connectTestDb, createUser, disconnectTestDb, resetRateLimiterStore } from "./helpers";
import Otp from "../framework/models/otp.model";
import User from "../framework/models/user.model";
import { sha256 } from "../utils/tokenCrypto";

vi.mock("../utils/sendOtpEmail", () => ({
    sendOtpEmail: vi.fn(async () => undefined),
}));

import { sendOtpEmail } from "../utils/sendOtpEmail";

const mailerMock = sendOtpEmail as unknown as Mock;

const sendOtpFor = (email: string) => request(app).post("/auth/v1/generate-otp").send({ email });
const verifyOtpFor = (email: string, otp: string) => request(app).post("/auth/v1/verify-otp").send({ email, otp });

const lastSentOtp = (): string => {
    const calls = mailerMock.mock.calls;
    return calls[calls.length - 1][1] as string;
};

describe("OTP verification", () => {
    beforeAll(connectTestDb);
    afterAll(disconnectTestDb);
    beforeEach(async () => {
        await clearDatabase();
        resetRateLimiterStore();
        mailerMock.mockClear();
        await createUser({ email: "otp@example.com", password: "Password123" });
    });

    it("stores only a hash of the OTP and never returns it in the response", async () => {
        const response = await sendOtpFor("otp@example.com");

        expect(response.status).toBe(200);
        expect(JSON.stringify(response.body)).not.toMatch(/\b\d{6}\b/);

        const code = lastSentOtp();
        expect(code).toMatch(/^\d{6}$/);

        const record = await Otp.findOne({ email: "otp@example.com" });
        expect(record).toBeTruthy();
        expect(record!.otp).toBe(sha256(code));
        expect(record!.otp).not.toBe(code);
    });

    it("does not reveal whether an email is registered", async () => {
        const unknown = await sendOtpFor("nobody@example.com");
        const known = await sendOtpFor("otp@example.com");

        expect(unknown.status).toBe(200);
        expect(known.status).toBe(200);
        expect(unknown.body.message).toBe(known.body.message);
        expect(mailerMock).toHaveBeenCalledTimes(1);
    });

    it("verifies the user and consumes the OTP on a correct code", async () => {
        await sendOtpFor("otp@example.com");
        const code = lastSentOtp();

        const response = await verifyOtpFor("otp@example.com", code);
        expect(response.status).toBe(200);

        const user = await User.findOne({ email: "otp@example.com" });
        expect(user!.isVerified).toBe(true);
        expect(await Otp.findOne({ email: "otp@example.com" })).toBeNull();
    });

    it("rejects a wrong code and locks out after the maximum number of attempts", async () => {
        await sendOtpFor("otp@example.com");
        const code = lastSentOtp();

        for (let attempt = 0; attempt < 5; attempt++) {
            resetRateLimiterStore();
            const response = await verifyOtpFor("otp@example.com", "000000");
            expect(response.status).toBe(400);
        }

        resetRateLimiterStore();
        const correctAfterLockout = await verifyOtpFor("otp@example.com", code);
        expect(correctAfterLockout.status).toBe(400);

        const user = await User.findOne({ email: "otp@example.com" });
        expect(user!.isVerified).toBe(false);
    });

    it("expires the OTP once consumed", async () => {
        await sendOtpFor("otp@example.com");
        const code = lastSentOtp();

        expect((await verifyOtpFor("otp@example.com", code)).status).toBe(200);
        expect((await verifyOtpFor("otp@example.com", code)).status).toBe(400);
    });

    it("rate limits repeated verification attempts", async () => {
        await sendOtpFor("otp@example.com");

        let lastStatus = 0;
        for (let attempt = 0; attempt < 6; attempt++) {
            lastStatus = (await verifyOtpFor("otp@example.com", "000000")).status;
        }

        expect(lastStatus).toBe(429);
    });

    it("rejects malformed OTP payloads", async () => {
        const notSixDigits = await verifyOtpFor("otp@example.com", "12");
        expect(notSixDigits.status).toBe(400);
    });
});
