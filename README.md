# PORTFOLIO

[![CI](https://github.com/hoangnhor/PORTFOLIO/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/hoangnhor/PORTFOLIO/actions/workflows/ci.yml)

Personal fullstack portfolio system, production-aware.

- Frontend: React + Vite
- Backend: Node.js + Express + Mongoose
- Database: MongoDB

## 1) Features

- Public portfolio UI (skills, projects, experience, contact)
- Backend API for portfolio read
- Structured logging + request id
- Security baseline: `helmet`, CORS allowlist, hybrid rate limiting with Mongo primary and in-memory fallback
- Local fallback data on frontend when API is unavailable

## 2) Tech Requirements

- Node.js 20+
- npm 10+
- MongoDB (local or cloud)

## 3) Project Structure

```text
.
|-- backend/
|   |-- src/
|   |   |-- app.js
|   |   |-- server.js
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- middlewares/
|   |   |-- models/
|   |   |-- repositories/
|   |   |-- routes/
|   |   |-- services/
|   |   |-- utils/
|   |   `-- validators/
|   |-- test/
|   |-- .env.example
|   `-- package.json
|-- frontend/
|   |-- src/
|   |-- public/
|   |-- tests/
|   |-- .env.example
|   `-- package.json
|-- .github/workflows/ci.yml
|-- package.json
`-- README.md
```

## 4) Setup

Install all dependencies from root:

```bash
npm run install:all
```

Create env files:

- `backend/.env` from `backend/.env.example`
- `frontend/.env` from `frontend/.env.example`

## 5) Environment Variables

### Backend (`backend/.env`)

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hoang_portfolio
TRUST_PROXY=false
FRONTEND_ORIGINS=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000
```

## 6) Run

Run both FE + BE:

```bash
npm run dev
```

Run separately:

```bash
npm run dev:be
npm run dev:fe
```

## 7) Scripts

### Root

```bash
npm run install:all
npm run dev
npm run build
```

### Backend

```bash
npm --prefix backend run dev
npm --prefix backend run lint
npm --prefix backend run test
npm --prefix backend run test:smoke
```

### Frontend

```bash
npm --prefix frontend run dev
npm --prefix frontend run lint
npm --prefix frontend run build
npm --prefix frontend run test:ci
```

## 8) API

Base URL (local): `http://localhost:5000`

- `GET /api/health`
- `GET /api/ready`
- `GET /api/portfolio`
- `GET /api/portfolio/meta`

Note: if MongoDB is temporarily unavailable, the backend still boots and serves the portfolio from fallback data.
Rate limiting uses MongoDB when available and falls back to in-memory enforcement when MongoDB is down.

## 9) Testing & Verification

Recommended checks before deploy:

```bash
npm --prefix frontend run lint
npm --prefix frontend run build
npm --prefix frontend run test:ci
npm --prefix backend run lint
npm --prefix backend run test
npm --prefix backend run test:smoke
```

Note: Mongo integration tests in `backend/test/portfolio.integration.test.js` run only when:

```bash
ENABLE_INTEGRATION_MONGO=true npm --prefix backend run test
```

Or run only integration tests:

```bash
ENABLE_INTEGRATION_MONGO=true npm --prefix backend run test:integration
```

## 10) CI

GitHub Actions workflow: `.github/workflows/ci.yml`

Current pipeline includes:

1. Install dependencies
2. Frontend lint/build/test
3. Backend lint/test/integration/smoke

## 11) Deployment Checklist

- [ ] Set all required env vars
- [ ] Confirm Mongo connectivity
- [ ] Verify `GET /api/health` and `GET /api/ready`
- [ ] Confirm FE uses correct `VITE_API_BASE_URL`
- [ ] Run lint/test/build before release
- [ ] Verify GitHub Actions keep-alive workflow pings `https://portfolio-hqw1.onrender.com/api/health`

## 12) Live

- Website: [https://tranvanhoang.vercel.app/](https://tranvanhoang.vercel.app/)
- Repository: [https://github.com/hoangnhor/PORTFOLIO](https://github.com/hoangnhor/PORTFOLIO)
- CI runs: [https://github.com/hoangnhor/PORTFOLIO/actions](https://github.com/hoangnhor/PORTFOLIO/actions)
