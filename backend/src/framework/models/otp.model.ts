import { IOTPSchema } from "../../adapters/interfaces/IOTPSchema";
import mongoose, { Schema, Document } from "mongoose";
const OtpSchema = new Schema<IOTPSchema>({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // 5 minutes
    },
})

export default mongoose.model<IOTPSchema & Document>("OTP", OtpSchema);

