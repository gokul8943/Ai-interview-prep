import { getRateLimitStore } from "../RateLimiterStore";

interface RateLimitOptions {
    key: string;
    windowMs: number;
    maxRequests: number;
}

class FixedWindow {

    async allowRequest(options: RateLimitOptions) {

        const { key, windowMs, maxRequests } = options;

        const store = getRateLimitStore();

        const count = await store.increment(key);

        if (count === 1) {
            await store.expire(key, Math.ceil(windowMs / 1000));
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
