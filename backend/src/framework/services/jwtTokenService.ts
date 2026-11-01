import jwt from "jsonwebtoken";
import { AccessTokenClaims, TokenService } from "../../adapters/interfaces/TokenService";
import { env } from "../config/env";

export class JwtTokenService implements TokenService {
    signAccessToken(claims: AccessTokenClaims): string {
        return jwt.sign(
            {
                typ: "access",
                role: claims.role,
                sid: claims.sid,
            },
            env.jwtSecret,
            {
                algorithm: "HS256",
                subject: claims.userId,
                issuer: env.jwtIssuer,
                audience: env.jwtAudience,
                expiresIn: env.jwtAccessExpiresIn as jwt.SignOptions["expiresIn"],
            }
        );
    }

    verifyAccessToken(token: string): AccessTokenClaims {
        const decoded = jwt.verify(token, env.jwtSecret, {
            algorithms: ["HS256"],
            issuer: env.jwtIssuer,
            audience: env.jwtAudience,
        }) as jwt.JwtPayload;

        if (decoded.typ !== "access" || !decoded.sub || !decoded.sid) {
            throw new Error("Invalid access token claims");
        }

        return {
            userId: decoded.sub,
            role: typeof decoded.role === "string" ? decoded.role : "user",
            sid: String(decoded.sid),
        };
    }
}
