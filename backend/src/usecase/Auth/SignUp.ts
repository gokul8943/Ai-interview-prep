import { AuthRepository } from "../../adapters/interfaces/AuthRepository";
import { PasswordService } from "../../adapters/interfaces/PasswordService";
import { ConflictError } from "../../adapters/errors/httpErrors";

export interface SignUpInput {
    name: string;
    email: string;
    password: string;
    phone?: string;
}

export class SignUp {
    constructor(
        private authRepository: AuthRepository,
        private passwordService: PasswordService
    ) { }

    async execute(input: SignUpInput): Promise<any> {
        const existing = await this.authRepository.findByEmail(input.email);
        if (existing) {
            throw new ConflictError("User already exists");
        }

        if (input.phone) {
            const existingPhone = await this.authRepository.findByPhone(input.phone);
            if (existingPhone) {
                throw new ConflictError("Phone number already in use");
            }
        }

        const passwordHash = await this.passwordService.hash(input.password);

        try {
            return await this.authRepository.signUp({
                name: input.name,
                email: input.email,
                password: passwordHash,
                ...(input.phone ? { phone: input.phone } : {}),
            });
        } catch (error: any) {
            if (error?.code === 11000) {
                const field = Object.keys(error.keyPattern || {})[0];
                if (field === "phone") throw new ConflictError("Phone number already in use");
                throw new ConflictError("User already exists");
            }
            throw error;
        }
    }
}
