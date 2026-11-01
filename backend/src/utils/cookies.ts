import { Response } from "express";
import { env } from "../framework/config/env";

export const REFRESH_COOKIE_NAME = env.cookieName;

const getCookieOptions = (expiresAt?: Date) => {
    const isProduction = env.isProduction;

    const base = {
        httpOnly: true,
        path: "/auth",
        ...(env.cookieDomain ? { domain: env.cookieDomain } : {}),
        ...(expiresAt ? { expires: expiresAt } : {}),
    };

    return {
        ...base,
        secure: true,
        sameSite: "none" as const,
    };
};

export const setRefreshCookie = (res: Response, token: string, expiresAt: Date): void => {
    res.cookie(REFRESH_COOKIE_NAME, token, getCookieOptions(expiresAt));
};

export const clearRefreshCookie = (res: Response): void => {
    res.clearCookie(REFRESH_COOKIE_NAME, getCookieOptions());
};
