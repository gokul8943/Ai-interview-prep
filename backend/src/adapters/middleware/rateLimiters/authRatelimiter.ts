import { RequestHandler } from "express";
import RateLimiterService from "../../../framework/services/rateLimiter/RateLimiterServices";
import { createIpRateLimiter } from "./createRateLimiter";

export const authRateLimiter: RequestHandler = createIpRateLimiter(
    "login",
    async (key) => RateLimiterService.login(key),
    "Too many login attempts"
);

export const signupRateLimiter: RequestHandler = createIpRateLimiter(
    "signup",
    async (key) => RateLimiterService.signup(key),
    "Too many signup attempts"
);
