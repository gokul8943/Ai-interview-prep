import { OtpRepository } from "../../adapters/interfaces/OtpRepository";
import { AuthRepository } from "../../adapters/interfaces/AuthRepository";
import { BadRequestError } from "../../adapters/errors/httpErrors";
import { constantTimeEquals, sha256 } from "../../utils/tokenCrypto";

export class VerifyOtp {
    constructor(
        private otpRepository: OtpRepository,
        private authRepository: AuthRepository
    ) { }

    async execute(email: string, otp: string): Promise<void> {
        const record = await this.otpRepository.consumeAttempt(email);
        if (!record) {
            throw new BadRequestError("Invalid or expired OTP");
        }

        const presentedHash = sha256(otp);
        if (!constantTimeEquals(String(record.otp), presentedHash)) {
            throw new BadRequestError("Invalid or expired OTP");
        }

        await this.otpRepository.deleteOtp(email);
        await this.authRepository.markVerified(email);
    }
}
