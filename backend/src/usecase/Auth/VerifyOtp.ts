export class VerifyOtp {
    constructor(private otpRepository: any) {}

    async execute(email: string, otp: number) {
        const otpRecord = await this.otpRepository.verifyOtp(email, otp);
        if (!otpRecord) {
            throw new Error('Invalid OTP');
        }
        await this.otpRepository.deleteOtp(email);
        return true;
    }
}
