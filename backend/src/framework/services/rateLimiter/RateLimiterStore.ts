import redis from "../../config/redis";

class RedisRateLimitStore {

    async increment(key: string): Promise<number> {

        return await redis.incr(key);

    }

    async expire(key: string, seconds: number) {

        await redis.expire(key, seconds);

    }

    async get(key: string) {

        return await redis.get(key);

    }

    async delete(key: string) {

        await redis.del(key);

    }

}

export default new RedisRateLimitStore();