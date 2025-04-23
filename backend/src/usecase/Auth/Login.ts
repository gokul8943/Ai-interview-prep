import { AuthRepository } from "../../adapters/interfaces/AuthRepository";

export class Login {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string): Promise<any> {
    return this.authRepository.Login(email);
  }
}
