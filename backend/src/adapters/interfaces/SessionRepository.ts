export interface Session {
    _id: string;
    userId: string;
    familyId: string;
    tokenHash: string;
    revokedAt: Date | null;
    replacedByHash?: string;
    absoluteExpiresAt: Date;
    expiresAt: Date;
    userAgent?: string;
    ip?: string;
    createdAt: Date;
}

export interface CreateSessionInput {
    userId: string;
    familyId: string;
    tokenHash: string;
    absoluteExpiresAt: Date;
    expiresAt: Date;
    userAgent?: string;
    ip?: string;
}

export interface SessionRepository {
    create(input: CreateSessionInput): Promise<Session>;
    findByTokenHash(tokenHash: string): Promise<Session | null>;
    findById(sessionId: string): Promise<Session | null>;
    revokeByTokenHash(tokenHash: string, replacedByHash?: string): Promise<void>;
    revokeFamily(familyId: string): Promise<void>;
    revokeAllForUser(userId: string): Promise<void>;
}
