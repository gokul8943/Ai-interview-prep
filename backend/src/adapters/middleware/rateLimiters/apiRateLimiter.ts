import { RequestHandler } from "express";
import RateLimiterService from "../../../framework/services/rateLimiter/RateLimiterServices";
import { createIpRateLimiter } from "./createRateLimiter";

export const apiRateLimiter: RequestHandler = createIpRateLimiter(
    "api",
    async (key) => RateLimiterService.api(key),
    "API limit exceeded"
);
