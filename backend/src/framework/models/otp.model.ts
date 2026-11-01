import { IOTPSchema } from "../../adapters/interfaces/IOTPSchema";
import mongoose, { Schema, Document } from "mongoose";
import { env } from "../config/env";

const OtpSchema = new Schema<IOTPSchema>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: true,
    },
    attempts: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * env.otpExpiresMinutes,
    },
})

export default mongoose.model<IOTPSchema & Document>("OTP", OtpSchema);
