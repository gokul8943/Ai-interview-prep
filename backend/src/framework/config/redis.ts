import Redis from "ioredis";
import { env } from "./env";

const MAX_BACKOFF_MS = 30_000;
const ERROR_LOG_INTERVAL_MS = 15_000;
let lastErrorLogAt = 0;

const redis = new Redis({
    host: env.redis.host,
    port: env.redis.port,
    password: env.redis.password,
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    // Fail fast instead of queuing commands while the connection is down.
    enableOfflineQueue: false,
    // Exponential-ish backoff capped at 30s so a down Redis cannot cause a
    // tight reconnect loop (log flood / memory growth) while still recovering
    // automatically if Redis comes back up.
    retryStrategy: (times) => Math.min(times * 1000, MAX_BACKOFF_MS),
});

redis.on("connect", () => {
    console.log("Redis Connected");
});

redis.on("error", (err) => {
    const now = Date.now();
    if (now - lastErrorLogAt < ERROR_LOG_INTERVAL_MS) return;
    lastErrorLogAt = now;
    console.error("Redis error:", err.message);
});

export const connectRedis = async (): Promise<void> => {
    if (redis.status === "wait") {
        try {
            await redis.connect();
        } catch (err) {
            console.error(
                "Redis unavailable, rate limiting will be skipped:",
                err instanceof Error ? err.message : err
            );
        }
    }
};

export default redis;
