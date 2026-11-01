import FixedWindow from "../../services/rateLimiter/algorithms/fixedWindow";
import { RATE_LIMIT } from "../../config/rateLimiter.config";

class RateLimiterService {

    async login(key: string) {
        return await FixedWindow.allowRequest({
            key,
            windowMs: RATE_LIMIT.LOGIN.WINDOW_MS,
            maxRequests: RATE_LIMIT.LOGIN.MAX_REQUESTS
        });
    }

    async signup(key: string) {
        return await FixedWindow.allowRequest({
            key,
            windowMs: RATE_LIMIT.SIGNUP.WINDOW_MS,
            maxRequests: RATE_LIMIT.SIGNUP.MAX_REQUESTS
        });
    }

    async otp(key: string) {
        return await FixedWindow.allowRequest({
            key,
            windowMs: RATE_LIMIT.OTP.WINDOW_MS,
            maxRequests: RATE_LIMIT.OTP.MAX_REQUESTS
        });
    }

    async otpVerify(key: string) {
        return await FixedWindow.allowRequest({
            key,
            windowMs: RATE_LIMIT.OTP_VERIFY.WINDOW_MS,
            maxRequests: RATE_LIMIT.OTP_VERIFY.MAX_REQUESTS
        });
    }

    async refresh(key: string) {
        return await FixedWindow.allowRequest({
            key,
            windowMs: RATE_LIMIT.REFRESH.WINDOW_MS,
            maxRequests: RATE_LIMIT.REFRESH.MAX_REQUESTS
        });
    }

    async api(key: string) {
        return await FixedWindow.allowRequest({
            key,
            windowMs: RATE_LIMIT.API.WINDOW_MS,
            maxRequests: RATE_LIMIT.API.MAX_REQUESTS
        });
    }

}

export default new RateLimiterService();
