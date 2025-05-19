import { AdminRepository } from "../../adapters/interfaces/Admin/AdminRepository";

export class GetUserById {
    constructor(private adminRepository: AdminRepository) { }

    async execute(userId: string): Promise<any> {
      return this.adminRepository.getUserById(userId);
    }
  }