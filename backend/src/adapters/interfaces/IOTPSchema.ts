import { Document } from "mongoose";

export interface IOTPSchema extends Document {
    email: string,
    otp: string,
    attempts: number,
    createdAt: Date
}
