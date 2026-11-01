import { describe, expect, it } from "vitest";
import {
    normalizeEmail,
    validateEmail,
    validateName,
    validateOtp,
    validatePassword,
    validatePhone,
} from "../utils/validators";
import { constantTimeEquals, generateFamilyId, generateRefreshToken, sha256 } from "../utils/tokenCrypto";

describe("validators", () => {
    it("normalizes email casing and whitespace", () => {
        expect(normalizeEmail("  User@Example.COM ")).toBe("user@example.com");
    });

    it("accepts well-formed values", () => {
        expect(validateName(" Jane Doe ")).toBe("Jane Doe");
        expect(validateEmail("jane@example.com")).toBe("jane@example.com");
        expect(validatePassword("Password123")).toBe("Password123");
        expect(validatePhone("+1 555 123 4567")).toBe("+15551234567");
        expect(validateOtp("123456")).toBe("123456");
    });

    it("treats an absent phone as optional", () => {
        expect(validatePhone(undefined)).toBeUndefined();
        expect(validatePhone("")).toBeUndefined();
    });

    it("rejects malformed values", () => {
        expect(() => validateName("")).toThrow();
        expect(() => validateEmail("not-an-email")).toThrow();
        expect(() => validatePassword("short")).toThrow();
        expect(() => validatePassword("x".repeat(73))).toThrow();
        expect(() => validatePhone("555-1234")).toThrow();
        expect(() => validatePhone("+0 123456")).toThrow();
        expect(() => validateOtp("12345")).toThrow();
        expect(() => validateOtp("abcdef")).toThrow();
    });
});

describe("token crypto", () => {
    it("generates unique, high-entropy refresh tokens", () => {
        const tokens = new Set(Array.from({ length: 200 }, () => generateRefreshToken()));
        expect(tokens.size).toBe(200);
        for (const token of tokens) {
            expect(token.length).toBeGreaterThanOrEqual(40);
        }
    });

    it("hashes deterministically and compares in constant time", () => {
        const token = generateRefreshToken();
        expect(sha256(token)).toBe(sha256(token));
        expect(constantTimeEquals(sha256(token), sha256(token))).toBe(true);
        expect(constantTimeEquals(sha256(token), sha256("other"))).toBe(false);
        expect(constantTimeEquals("abc", "abcd")).toBe(false);
    });

    it("generates distinct family ids", () => {
        expect(generateFamilyId()).not.toBe(generateFamilyId());
    });
});
