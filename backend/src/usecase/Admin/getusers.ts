import { AdminRepository } from "../../adapters/interfaces/Admin/AdminRepository";

export class GetUsers {
    constructor(private adminRepository: AdminRepository) { }

    async execute(): Promise<any> {
      return this.adminRepository.getUsers();
    }
  }