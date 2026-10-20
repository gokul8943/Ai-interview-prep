import mongoose from "mongoose";
import bcrypt from "bcrypt";
import request from "supertest";
import { buildApp } from "../framework/app";
import { setRateLimitStore, RateLimitStore } from "../framework/services/rateLimiter/RateLimiterStore";
import User from "../framework/models/user.model";

class InMemoryRateLimitStore implements RateLimitStore {
    private counters = new Map<string, number>();

    async increment(key: string): Promise<number> {
        const next = (this.counters.get(key) ?? 0) + 1;
        this.counters.set(key, next);
        return next;
    }

    async expire(): Promise<void> {
        // fixed-window TTL is irrelevant for isolated tests
    }

    async delete(key: string): Promise<void> {
        this.counters.delete(key);
    }
}

export const app = buildApp();

export const connectTestDb = async (): Promise<void> => {
    const uri = process.env.MONGO_TEST_URI as string;
    await mongoose.connect(uri);
};

export const disconnectTestDb = async (): Promise<void> => {
    await mongoose.disconnect();
};

export const clearDatabase = async (): Promise<void> => {
    const collections = await mongoose.connection.db!.collections();
    await Promise.all(collections.map((collection) => collection.deleteMany({})));
};

export const resetRateLimiterStore = (): void => {
    setRateLimitStore(new InMemoryRateLimitStore());
};

export interface CreateUserOptions {
    name?: string;
    email: string;
    password?: string;
    phone?: string;
    role?: string;
    isVerified?: boolean;
}

export const createUser = async (options: CreateUserOptions) => {
    const password = options.password ?? "Password123";
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
        name: options.name ?? "Test User",
        email: options.email,
        password: passwordHash,
        role: options.role ?? "user",
        isVerified: options.isVerified ?? false,
        ...(options.phone ? { phone: options.phone } : {}),
    });
    return { user, password };
};

export interface LoggedInSession {
    agent: request.Agent;
    accessToken: string;
    refreshCookie: string | undefined;
    user: Record<string, unknown>;
}

export const loginAs = async (email: string, password: string): Promise<LoggedInSession> => {
    const agent = request.agent(app);
    const response = await agent.post("/auth/v1/sign-in").send({ email, password });
    if (response.status !== 200) {
        throw new Error(`Login failed for ${email}: ${response.status} ${JSON.stringify(response.body)}`);
    }
    const setCookie = response.headers["set-cookie"];
    return {
        agent,
        accessToken: response.body.accessToken,
        refreshCookie: Array.isArray(setCookie) ? setCookie[0] : setCookie,
        user: response.body.user,
    };
};

export const registerUser = async (
    email: string,
    password = "Password123",
    extra: Record<string, unknown> = {}
) => {
    return request(app).post("/auth/v1/sign-up").send({
        name: "Test User",
        email,
        password,
        ...extra,
    });
};
