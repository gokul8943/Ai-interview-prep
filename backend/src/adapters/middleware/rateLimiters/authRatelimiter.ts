import { NextFunction, Request, Response } from "express";

import RateLimiterService
from "../../../framework/services/rateLimiter/RateLimiterServices";

import { getRateLimitKey }
from "../../../utils/getRateLimitKey";

export const authRateLimiter = async (

    req: Request,

    res: Response,

    next: NextFunction

) => {

    try {

        const key = getRateLimitKey(req, "login");

        const result =
            await RateLimiterService.login(key);

        res.setHeader(
            "RateLimit-Limit",
            result.limit
        );

        res.setHeader(
            "RateLimit-Remaining",
            result.remaining
        );

        if (!result.allowed) {

            return res.status(429).json({

                success: false,

                message: "Too many login attempts"

            });

        }

        next();

    } catch (err) {

        next(err);

    }

};