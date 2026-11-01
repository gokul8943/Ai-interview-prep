export interface AuthRepository {
    signUp(userData: any): Promise<any>;
    findByEmail(email: string): Promise<any>;
    findByPhone(phone: string): Promise<any>;
    findById(userId: string): Promise<any>;
    updatePassword(userId: string, passwordHash: string): Promise<void>;
    markVerified(email: string): Promise<void>;
}
