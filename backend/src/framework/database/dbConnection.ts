import mongoose from "mongoose";
import { env } from "../config/env";

export const dbConnection = async (): Promise<void> => {
    try {
        await mongoose.connect(env.mongodbUri);
        console.log("database connected..");
    } catch (err) {
        console.error("Database connection error:", err instanceof Error ? err.message : err);
        throw err;
    }
};
