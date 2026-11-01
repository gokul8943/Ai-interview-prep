import { Request, Response } from "express";
import { SignUp } from "../../usecase/Auth/signUp";
import { Login, LoginMeta } from "../../usecase/Auth/login";
import { FindUserByEmail } from "../../usecase/Auth/findUserByEmail";
import { GenerateOtp } from "../../usecase/Auth/generateOtp";
import { VerifyOtp } from "../../usecase/Auth/verifyOtp";
import { Refresh } from "../../usecase/Auth/refresh";
import { Logout } from "../../usecase/Auth/logout";
import { LogoutAll } from "../../usecase/Auth/logoutAll";
import { GetMe } from "../../usecase/Auth/getMe";
import { CustomError } from "../errors/customError";
import {
    validateEmail,
    validateName,
    validateOtp,
    validatePassword,
    validatePhone,
} from "../../utils/validators";
import { clearRefreshCookie, setRefreshCookie, REFRESH_COOKIE_NAME } from "../../utils/cookies";

const requestMeta = (req: Request): LoginMeta => ({
    ip: req.ip,
    userAgent: typeof req.headers["user-agent"] === "string" ? req.headers["user-agent"] : undefined,
});

const sendError = (res: Response, error: unknown): Response => {
    if (error instanceof CustomError) {
        const serialized = error.serializeError();
        return res
            .status(error.statusCode)
            .json({ message: serialized[0]?.message || "Request failed" });
    }
    console.error("Controller error:", error instanceof Error ? error.message : error);
    return res.status(500).json({ message: "Internal server error" });
};

export class AuthController {
    constructor(
        private signUpUseCase: SignUp,
        private loginUseCase: Login,
        private findUserByEmailUseCase: FindUserByEmail,
        private generateOtpUseCase: GenerateOtp,
        private verifyOtpUseCase: VerifyOtp,
        private refreshUseCase: Refresh,
        private logoutUseCase: Logout,
        private logoutAllUseCase: LogoutAll,
        private getMeUseCase: GetMe
    ) { }

    async signUp(req: Request, res: Response) {
        try {
            const body = req.body ?? {};
            const name = validateName(body.name);
            const email = validateEmail(body.email);
            const password = validatePassword(body.password);
            const phone = validatePhone(body.phone);

            const user = await this.signUpUseCase.execute({ name, email, password, phone });
            const dto = user.toObject?.() || user;

            return res.status(201).json({
                message: "Account created successfully. Please verify your email.",
                user: {
                    _id: String(dto._id),
                    name: dto.name,
                    email: dto.email,
                    ...(dto.phone ? { phone: dto.phone } : {}),
                    isVerified: Boolean(dto.isVerified),
                },
            });
        } catch (error) {
            return sendError(res, error);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const body = req.body ?? {};
            if (typeof body.email !== "string" || typeof body.password !== "string" || !body.email || !body.password) {
                return res.status(400).json({ message: "Email and password are required" });
            }

            const email = validateEmail(body.email);
            const result = await this.loginUseCase.execute(email, body.password, requestMeta(req));

            setRefreshCookie(res, result.refreshToken, result.refreshExpiresAt);
            return res.status(200).json({
                message: "Login successful",
                accessToken: result.accessToken,
                user: result.user,
            });
        } catch (error) {
            return sendError(res, error);
        }
    }

    async sendOtp(req: Request, res: Response) {
        try {
            const body = req.body ?? {};
            if (typeof body.email !== "string" || !body.email) {
                return res.status(400).json({ message: "Email is required" });
            }
            const email = validateEmail(body.email);

            const result = await this.generateOtpUseCase.execute(email);

            if (!result.sent) {
                return res.status(200).json({ message: "OTP sent successfully" });
            }
            return res.status(200).json({ message: "OTP sent successfully" });
        } catch (error) {
            return sendError(res, error);
        }
    }

    async verifyOtp(req: Request, res: Response) {
        try {
            const body = req.body ?? {};
            if (typeof body.email !== "string" || !body.email) {
                return res.status(400).json({ message: "Email and OTP are required" });
            }
            const email = validateEmail(body.email);
            const otp = validateOtp(body.otp);

            await this.verifyOtpUseCase.execute(email, otp);

            return res.status(200).json({ message: "OTP verification successful" });
        } catch (error) {
            return sendError(res, error);
        }
    }

    async refresh(req: Request, res: Response) {
        try {
            const token = req.cookies?.[REFRESH_COOKIE_NAME];
            const result = await this.refreshUseCase.execute(token, requestMeta(req));
            setRefreshCookie(res, result.refreshToken, result.refreshExpiresAt);
            return res.status(200).json({
                message: "Session refreshed",
                accessToken: result.accessToken,
                user: result.user,
            });
        } catch (error) {
            clearRefreshCookie(res);
            return sendError(res, error);
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const token = req.cookies?.[REFRESH_COOKIE_NAME];
            await this.logoutUseCase.execute(token);
        } catch (error) {
            console.error("Logout error:", error instanceof Error ? error.message : error);
        }
        clearRefreshCookie(res);
        return res.status(200).json({ message: "Logged out successfully" });
    }

    async logoutAll(req: Request, res: Response) {
        try {
            if (!req.user?.userId) {
                return res.status(401).json({ message: "Unauthorized: No token provided" });
            }
            await this.logoutAllUseCase.execute(req.user.userId);
            clearRefreshCookie(res);
            return res.status(200).json({ message: "Logged out from all sessions" });
        } catch (error) {
            return sendError(res, error);
        }
    }

    async me(req: Request, res: Response) {
        try {
            if (!req.user?.userId) {
                return res.status(401).json({ message: "Unauthorized: No token provided" });
            }
            const user = await this.getMeUseCase.execute(req.user.userId);
            return res.status(200).json({ message: "User fetched successfully", user });
        } catch (error) {
            return sendError(res, error);
        }
    }
}
