import { NextFunction, Request, Response, RequestHandler } from "express";
import { getRateLimitKey } from "../../../utils/getRateLimitKey";

export interface RateLimitResult {
    allowed: boolean;
    limit: number;
    remaining: number;
}

export type RateLimitFn = (key: string) => Promise<RateLimitResult>;

const deny = (res: Response, message: string) => {
    return res.status(429).json({ success: false, message });
};

const failOpen = (err: unknown, res: Response, next: NextFunction) => {
    console.error("Rate limiter unavailable:", err instanceof Error ? err.message : err);
    next();
};

export const createIpRateLimiter = (prefix: string, fn: RateLimitFn, message = "Too many requests"): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await fn(getRateLimitKey(req, prefix));
            res.setHeader("RateLimit-Limit", result.limit);
            res.setHeader("RateLimit-Remaining", result.remaining);
            if (!result.allowed) {
                deny(res, message);
                return;
            }
            next();
        } catch (err) {
            failOpen(err, res, next);
        }
    };
};

export const createEmailRateLimiter = (prefix: string, fn: RateLimitFn, message = "Too many requests"): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
            if (email) {
                const emailResult = await fn(`${prefix}:email:${email}`);
                if (!emailResult.allowed) {
                    deny(res, message);
                    return;
                }
            }
            const ipResult = await fn(getRateLimitKey(req, prefix));
            if (!ipResult.allowed) {
                deny(res, message);
                return;
            }
            next();
        } catch (err) {
            failOpen(err, res, next);
        }
    };
};
