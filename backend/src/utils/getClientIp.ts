import { Request } from "express";

export const getClientIp = (req: Request): string => {
    if (req.ip) return req.ip;
    return (
        (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        "unknown"
    );
};
