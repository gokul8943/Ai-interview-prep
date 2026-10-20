import { RequestHandler } from "express";
import { env } from "../../framework/config/env";

const ALLOWED_ORIGINS = env.frontendUrls;

export const validateOrigin: RequestHandler = (req, res, next) => {
    const origin = req.headers.origin;

    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
        res.status(403).json({ message: "Origin not allowed" });
        return;
    }

    const referer = req.headers.referer;
    if (!origin && referer) {
        try {
            const refererOrigin = new URL(referer).origin;
            if (!ALLOWED_ORIGINS.includes(refererOrigin)) {
                res.status(403).json({ message: "Origin not allowed" });
                return;
            }
        } catch {
            res.status(403).json({ message: "Origin not allowed" });
            return;
        }
    }

    next();
};
