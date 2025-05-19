import { AdminRepository } from "../../adapters/interfaces/Admin/AdminRepository";

export class userAccess {
    constructor(private readonly adminRepository: AdminRepository) { }
    async execute(userId: string, access: boolean) {
        return await this.adminRepository.userAccess(userId, access);
    }   
}