import { OtpRepository } from "../../adapters/interfaces/OtpRepository";
import { AuthRepository } from "../../adapters/interfaces/AuthRepository";
import { BadGatewayError } from "../../adapters/errors/httpErrors";
import { generateOtp } from "../../utils/generateOtp";
import { sha256 } from "../../utils/tokenCrypto";

export type OtpMailer = (email: string, otp: string) => Promise<void>;

export interface GenerateOtpResult {
    sent: boolean;
}

export class GenerateOtp {
    constructor(
        private otpRepository: OtpRepository,
        private authRepository: AuthRepository,
        private mailer: OtpMailer
    ) { }

    async execute(email: string): Promise<GenerateOtpResult> {
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
            return { sent: false };
        }

        const otp = generateOtp();
        await this.otpRepository.createOtp(email, sha256(otp));

        try {
            await this.mailer(email, otp);
        } catch (error) {
            await this.otpRepository.deleteOtp(email);
            throw new BadGatewayError("Failed to send OTP. Please try again.");
        }

        return { sent: true };
    }
}
