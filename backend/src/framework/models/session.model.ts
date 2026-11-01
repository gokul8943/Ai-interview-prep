import mongoose, { Schema } from "mongoose";
import { ISessionSchema } from "../../adapters/interfaces/ISessionSchema";

const sessionSchema = new Schema<ISessionSchema>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    familyId: { type: String, required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    revokedAt: { type: Date, default: null },
    replacedByHash: { type: String },
    absoluteExpiresAt: { type: Date, required: true },
    expiresAt: { type: Date, required: true },
    userAgent: { type: String },
    ip: { type: String },
    createdAt: { type: Date, default: Date.now },
});

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<ISessionSchema>("Session", sessionSchema);
