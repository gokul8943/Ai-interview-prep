import { AuthRepository } from "../../adapters/interfaces/AuthRepository";
import { PasswordService } from "../../adapters/interfaces/PasswordService";
import { SessionRepository } from "../../adapters/interfaces/SessionRepository";
import { TokenService } from "../../adapters/interfaces/TokenService";
import { UnauthorizedError } from "../../adapters/errors/httpErrors";
import { generateFamilyId, generateRefreshToken, sha256 } from "../../utils/tokenCrypto";
import { toUserDto, UserDto } from "./userDto";

export interface LoginMeta {
    ip?: string;
    userAgent?: string;
}

export interface SessionIssuedResult {
    accessToken: string;
    refreshToken: string;
    refreshExpiresAt: Date;
    user: UserDto;
}

export class Login {
    constructor(
        private authRepository: AuthRepository,
        private passwordService: PasswordService,
        private sessionRepository: SessionRepository,
        private tokenService: TokenService,
        private refreshTtlSeconds: number
    ) { }

    async execute(email: string, password: string, meta: LoginMeta = {}): Promise<SessionIssuedResult> {
        const user = await this.authRepository.findByEmail(email);

        if (!user) {
            await this.passwordService.compareWithDummy(password);
            throw new UnauthorizedError("Invalid credentials");
        }

        const passwordOk = await this.passwordService.compare(password, user.password);
        if (!passwordOk) {
            throw new UnauthorizedError("Invalid credentials");
        }

        if (this.passwordService.needsRehash(user.password)) {
            try {
                const rehashed = await this.passwordService.hash(password);
                await this.authRepository.updatePassword(String(user._id), rehashed);
            } catch {
                // opportunistic rehash must never block a successful login
            }
        }

        const now = Date.now();
        const expiresAt = new Date(now + this.refreshTtlSeconds * 1000);
        const refreshToken = generateRefreshToken();

        const session = await this.sessionRepository.create({
            userId: String(user._id),
            familyId: generateFamilyId(),
            tokenHash: sha256(refreshToken),
            absoluteExpiresAt: expiresAt,
            expiresAt,
            userAgent: meta.userAgent,
            ip: meta.ip,
        });

        const accessToken = this.tokenService.signAccessToken({
            userId: String(user._id),
            role: user.role || "user",
            sid: session._id,
        });

        return {
            accessToken,
            refreshToken,
            refreshExpiresAt: expiresAt,
            user: toUserDto(user),
        };
    }
}
