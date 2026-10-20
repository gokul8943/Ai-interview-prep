import { createAuthMiddleware } from "./userAuth";
import { JwtTokenService } from "../../framework/services/jwtTokenService";
import { SessionRepositoryImpl } from "../repositories/session.repositoryImpl";
import sessionModel from "../../framework/models/session.model";

const tokenService = new JwtTokenService();
const sessionRepository = new SessionRepositoryImpl(sessionModel);

export const authMiddleware = createAuthMiddleware(tokenService, sessionRepository);
