import { AdminRepository } from "../../adapters/interfaces/Admin/AdminRepository";

export class UserAccess {
    constructor(private readonly adminRepository: AdminRepository) { }
    async execute(userId: string, access: boolean) {
        return await this.adminRepository.userAccess(userId, access);
    }   
}