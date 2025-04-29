import { Model } from "mongoose";
import { IOTPSchema } from "../interfaces/IOTPSchema";
import { OtpRepository } from "../interfaces/OtpRepository";

export class OtpRepositoryImpl implements OtpRepository {
    private readonly OtpModel: Model<IOTPSchema>;

    constructor(otpModel: Model<IOTPSchema>) {
        this.OtpModel = otpModel;
    }

    async createOtp(email: string, otp: string): Promise<any> {
        try {
            const result = await this.OtpModel.findOneAndUpdate(
                { email },
                { otp, email, createdAt: new Date() },
                { upsert: true, new: true }
              );
            return result
        } catch (error) {
            
        }
  
    }

    async verifyOtp(email: string, otp: string): Promise<any> {
        const record = await this.OtpModel.findOne({ email, otp });
        return record;
    }

    async deleteOtp(email: string): Promise<void> {
        await this.OtpModel.deleteMany({ email });
    }
}
