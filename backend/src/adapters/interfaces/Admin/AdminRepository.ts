export interface AdminRepository {
    getUserById(userId: string): Promise<any>
    getUsers(): Promise<any>
    userAccess(userId: string, access: boolean): Promise<any>
}