# Authentication & Authorization

This document describes the authentication model of the IntelliPrep backend and the
deployment steps required by the security hardening change.

## Token model

| Concern | Design |
| --- | --- |
| Access token | Short-lived HS256 JWT (default `10m`), returned in the JSON body, held **in memory** by the frontend. Claims: `sub` (userId), `sid` (session id), `role`, `iss`, `aud`, `typ=access`. |
| Refresh token | Opaque random string (32 bytes, base64url). Only its SHA-256 hash is stored in the `sessions` collection. Delivered as an **HttpOnly cookie** (`ip_rt`, `Path=/auth`, `SameSite=Lax`, `Secure` in production by default). Never returned in a response body. |
| Rotation | Every successful `POST /auth/v1/refresh` revokes the presented session record and issues a new token in the same *family*. |
| Reuse detection | Presenting a **stale** (already rotated) token outside a 30s grace window revokes the entire session family, forcing re-authentication. The grace window exists so concurrent browser tabs do not log the user out. |
| Logout | Revokes the presented session only. `logout-all` revokes every session of the user. |

Sessions are indexed with a TTL on `expiresAt`, so expired sessions are removed by MongoDB
automatically. Access tokens are additionally validated against a live, non-revoked session,
so logout takes effect immediately rather than after token expiry.

## Endpoints (`/auth/v1`)

| Method | Path | Auth | Rate limit |
| --- | --- | --- | --- |
| POST | `/sign-up` | none | 5 / 15 min / IP |
| POST | `/sign-in` | none | 5 / 15 min / IP |
| POST | `/generate-otp` | none | 3 / 10 min / email + IP |
| POST | `/verify-otp` | none | 5 / 15 min / email + IP |
| POST | `/refresh` | refresh cookie | 30 / 5 min / IP |
| POST | `/logout` | refresh cookie | 30 / 5 min / IP |
| POST | `/logout-all` | access token | — |
| GET | `/me` | access token | — |

`/refresh` and `/logout` additionally reject requests whose `Origin`/`Referer` is not in `FRONTEND_URL`.

OTP notes:

* Codes are 6 digits from `crypto.randomInt`, stored as SHA-256 hashes only.
* A code can be attempted at most `OTP_MAX_ATTEMPTS` times (enforced atomically in the database).
* `/generate-otp` responds with the same message whether or not the email is registered.
* Old plaintext OTP records (pre-upgrade) no longer match and simply expire via the TTL index.

## Authorization

* Every interview, summary and answer route derives the owner from the access token; requests
  for resources owned by another user return `404` so ownership is not leaked.
* `/admin/v1/*` requires `role=admin`. The CMS router (not used by the frontend) is also
  admin-only.
* Repository projections exclude `password`, `phone` and `googleId` from admin listings.

Existing users are **not** required to have `isVerified=true` to sign in — the flag is
informational only, so deploying this change does not lock anybody out.

## Required environment variables

See `.env.example`. New variables introduced by this change:

```
FRONTEND_URL            # comma-separated allowed origins
JWT_ACCESS_EXPIRES_IN   # default 10m
JWT_ISSUER              # default intelliprep
JWT_AUDIENCE            # default intelliprep-web
REFRESH_TOKEN_EXPIRES_IN# default 30d
REFRESH_COOKIE_NAME     # default ip_rt
COOKIE_SECURE           # default true when NODE_ENV=production
COOKIE_DOMAIN           # optional, for sharing the cookie across subdomains
OTP_EXPIRES_MINUTES     # default 5
OTP_MAX_ATTEMPTS        # default 5
TRUST_PROXY             # default 1 (set to the real proxy hop count)
```

`JWT_SECRET` is reused to sign access tokens. Rotate it at deploy time if it was ever shared;
in production it must be at least 32 characters (startup fails otherwise).

If the API and the web app are served from different registrable domains, the refresh cookie
will not be sent with `SameSite=Lax`. In that case either put both behind one parent domain
(`COOKIE_DOMAIN`) or switch the cookie to `SameSite=None; Secure`.

## Deployment notes

1. Set the new variables above in the backend environment.
2. Enable a Redis instance for rate limiting. If Redis is unreachable the limiters fail open
   (requests are allowed) rather than taking the API down.
3. Deploy the backend and frontend together. The frontend no longer reads tokens from
   `localStorage`; existing logged-in browsers must sign in once more, and any tokens left in
   `localStorage` are ignored.
4. Existing sessions/refresh JWTs are invalid: after deploy every user signs in again.

## Rollback

The change is additive at the database level (`sessions` collection, new `users.phone` field),
so rolling back the application code does not corrupt data:

1. Redeploy the previous backend build and restore the previous environment variables
   (`JWT_SECRET` can stay).
2. The previous build ignores `sessions` and `users.phone`; old access/refresh JWTs in
   `localStorage` become usable again.
3. Optionally drop the `sessions` collection and unset `users.phone` afterwards.

## Tests

```
cd backend
npm test          # vitest + supertest + mongodb-memory-server
npm run typecheck # tsc --noEmit
```

The suite covers signup (including mass-assignment and duplicate handling), login
(uniform errors, hashing upgrade, cookie flags), session rotation/reuse/family revocation,
logout and logout-all, `/me`, OTP hashing and attempt lockout, ownership isolation between
users, and admin-role enforcement.
