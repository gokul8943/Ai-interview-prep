import dotenv from "dotenv";

dotenv.config();

const DURATION_UNIT_SECONDS: Record<string, number> = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
};

export function parseDurationToSeconds(value: string, fallbackSeconds: number): number {
    const match = /^(\d+)\s*([smhd])?$/.exec(String(value ?? "").trim().toLowerCase());
    if (!match) return fallbackSeconds;
    const amount = Number(match[1]);
    const unit = match[2] || "s";
    return amount * (DURATION_UNIT_SECONDS[unit] ?? 1);
}

function required(name: string, requiredInProductionOnly: boolean, isProduction: boolean): string | undefined {
    const value = process.env[name];
    if (value && value.trim() !== "") return value;
    if (!requiredInProductionOnly || isProduction) {
        throw new Error(`[config] Missing required environment variable: ${name}`);
    }
    return undefined;
}

function buildConfig() {
    const nodeEnv = process.env.NODE_ENV || "development";
    const isProduction = nodeEnv === "production";

    const mongodbUri = required("MONGODB_URI", false, isProduction)!;
    const jwtSecret = required("JWT_SECRET", false, isProduction)!;

    if (isProduction && jwtSecret.length < 32) {
        throw new Error("[config] JWT_SECRET must be at least 32 characters in production");
    }

    const cookieSecureRaw = process.env.COOKIE_SECURE;
    const cookieSecure = cookieSecureRaw !== undefined
        ? cookieSecureRaw === "true"
        : isProduction;

    const trustProxyRaw = process.env.TRUST_PROXY;
    const trustProxy = trustProxyRaw !== undefined ? Number(trustProxyRaw) : 1;

    const frontendUrls = (process.env.FRONTEND_URL ?? "")
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean);

    if (!isProduction) {
        frontendUrls.push(
            "https://localhost:5173",
            "http://localhost:5173",
            "http://localhost:4173"
        );
    }

    return {
        nodeEnv,
        isProduction,
        port: Number(process.env.PORT || 8000),
        mongodbUri,
        jwtSecret,
        jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "10m",
        jwtAccessExpiresSeconds: parseDurationToSeconds(process.env.JWT_ACCESS_EXPIRES_IN || "10m", 600),
        jwtIssuer: process.env.JWT_ISSUER || "intelliprep",
        jwtAudience: process.env.JWT_AUDIENCE || "intelliprep-web",
        refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "30d",
        refreshTokenExpiresSeconds: parseDurationToSeconds(process.env.REFRESH_TOKEN_EXPIRES_IN || "30d", 30 * 86400),
        otpExpiresMinutes: Number(process.env.OTP_EXPIRES_MINUTES || 5),
        otpMaxAttempts: Number(process.env.OTP_MAX_ATTEMPTS || 5),
        cookieSecure,
        cookieDomain: process.env.COOKIE_DOMAIN || undefined,
        cookieName: process.env.REFRESH_COOKIE_NAME || "ip_rt",
        trustProxy,
        frontendUrls,
        redis: {
            host: process.env.REDIS_HOST || "127.0.0.1",
            port: Number(process.env.REDIS_PORT || 6379),
            password: process.env.REDIS_PASSWORD || undefined,
        },
        emailUser: required("Email_User", true, isProduction),
        emailPass: required("Email_Pass", true, isProduction),
    };
}

export const env = buildConfig();
