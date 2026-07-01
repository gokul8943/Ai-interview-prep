import { NextFunction, Request, Response } from "express";

import RateLimiterService
from "../../../framework/services/rateLimiter/RateLimiterServices";

import { getRateLimitKey }
from "../../../utils/getRateLimitKey";

export const apiRateLimiter = async (

    req: Request,

    res: Response,

    next: NextFunction

) => {

    const key = getRateLimitKey(req, "api");

    const result =
        await RateLimiterService.api(key);

    if (!result.allowed) {

        return res.status(429).json({

            success: false,

            message: "API limit exceeded"

        });

    }

    next();

};