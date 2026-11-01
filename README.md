# IntelliPrep — AI-Powered Interview Practice Platform

A production-ready, full-stack interview preparation platform enabling developers to practice realistic mock interviews with AI-generated questions, speech-to-text answers, and detailed AI-driven feedback reports.

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         IntelliPrep Platform                        │
├─────────────────────────────────────────────────────────────────────┤
│  Frontend (React 19 + TypeScript + Vite)                           │
│  ├── Authentication (Zustand + HttpOnly Cookies)                   │
│  ├── Interview Flow (Speech SDK + Real-time Recording)             │
│  ├── Dashboard & Profile (TanStack-style State)                    │
│  └── UI System (Tailwind CSS 4 + Radix UI + shadcn patterns)       │
├─────────────────────────────────────────────────────────────────────┤
│  Backend (Express 5 + TypeScript + MongoDB)                        │
│  ├── Clean Architecture (Domain → Use Cases → Adapters)            │
│  ├── JWT Access + Rotating Refresh Tokens (HttpOnly, Secure)       │
│  ├── Rate Limiting (Redis-backed, Fixed Window)                    │
│  ├── AI Integration (OpenAI + Gemini for Question Gen & Feedback)  │
│  └── Comprehensive Test Suite (Vitest + MongoDB Memory Server)     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Core Features

### 🎯 Interview Management
- **Custom Interview Creation** — Select domain, topics, difficulty level, and question count
- **Domain-Driven Question Bank** — 10+ technical domains (Frontend, Backend, ML, DevOps, Data, etc.)
- **Real-time Interview Session** — Timer, navigation, notes, and question tracking

### 🎤 Speech-First Answering
- **Microsoft Cognitive Services Speech SDK** — High-accuracy speech-to-text
- **Real-time Transcription** — Live feedback while speaking
- **Fallback Support** — Web Speech API compatibility layer

### 🤖 AI-Powered Analysis
- **Question Generation** — Context-aware questions via OpenAI/Gemini
- **Structured Feedback** — Communication, Technical Depth, Problem Solving scores
- **Strengths & Improvements** — Actionable, categorized recommendations
- **Performance Timeline** — Question-by-question breakdown with scoring

### 🔐 Authentication & Security
- **JWT Access Tokens** (10 min) + **Rotating Refresh Tokens** (30 days)
- **HttpOnly, Secure, SameSite=None Cookies** — CSRF-resistant, XSS-safe
- **Token Family Rotation** — Reuse detection with grace-period handling
- **Rate Limiting** — Per-endpoint (auth, OTP, refresh) with Redis backend
- **Origin Validation** — CORS + explicit origin allowlist

### 👤 User Experience
- **Profile Dashboard** — Interview history, stats, progress tracking
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Toast Notifications** — Sonner for non-intrusive feedback
- **Protected Routes** — Auth-guard with automatic token refresh

---

## 🛠 Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Frontend** | React | 19.1 |
| | TypeScript | 5.8 |
| | Vite | 6.3 |
| | Tailwind CSS | 4.1 |
| | Radix UI | 1.1 |
| | Zustand | 5.0 |
| | React Hook Form + Zod | 7.56 / 3.24 |
| | React Router | 7.6 |
| | Microsoft Speech SDK | 1.45 |
| | Recharts | 3.1 |
| **Backend** | Node.js | 20+ |
| | Express | 5.1 |
| | TypeScript | 5.8 |
| | MongoDB + Mongoose | 8.13 |
| | Redis (ioredis) | 5.11 |
| | JWT (jsonwebtoken) | 9.0 |
| | OpenAI SDK | 5.21 |
| | Google GenAI | 1.22 |
| | Nodemailer | 6.10 |
| **Testing** | Vitest | 5.0 |
| | MongoDB Memory Server | 11.3 |
| | Supertest | 7.3 |
| **DevOps** | ESLint (flat config) | 9.25 |
| | TypeScript Strict Mode | ✅ |
| | HTTPS Dev (mkcert) | ✅ |

---

## 📁 Project Structure

```
ai_interview_prep/
├── backend/
│   ├── src/
│   │   ├── adapters/           # Interface implementations (Controllers, Repositories, Routes, Middleware)
│   │   ├── framework/          # Infrastructure (Config, Database, Services, Models)
│   │   │   ├── config/         # Env, Redis, Rate Limiter
│   │   │   ├── database/       # MongoDB Connection
│   │   │   ├── models/         # Mongoose Schemas
│   │   │   └── services/       # JWT, Password, Email, AI, Rate Limiter
│   │   ├── usecase/            # Business Logic (Clean Architecture)
│   │   │   ├── Auth/           # SignUp, Login, Refresh, Logout, OTP
│   │   │   ├── Interview/      # Create, SaveAnswer, GenerateSummary, GetSummary
│   │   │   ├── User/           # Profile, History
│   │   │   ├── Cms/            # Domain/Topic/Level Management (Admin)
│   │   │   ├── Feedback/       # Feedback CRUD
│   │   │   └── Admin/          # User Management
│   │   ├── entity/             # Domain Entities
│   │   ├── types/              # TypeScript Augmentation
│   │   └── utils/              # Shared Utilities
│   └── tests/                  # Integration & Unit Tests
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable UI (Button, Form, Dialog, Navbar, etc.)
│   │   │   └── ui/             # shadcn-style primitives
│   │   ├── pages/              # Route-level Components
│   │   │   ├── Auth/           # SignIn, SignUp, OTP
│   │   │   ├── Interview/      # Interview Session, Summary
│   │   │   ├── Profile/        # Dashboard, History, Stats
│   │   │   ├── CreateInterview/# Multi-step Wizard
│   │   │   └── Public/         # Home, Demo, Roles, Privacy
│   │   ├── store/              # Zustand State (Auth)
│   │   ├── services/           # Axios Instance + API Clients
│   │   ├── hooks/              # Custom React Hooks
│   │   ├── lib/                # Utilities (cn, formatters)
│   │   └── constants/          # Base URL, Paths
│   └── public/                 # Static Assets
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 20
- **MongoDB** ≥ 6.0 (local or Atlas)
- **Redis** ≥ 7.0 (local or managed)
- **OpenAI API Key** (for question generation & feedback)
- **Google Gemini API Key** (optional, fallback)
- **Microsoft Speech Key + Region** (for STT)

### 1. Clone & Install

```bash
git clone https://github.com/your-org/intelliprep.git
cd intelliprep

# Backend
cd backend
cp .env.example .env   # Configure all variables (see below)
npm install

# Frontend
cd ../frontend
cp .env.example .env.local  # Or create .env.local manually
npm install
```

### 2. Environment Variables

#### Backend (`.env`)
```env
# Server
PORT=5000
NODE_ENV=development
TRUST_PROXY=1

# Database
MONGODB_URI=mongodb://127.0.0.1:27017/intelliprep

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your-32-char-min-secret-here
JWT_ISSUER=intelliprep
JWT_AUDIENCE=intelliprep-web
JWT_ACCESS_EXPIRES_IN=10m
REFRESH_TOKEN_EXPIRES_IN=30d

# Cookies
COOKIE_SECURE=false          # true in production
COOKIE_DOMAIN=               # e.g., .yourdomain.com for prod
REFRESH_COOKIE_NAME=ip_rt

# AI Providers
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AIza...

# Email (Nodemailer)
Email_User=your-email@gmail.com
Email_Pass=your-app-password

# Frontend URL (CORS + Origin Validation)
FRONTEND_URL=https://localhost:5173
```

#### Frontend (`.env.local`)
```env
VITE_APP=https://localhost:5000
VITE_OPENAI_API_KEY=sk-...          # Optional: client-side fallback
GOOGLE_GENERATIVE_AI_API_KEY=AIza... # Optional: client-side fallback
```

### 3. Run Development Servers

```bash
# Terminal 1 - Backend (HTTPS via mkcert)
cd backend
npm run dev
# → https://localhost:5000

# Terminal 2 - Frontend (HTTPS via mkcert)
cd frontend
npm run dev
# → https://localhost:5173
```

> **Note:** Both servers use `vite-plugin-mkcert` for trusted local HTTPS. First run installs a local CA — accept the system prompt.

### 4. Run Tests

```bash
# Backend
cd backend
npm run test           # CI mode
npm run test:watch     # Watch mode
npm run typecheck      # TypeScript strict check

# Frontend
cd frontend
npm run lint           # ESLint flat config
npm run build          # Production build verification
```

---

## 🔐 Authentication Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │     │   Backend   │     │   Database  │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │  POST /sign-in    │                   │
       │  (email, pass)    │                   │
       ├──────────────────►│                   │
       │                   │  Verify bcrypt    │
       │                   ├──────────────────►│
       │                   │  Create Session   │
       │                   ├──────────────────►│
       │                   │                   │
       │  Set-Cookie:      │                   │
       │  ip_rt=refresh    │                   │
       │  (HttpOnly,       │                   │
       │   Secure,         │                   │
       │   SameSite=None)  │                   │
       │◄──────────────────┤                   │
       │  { accessToken,  │                   │
       │    user }         │                   │
       │                   │                   │
       │  GET /me          │                   │
       │  Authorization:   │                   │
       │  Bearer <access>  │                   │
       ├──────────────────►│                   │
       │                   │  Verify JWT       │
       │                   │  Check Session    │
       │                   ├──────────────────►│
       │  { user }         │                   │
       │◄──────────────────┤                   │
       │                   │                   │
       │  (later) 401      │                   │
       │  POST /refresh    │                   │
       │  (Cookie sent)    │                   │
       ├──────────────────►│                   │
       │                   │  Rotate Token     │
       │                   │  New Session +    │
       │                   │  New Refresh      │
       │  Set-Cookie:      │                   │
       │  ip_rt=new_refresh│                   │
       │  { accessToken }  │                   │
       │◄──────────────────┤                   │
```

---

## 🎤 Interview Flow

1. **Create Interview** → Select Domain → Topics → Level → Question Count → Generate
2. **Start Session** → Questions load from AI-generated pool
3. **Answer** → Speech SDK transcribes in real-time → Save Answer
4. **Complete** → Trigger AI Summary Generation (async)
5. **View Report** → Scores, Timeline, Strengths, Improvements, Recommendations

---

## 📊 API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/auth/v1/sign-up` | ❌ | Register new user |
| `POST` | `/auth/v1/sign-in` | ❌ | Login, returns access token + sets refresh cookie |
| `POST` | `/auth/v1/refresh` | Cookie | Rotate refresh token, issue new access token |
| `POST` | `/auth/v1/logout` | Cookie | Revoke current session |
| `POST` | `/auth/v1/logout-all` | Bearer | Revoke all user sessions |
| `GET` | `/auth/v1/me` | Bearer | Get current user profile |
| `POST` | `/interview/v1/create` | Bearer | Create new interview session |
| `GET` | `/interview/v1/:id` | Bearer | Get interview details + questions |
| `POST` | `/interview/v1/:id/answer` | Bearer | Save answer for a question |
| `POST` | `/interview/v1/:id/complete` | Bearer | Mark complete, trigger AI summary |
| `GET` | `/interview/v1/:id/summary` | Bearer | Get AI-generated feedback report |
| `GET` | `/user/v1/interviews` | Bearer | List user's interview history |

---

## 🧪 Testing Strategy

| Layer | Tool | Coverage |
|-------|------|----------|
| **Unit** | Vitest | Use cases, utilities, validators |
| **Integration** | Vitest + Supertest + MongoDB Memory Server | Auth flow, rate limiting, interview CRUD |
| **E2E** | (Planned) Playwright | Critical user journeys |

```bash
# Backend: 45 tests covering auth, sessions, rate limiting, interviews
cd backend && npm run test
```

---

## 📦 Production Deployment

### Backend
```bash
npm run build          # Babel transpile to dist/
npm run start          # Run dist/index.js (or use PM2)
```
- Set `NODE_ENV=production`
- Use strong `JWT_SECRET` (≥32 chars)
- Enable `COOKIE_SECURE=true`
- Set `COOKIE_DOMAIN` for cross-subdomain cookies
- Configure reverse proxy (Nginx) with `trust proxy`

### Frontend
```bash
npm run build          # Vite production build to dist/
# Serve via Nginx, Vercel, Netlify, or any static host
```
- Ensure `VITE_APP` points to production backend URL
- Configure SPA fallback for React Router

### Docker (Example)
```dockerfile
# Backend
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist ./dist
EXPOSE 5000
CMD ["node", "dist/framework/index.js"]
```

---

## 🔒 Security Checklist

- [x] HttpOnly, Secure, SameSite=None refresh cookies
- [x] JWT with issuer/audience validation
- [x] Rotating refresh tokens with reuse detection
- [x] Rate limiting on auth endpoints (Redis)
- [x] CORS restricted to allowlisted origins
- [x] Origin/Referer validation on state-changing endpoints
- [x] Bcrypt password hashing (cost ≥ 12)
- [x] Input validation (Zod schemas on all endpoints)
- [x] Helmet-style headers via Express defaults
- [x] No secrets in client bundle

---

## 🛣 Roadmap

- [ ] WebSocket-based real-time interview collaboration
- [ ] Video recording + analysis
- [ ] Company-specific question packs
- [ ] Team workspaces & shared interviews
- [ ] Export reports (PDF/Markdown)
- [ ] Mobile app (React Native)
- [ ] Plugins for IDE integration

---

## 🤝 Contributing

```bash
# 1. Fork & clone
# 2. Create feature branch
git checkout -b feat/amazing-feature

# 3. Make changes with tests
# 4. Run quality gates
cd backend && npm run typecheck && npm run test
cd ../frontend && npm run lint && npm run build

# 5. Commit (conventional commits)
git commit -m "feat: add amazing feature"

# 6. Push & open PR
```

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- **Microsoft Cognitive Services** — Speech SDK
- **OpenAI** — GPT models for question generation & feedback
- **Google Gemini** — Alternative AI provider
- **shadcn/ui** — Component patterns & Radix UI primitives
- **Vite + mkcert** — Zero-config local HTTPS