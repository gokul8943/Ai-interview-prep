import { Model } from "mongoose";
import { IOTPSchema } from "../interfaces/IOTPSchema";
import { OtpRepository } from "../interfaces/OtpRepository";

export class OtpRepositoryImpl implements OtpRepository {
    private readonly OtpModel: Model<IOTPSchema>;
    private readonly maxAttempts: number;

    constructor(otpModel: Model<IOTPSchema>, maxAttempts: number) {
        this.OtpModel = otpModel;
        this.maxAttempts = maxAttempts;
    }

    async createOtp(email: string, otpHash: string): Promise<any> {
        return this.OtpModel.findOneAndUpdate(
            { email },
            { $set: { otp: otpHash, attempts: 0, createdAt: new Date() } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
    }

    async consumeAttempt(email: string): Promise<any> {
        return this.OtpModel.findOneAndUpdate(
            { email, attempts: { $lt: this.maxAttempts } },
            { $inc: { attempts: 1 } },
            { new: true }
        );
    }

    async deleteOtp(email: string): Promise<void> {
        await this.OtpModel.deleteMany({ email });
    }
}
