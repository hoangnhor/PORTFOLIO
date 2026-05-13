# Portfolio Fullstack (React + Node.js + MongoDB)
[![CI](https://github.com/hoangnhor/PORTFOLIO/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/hoangnhor/PORTFOLIO/actions/workflows/ci.yml)

Production-aware personal portfolio project with:
- Frontend: React + Vite
- Backend: Express + Mongoose
- Database: MongoDB

## 1) Repository Structure
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
|   |   |-- validators/
|   |-- test/
|   |-- .env.example
|   |-- .gitignore
|   `-- package.json
|-- frontend/
|   |-- src/
|   |-- public/
|   |-- .env.example
|   |-- .gitignore
|   `-- package.json
|-- .github/workflows/ci.yml
|-- package.json
`-- README.md
```

## 2) Prerequisites
- Node.js 20+
- npm 10+
- MongoDB (local or remote)

## 3) Installation
From repository root:

```bash
npm run install:all
```

If needed:
```bash
npm run install:be
npm run install:fe
```

## 4) Environment Variables
Use `.env.example` as the source of truth.

### Backend (`backend/.env`)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hoang_portfolio
ADMIN_TOKEN=
FRONTEND_ORIGINS=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000
```

## 5) Run the Project
Run both apps:
```bash
npm run dev
```

Run separately:
```bash
npm run dev:be
npm run dev:fe
```

Seed backend data:
```bash
npm run seed:be
```

## 6) API Endpoints
- `GET /api/health`
- `GET /api/portfolio`
- `PUT /api/portfolio` (requires `x-admin-token` or `Authorization: Bearer <token>`)

Example update:
```bash
curl -X PUT http://localhost:5000/api/portfolio \
  -H "Content-Type: application/json" \
  -H "x-admin-token: replace-with-strong-secret" \
  -d "{\"headline\":\"Fullstack Web Developer\"}"
```

## 7) Verification Commands
### Frontend
```bash
npm --prefix frontend run lint
npm --prefix frontend run build
npm --prefix frontend run test:ci
```

### Backend
```bash
npm --prefix backend run lint
npm --prefix backend run test
npm --prefix backend run test:smoke
```

## 8) CI (GitHub Actions)
Workflow: `.github/workflows/ci.yml`

CI runs on `push` and `pull_request`:
1. `npm ci` (root)
2. `npm --prefix frontend ci`
3. `npm --prefix backend ci`
4. `npm --prefix frontend run build`
5. `npm --prefix frontend run lint`
6. `npm --prefix backend run lint`
7. `npm --prefix backend run test`
8. `npm --prefix backend run test:smoke`

## 9) Health Check and Operational Notes
- Health endpoint: `GET /api/health`
- Backend includes request tracing with `x-request-id`.
- Error responses are production-safe and include `requestId` for troubleshooting.

## 10) Deployment Checklist
- [ ] Configure all required env vars from `.env.example`.
- [ ] Set a strong `ADMIN_TOKEN`.
- [ ] Ensure MongoDB connectivity and credentials.
- [ ] Run verification commands locally (lint/build/test/smoke).
- [ ] Ensure CI workflow passes on target branch.
- [ ] Verify `GET /api/health` returns `status: ok`.
- [ ] Verify frontend can fetch backend through `VITE_API_BASE_URL`.
- [ ] Confirm CORS origins via `FRONTEND_ORIGINS`.
- [ ] Keep `.env` files out of version control.

## 11) Live Demo / Media
- Live demo: [https://tranvanhoang.vercel.app/](https://tranvanhoang.vercel.app/)
- GitHub Actions: [CI workflow runs](https://github.com/hoangnhor/PORTFOLIO/actions)

Media assets should be added under `docs/screenshots/` (or `docs/media/`) and referenced here:
```md
![Landing](docs/screenshots/landing.png)
![Mobile](docs/screenshots/mobile.png)
![Admin Update Flow](docs/screenshots/admin-update-flow.png)
![CI Passing](docs/screenshots/ci-passing.png)
![Demo GIF](docs/media/demo.gif)
```

## 12) Known Limitations (Honest Status)
- Frontend test runner is not configured yet; frontend `test:ci` currently documents/skips this gap.
- Frontend lint/build and backend lint/test/smoke are in place.
- This repo has practical production-minded safeguards, but it is still a portfolio project and should be validated further before high-traffic production use.
