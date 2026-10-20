import { RequestHandler } from "express";
import RateLimiterService from "../../../framework/services/rateLimiter/RateLimiterServices";
import { createEmailRateLimiter, createIpRateLimiter } from "./createRateLimiter";

export const otpSendRateLimiter: RequestHandler = createEmailRateLimiter(
    "otp-send",
    async (key) => RateLimiterService.otp(key),
    "Too many OTP requests. Please try again later."
);

export const otpVerifyRateLimiter: RequestHandler = createEmailRateLimiter(
    "otp-verify",
    async (key) => RateLimiterService.otpVerify(key),
    "Too many OTP attempts. Please try again later."
);

export const refreshRateLimiter: RequestHandler = createIpRateLimiter(
    "refresh",
    async (key) => RateLimiterService.refresh(key),
    "Too many requests. Please try again later."
);
