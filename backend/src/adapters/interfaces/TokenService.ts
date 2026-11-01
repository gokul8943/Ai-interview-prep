export interface AccessTokenClaims {
    userId: string;
    role: string;
    sid: string;
}

export interface TokenService {
    signAccessToken(claims: AccessTokenClaims): string;
    verifyAccessToken(token: string): AccessTokenClaims;
}
