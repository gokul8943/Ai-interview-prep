import { Model } from "mongoose";
import { IOTPSchema } from "../interfaces/IOTPSchema";
import { OtpRepository } from "../interfaces/OtpRepository";

export class OtpRepositoryImpl implements OtpRepository {
    private readonly OtpModel: Model<IOTPSchema>;

    constructor(otpModel: Model<IOTPSchema>) {
        this.OtpModel = otpModel;
    }

    async createOtp(email: string, otp: string): Promise<any> {
        await this.OtpModel.deleteMany({ email }); // Remove old OTPs
        return this.OtpModel.create({ email, otp });
    }

    async verifyOtp(email: string, otp: string): Promise<any> {
        const record = await this.OtpModel.findOne({ email, otp });
        return record;
    }

    async deleteOtp(email: string): Promise<void> {
        await this.OtpModel.deleteMany({ email });
    }
}
