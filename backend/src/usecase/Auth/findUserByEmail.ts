import { AuthRepository } from "../../adapters/interfaces/AuthRepository";

export class FindUserByEmail {
    constructor(private authRepository: AuthRepository) { }

    async execute(email: string): Promise<any> {
        return this.authRepository.findByEmail(email);
    }
}
