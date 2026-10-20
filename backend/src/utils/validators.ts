import { BadRequestError } from "../adapters/errors/httpErrors";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+[1-9]\d{6,14}$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 100;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;

export const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export const validateName = (name: unknown): string => {
    if (typeof name !== "string" || name.trim().length === 0) {
        throw new BadRequestError("Name is required");
    }
    const trimmed = name.trim();
    if (trimmed.length > MAX_NAME_LENGTH) {
        throw new BadRequestError(`Name must be at most ${MAX_NAME_LENGTH} characters`);
    }
    return trimmed;
};

export const validateEmail = (email: unknown): string => {
    if (typeof email !== "string" || email.trim().length === 0) {
        throw new BadRequestError("Email is required");
    }
    const normalized = normalizeEmail(email);
    if (normalized.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(normalized)) {
        throw new BadRequestError("Enter a valid email address");
    }
    return normalized;
};

export const validatePassword = (password: unknown): string => {
    if (typeof password !== "string" || password.length === 0) {
        throw new BadRequestError("Password is required");
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
        throw new BadRequestError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
    }
    if (password.length > MAX_PASSWORD_LENGTH) {
        throw new BadRequestError(`Password must be at most ${MAX_PASSWORD_LENGTH} characters`);
    }
    return password;
};

export const validatePhone = (phone: unknown): string | undefined => {
    if (phone === undefined || phone === null || phone === "") {
        return undefined;
    }
    if (typeof phone !== "string") {
        throw new BadRequestError("Phone must be in international format, e.g. +15551234567");
    }
    const normalized = phone.replace(/[\s()-]/g, "");
    if (!PHONE_PATTERN.test(normalized)) {
        throw new BadRequestError("Phone must be in international format, e.g. +15551234567");
    }
    return normalized;
};

export const validateOtp = (otp: unknown): string => {
    if (typeof otp !== "string" && typeof otp !== "number") {
        throw new BadRequestError("OTP is required");
    }
    const value = String(otp).trim();
    if (!/^\d{6}$/.test(value)) {
        throw new BadRequestError("OTP must be a 6-digit code");
    }
    return value;
};
