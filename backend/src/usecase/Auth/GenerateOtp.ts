import { OtpRepository } from "../../adapters/interfaces/OtpRepository";
import { sendOtpEmail } from "../../utils/sendOtpEmail";

export class GenerateOtp {
    constructor(private otpRepository:OtpRepository) {}

    async execute(email: string,otp:string): Promise<any> {
        await sendOtpEmail(email, otp);
        return this.otpRepository.createOtp(email,otp);
    }
}