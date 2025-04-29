
export interface OtpRepository {
    createOtp(email: string, otp: string): Promise<any>;
    verifyOtp(email: string, otp: string): Promise<any>;
    deleteOtp(email: string): Promise<void>;
}