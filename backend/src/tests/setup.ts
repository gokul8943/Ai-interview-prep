import { vi } from "vitest";

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret-key-with-at-least-32-characters!!";
process.env.JWT_ACCESS_EXPIRES_IN = "10m";
process.env.JWT_ISSUER = "intelliprep-test";
process.env.JWT_AUDIENCE = "intelliprep-test";
process.env.REFRESH_TOKEN_EXPIRES_IN = "30d";
process.env.OTP_EXPIRES_MINUTES = "5";
process.env.OTP_MAX_ATTEMPTS = "5";
process.env.REFRESH_COOKIE_NAME = "ip_rt";
process.env.COOKIE_SECURE = "false";
process.env.FRONTEND_URL = "http://localhost:5173";
process.env.MONGODB_URI = process.env.MONGO_TEST_URI || "mongodb://127.0.0.1:27017/intelliprep_test";
process.env.Email_User = "test@example.com";
process.env.Email_Pass = "test-password";
process.env.GEMINI_API_KEY = "test-gemini-key";

vi.mock("nodemailer", () => {
    const sendMail = vi.fn().mockResolvedValue({ messageId: "test-message-id" });
    const createTransport = vi.fn(() => ({ sendMail }));
    return {
        default: { createTransport },
        createTransport,
    };
});
