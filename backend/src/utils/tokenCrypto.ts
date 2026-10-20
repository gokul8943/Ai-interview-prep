import crypto from "crypto";

export const generateRefreshToken = (): string => {
    return crypto.randomBytes(32).toString("base64url");
};

export const sha256 = (value: string): string => {
    return crypto.createHash("sha256").update(value, "utf8").digest("base64url");
};

export const generateFamilyId = (): string => {
    return crypto.randomUUID();
};

export const constantTimeEquals = (a: string, b: string): boolean => {
    const bufferA = Buffer.from(a, "utf8");
    const bufferB = Buffer.from(b, "utf8");
    if (bufferA.length !== bufferB.length) {
        return false;
    }
    return crypto.timingSafeEqual(bufferA, bufferB);
};
