import { AuthRepository } from "../../adapters/interfaces/AuthRepository";
import { UnauthorizedError } from "../../adapters/errors/httpErrors";
import { toUserDto, UserDto } from "./userDto";

export class GetMe {
    constructor(private authRepository: AuthRepository) { }

    async execute(userId: string): Promise<UserDto> {
        const user = await this.authRepository.findById(userId);
        if (!user) {
            throw new UnauthorizedError("Invalid session");
        }
        return toUserDto(user);
    }
}
