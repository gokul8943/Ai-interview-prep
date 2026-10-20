import { Router } from "express";
import { AuthRepositoryImpl } from "../repositories/auth.repositoryImpl";
import { AuthController } from "../controllers/auth.controller";
import { SignUp } from "../../usecase/Auth/signUp";
import { Login } from "../../usecase/Auth/login";
import { FindUserByEmail } from "../../usecase/Auth/findUserByEmail";
import { VerifyOtp } from "../../usecase/Auth/verifyOtp";
import { GenerateOtp } from "../../usecase/Auth/generateOtp";
import { Refresh } from "../../usecase/Auth/refresh";
import { Logout } from "../../usecase/Auth/logout";
import { LogoutAll } from "../../usecase/Auth/logoutAll";
import { GetMe } from "../../usecase/Auth/getMe";
import userModel from "../../framework/models/user.model";
import otpModel from "../../framework/models/otp.model";
import sessionModel from "../../framework/models/session.model";
import { OtpRepositoryImpl } from "../repositories/otp.repositoryImpl";
import { SessionRepositoryImpl } from "../repositories/session.repositoryImpl";
import { JwtTokenService } from "../../framework/services/jwtTokenService";
import { BcryptPasswordService } from "../../framework/services/passwordService";
import { env } from "../../framework/config/env";
import { sendOtpEmail } from "../../utils/sendOtpEmail";
import { asyncHandler } from "../../utils/asyncHandler";
import { validateOrigin } from "../middleware/validateOrigin";
import { authRateLimiter, signupRateLimiter } from "../middleware/rateLimiters/authRatelimiter";
import { otpSendRateLimiter, otpVerifyRateLimiter, refreshRateLimiter } from "../middleware/rateLimiters/otpRateLimiter";
import { authMiddleware } from "../middleware/authMiddleware";

const authRepository = new AuthRepositoryImpl(userModel);
const otpRepository = new OtpRepositoryImpl(otpModel, env.otpMaxAttempts);
const sessionRepository = new SessionRepositoryImpl(sessionModel);
const tokenService = new JwtTokenService();
const passwordService = new BcryptPasswordService();

const signUp = new SignUp(authRepository, passwordService);
const login = new Login(authRepository, passwordService, sessionRepository, tokenService, env.refreshTokenExpiresSeconds);
const findUserByEmail = new FindUserByEmail(authRepository);
const generateOtp = new GenerateOtp(otpRepository, authRepository, (email, otp) =>
    sendOtpEmail(email, otp, env.otpExpiresMinutes)
);
const verifyOtp = new VerifyOtp(otpRepository, authRepository);
const refresh = new Refresh(authRepository, sessionRepository, tokenService, env.refreshTokenExpiresSeconds);
const logout = new Logout(sessionRepository);
const logoutAll = new LogoutAll(sessionRepository);
const getMe = new GetMe(authRepository);

const authController = new AuthController(
    signUp,
    login,
    findUserByEmail,
    generateOtp,
    verifyOtp,
    refresh,
    logout,
    logoutAll,
    getMe
);

const router = Router();

router.post('/v1/sign-up', signupRateLimiter, asyncHandler((req, res) => authController.signUp(req, res)));

router.post('/v1/sign-in', authRateLimiter, asyncHandler((req, res) => authController.login(req, res)));

router.post('/v1/generate-otp', otpSendRateLimiter, asyncHandler((req, res) => authController.sendOtp(req, res)));

router.post('/v1/verify-otp', otpVerifyRateLimiter, asyncHandler((req, res) => authController.verifyOtp(req, res)));

router.post('/v1/refresh', refreshRateLimiter, validateOrigin, asyncHandler((req, res) => authController.refresh(req, res)));

router.post('/v1/logout', refreshRateLimiter, validateOrigin, asyncHandler((req, res) => authController.logout(req, res)));

router.post('/v1/logout-all', authMiddleware, asyncHandler((req, res) => authController.logoutAll(req, res)));

router.get('/v1/me', authMiddleware, asyncHandler((req, res) => authController.me(req, res)));

export default router;
