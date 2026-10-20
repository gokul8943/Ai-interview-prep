import { Document } from "mongoose";

export interface ISessionSchema extends Document {
    userId: any;
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
