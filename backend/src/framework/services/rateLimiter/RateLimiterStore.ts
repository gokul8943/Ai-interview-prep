import redis from "../../config/redis";

export interface RateLimitStore {
    increment(key: string): Promise<number>;
    expire(key: string, seconds: number): Promise<void>;
    delete(key: string): Promise<void>;
}

class RedisRateLimitStore implements RateLimitStore {
    async increment(key: string): Promise<number> {
        return await redis.incr(key);
    }

    async expire(key: string, seconds: number): Promise<void> {
        await redis.expire(key, seconds);
    }

    async delete(key: string): Promise<void> {
        await redis.del(key);
    }
}

let overrideStore: RateLimitStore | null = null;
let defaultStore: RateLimitStore | null = null;

export function setRateLimitStore(store: RateLimitStore | null): void {
    overrideStore = store;
    defaultStore = null;
}

export function getRateLimitStore(): RateLimitStore {
    if (overrideStore) return overrideStore;
    if (!defaultStore) {
        defaultStore = new RedisRateLimitStore();
    }
    return defaultStore;
}
