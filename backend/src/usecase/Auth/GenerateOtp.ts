export class GenerateOtp {
    constructor(private otpRepository: any) {}

    async execute(email: string) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        await this.otpRepository.createOtp(email, otp);
        // Here you would actually send the OTP to the user's email.
        console.log(`OTP for ${email}: ${otp}`); // For now, log it
        return otp;
    }
}
