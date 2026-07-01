import { Request } from "express";
import { getClientIp } from "./getClientIp";

export const getRateLimitKey = (

    req: Request,

    prefix: string

): string => {

    return `${prefix}:${getClientIp(req)}`;

};