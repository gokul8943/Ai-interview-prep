

export interface UserRepository {
    getUserInterviews(userId: string): Promise<any>;
}