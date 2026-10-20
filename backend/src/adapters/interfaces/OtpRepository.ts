export interface OtpRepository {
    createOtp(email: string, otpHash: string): Promise<any>;
    consumeAttempt(email: string): Promise<any>;
    deleteOtp(email: string): Promise<void>;
}
