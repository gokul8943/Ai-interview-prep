import { Model } from "mongoose";
import { ISessionSchema } from "../interfaces/ISessionSchema";
import { CreateSessionInput, Session, SessionRepository } from "../interfaces/SessionRepository";

const toDomain = (doc: ISessionSchema): Session => ({
    _id: String(doc._id),
    userId: String(doc.userId),
    familyId: doc.familyId,
    tokenHash: doc.tokenHash,
    revokedAt: doc.revokedAt ?? null,
    replacedByHash: doc.replacedByHash,
    absoluteExpiresAt: doc.absoluteExpiresAt,
    expiresAt: doc.expiresAt,
    userAgent: doc.userAgent,
    ip: doc.ip,
    createdAt: doc.createdAt,
});

export class SessionRepositoryImpl implements SessionRepository {
    private readonly SessionModel: Model<ISessionSchema>;

    constructor(sessionModel: Model<ISessionSchema>) {
        this.SessionModel = sessionModel;
    }

    async create(input: CreateSessionInput): Promise<Session> {
        const doc = await this.SessionModel.create({ ...input, revokedAt: null });
        return toDomain(doc);
    }

    async findByTokenHash(tokenHash: string): Promise<Session | null> {
        const doc = await this.SessionModel.findOne({ tokenHash });
        return doc ? toDomain(doc) : null;
    }

    async findById(sessionId: string): Promise<Session | null> {
        const doc = await this.SessionModel.findById(sessionId);
        return doc ? toDomain(doc) : null;
    }

    async revokeByTokenHash(tokenHash: string, replacedByHash?: string): Promise<void> {
        await this.SessionModel.updateOne(
            { tokenHash, revokedAt: null },
            { $set: { revokedAt: new Date(), ...(replacedByHash ? { replacedByHash } : {}) } }
        );
    }

    async revokeFamily(familyId: string): Promise<void> {
        await this.SessionModel.updateMany(
            { familyId, revokedAt: null },
            { $set: { revokedAt: new Date() } }
        );
    }

    async revokeAllForUser(userId: string): Promise<void> {
        await this.SessionModel.updateMany(
            { userId, revokedAt: null },
            { $set: { revokedAt: new Date() } }
        );
    }
}
