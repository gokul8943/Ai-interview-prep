import { Response } from "express";
import { env } from "../framework/config/env";

export const REFRESH_COOKIE_NAME = env.cookieName;

const baseOptions = (expiresAt?: Date) => ({
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: "lax" as const,
    path: "/auth",
    ...(env.cookieDomain ? { domain: env.cookieDomain } : {}),
    ...(expiresAt ? { expires: expiresAt } : {}),
});

export const setRefreshCookie = (res: Response, token: string, expiresAt: Date): void => {
    res.cookie(REFRESH_COOKIE_NAME, token, baseOptions(expiresAt));
};

export const clearRefreshCookie = (res: Response): void => {
    res.clearCookie(REFRESH_COOKIE_NAME, baseOptions());
};
