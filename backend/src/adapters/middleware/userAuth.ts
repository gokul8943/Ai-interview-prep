import { RequestHandler } from "express";
import { TokenService } from "../interfaces/TokenService";
import { SessionRepository } from "../interfaces/SessionRepository";

export const createAuthMiddleware = (
    tokenService: TokenService,
    sessionRepository: SessionRepository
): RequestHandler => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                res.status(401).json({ message: "Unauthorized: No token provided" });
                return;
            }

            const token = authHeader.slice(7);
            const claims = tokenService.verifyAccessToken(token);

            const session = await sessionRepository.findById(claims.sid);
            if (!session || session.revokedAt || session.expiresAt.getTime() <= Date.now()) {
                res.status(401).json({ message: "Invalid or expired token" });
                return;
            }

            if (String(session.userId) !== claims.userId) {
                res.status(401).json({ message: "Invalid or expired token" });
                return;
            }

            req.user = {
                userId: claims.userId,
                role: claims.role,
                sid: claims.sid,
            };
            next();
        } catch {
            res.status(401).json({ message: "Invalid or expired token" });
        }
    };
};
