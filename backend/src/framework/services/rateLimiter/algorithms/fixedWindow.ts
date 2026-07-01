import RedisRateLimitStore from "../RateLimiterStore"

interface RateLimitOptions {
    key: string;
    windowMs: number;
    maxRequests: number;
}

class FixedWindow {

    async allowRequest(options: RateLimitOptions) {

        const {
            key,
            windowMs,
            maxRequests
        } = options;

        const count = await RedisRateLimitStore.increment(key);

        // First request → set expiry
        if (count === 1) {
            await RedisRateLimitStore.expire(
                key,
                Math.ceil(windowMs / 1000)
            );
        }

        const allowed = count <= maxRequests;

        return {
            allowed,
            currentCount: count,
            remaining: Math.max(0, maxRequests - count),
            limit: maxRequests
        };

    }

}

export default new FixedWindow();