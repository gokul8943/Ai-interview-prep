import { SessionRepository } from "../../adapters/interfaces/SessionRepository";

export class LogoutAll {
    constructor(private sessionRepository: SessionRepository) { }

    async execute(userId: string): Promise<void> {
        await this.sessionRepository.revokeAllForUser(userId);
    }
}
