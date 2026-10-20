import { AuthRepository } from "../../adapters/interfaces/AuthRepository";
import { SessionRepository, Session } from "../../adapters/interfaces/SessionRepository";
import { TokenService } from "../../adapters/interfaces/TokenService";
import { UnauthorizedError } from "../../adapters/errors/httpErrors";
import { generateRefreshToken, sha256 } from "../../utils/tokenCrypto";
import { toUserDto, UserDto } from "./userDto";
import { LoginMeta, SessionIssuedResult } from "./login";

const ROTATION_GRACE_MS = 30_000;
const MAX_GRACE_HOPS = 5;

const withinGrace = (session: Session, now: number): boolean => {
    if (!session.revokedAt || !session.replacedByHash) return false;
    const age = now - session.revokedAt.getTime();
    return age >= 0 && age <= ROTATION_GRACE_MS;
};

export class Refresh {
    constructor(
        private authRepository: AuthRepository,
        private sessionRepository: SessionRepository,
        private tokenService: TokenService,
        private refreshTtlSeconds: number
    ) { }

    async execute(presentedToken: string | undefined, meta: LoginMeta = {}): Promise<SessionIssuedResult> {
        if (!presentedToken) {
            throw new UnauthorizedError("Invalid session");
        }

        const tokenHash = sha256(presentedToken);
        let current = await this.sessionRepository.findByTokenHash(tokenHash);

        if (!current) {
            throw new UnauthorizedError("Invalid session");
        }

        const now = Date.now();

        if (current.revokedAt) {
            if (!withinGrace(current, now)) {
                await this.sessionRepository.revokeFamily(current.familyId);
                console.warn(`[security] Refresh token reuse detected; revoked session family ${current.familyId}`);
                throw new UnauthorizedError("Invalid session");
            }

            let successor: Session | null = await this.sessionRepository.findByTokenHash(current.replacedByHash!);
            let hops = 0;
            while (successor && successor.revokedAt && hops < MAX_GRACE_HOPS && withinGrace(successor, now)) {
                successor = await this.sessionRepository.findByTokenHash(successor.replacedByHash!);
                hops++;
            }

            if (!successor || successor.revokedAt || successor.expiresAt.getTime() <= now) {
                throw new UnauthorizedError("Invalid session");
            }
            current = successor;
        }

        if (current.expiresAt.getTime() <= now || current.absoluteExpiresAt.getTime() <= now) {
            throw new UnauthorizedError("Invalid session");
        }

        const user = await this.authRepository.findById(current.userId);
        if (!user) {
            await this.sessionRepository.revokeFamily(current.familyId);
            throw new UnauthorizedError("Invalid session");
        }

        const newToken = generateRefreshToken();
        const newHash = sha256(newToken);
        const expiresAt = new Date(
            Math.min(now + this.refreshTtlSeconds * 1000, current.absoluteExpiresAt.getTime())
        );

        await this.sessionRepository.revokeByTokenHash(current.tokenHash, newHash);
        const newSession = await this.sessionRepository.create({
            userId: current.userId,
            familyId: current.familyId,
            tokenHash: newHash,
            absoluteExpiresAt: current.absoluteExpiresAt,
            expiresAt,
            userAgent: meta.userAgent,
            ip: meta.ip,
        });

        const accessToken = this.tokenService.signAccessToken({
            userId: String(user._id),
            role: user.role || "user",
            sid: newSession._id,
        });

        return {
            accessToken,
            refreshToken: newToken,
            refreshExpiresAt: expiresAt,
            user: toUserDto(user),
        };
    }
}
