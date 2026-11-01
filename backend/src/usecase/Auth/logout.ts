import { SessionRepository } from "../../adapters/interfaces/SessionRepository";
import { sha256 } from "../../utils/tokenCrypto";

export class Logout {
    constructor(private sessionRepository: SessionRepository) { }

    async execute(presentedToken: string | undefined): Promise<void> {
        if (!presentedToken) return;
        const session = await this.sessionRepository.findByTokenHash(sha256(presentedToken));
        if (session) {
            await this.sessionRepository.revokeFamily(session.familyId);
        }
    }
}
