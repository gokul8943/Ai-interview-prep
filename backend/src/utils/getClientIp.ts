import { Request } from "express";

export const getClientIp = (req: Request): string => {

    return (
        (req.headers["x-forwarded-for"]  as any)?.split(",")[0] ||
        req.socket.remoteAddress ||
        req.ip
    );

};