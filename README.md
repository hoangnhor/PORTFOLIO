# Portfolio Fullstack (React + Node.js + MongoDB)
[![CI](https://github.com/hoangnhor/PORTFOLIO/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/hoangnhor/PORTFOLIO/actions/workflows/ci.yml)

Production-aware personal portfolio system:
- Frontend: React + Vite
- Backend: Express + Mongoose
- Database: MongoDB

## Tech Stack
- Node.js 20+
- npm 10+
- MongoDB (local or cloud)

## Repository Structure
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
|   |-- tests/
|   |-- public/
|   |-- .env.example
|   `-- package.json
|-- .github/workflows/ci.yml
|-- package.json
`-- README.md
```

## Setup
Từ thư mục root:

```bash
npm run install:all
```

## Environment Variables
Copy từ file `.env.example`.

### Backend (`backend/.env`)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hoang_portfolio
ADMIN_TOKEN=replace-with-strong-secret
FRONTEND_ORIGINS=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000
```

## Run
Chạy cả FE + BE:
```bash
npm run dev
```

Chạy riêng:
```bash
npm run dev:be
npm run dev:fe
```

## Data Bootstrap & Maintenance
Bootstrap dữ liệu mặc định nếu DB trống:
```bash
npm run bootstrap:be
```

Seed dữ liệu portfolio:
```bash
npm run seed:be
```

Cleanup dữ liệu dư, giữ singleton portfolio:
```bash
npm run cleanup:be:singleton
```

## API Endpoints
- `GET /api/health`
- `GET /api/ready`
- `GET /api/portfolio`
- `GET /api/portfolio/meta`
- `PUT /api/portfolio` (requires admin token)

Header auth cho `PUT /api/portfolio`:
- `x-admin-token: <ADMIN_TOKEN>`
- hoặc `Authorization: Bearer <ADMIN_TOKEN>`

Ví dụ update:
```bash
curl -X PUT http://localhost:5000/api/portfolio \
  -H "Content-Type: application/json" \
  -H "x-admin-token: replace-with-strong-secret" \
  -d "{\"headline\":\"Fullstack Web Developer\"}"
```

## Quality Verification
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

Ghi chú integration test Mongo:
- `backend/test/portfolio.integration.test.js` chỉ chạy khi set `ENABLE_INTEGRATION_MONGO=true`.

## CI
Workflow: `.github/workflows/ci.yml`

CI chạy:
1. Install dependencies (root/frontend/backend)
2. Install Playwright Chromium
3. Frontend lint/build/test
4. Backend lint/test/smoke

## Operational Notes
- Error response luôn có `requestId`.
- Request logging dùng JSON structured logs.
- Logger có redaction cho key nhạy cảm (`authorization`, `x-admin-token`, `cookie`, `token`, `password`, `secret`).
- `GET /api/ready` trả `503` khi DB chưa connected.

## Deployment Checklist
- [ ] Set env vars đầy đủ theo `.env.example`
- [ ] Set `ADMIN_TOKEN` mạnh
- [ ] Verify Mongo connectivity
- [ ] Run lint/build/test trước deploy
- [ ] Verify `/api/health` và `/api/ready`
- [ ] Verify FE gọi đúng `VITE_API_BASE_URL`
- [ ] Review CORS bằng `FRONTEND_ORIGINS`

## Live
- Demo: [https://tranvanhoang.vercel.app/](https://tranvanhoang.vercel.app/)
- CI runs: [https://github.com/hoangnhor/PORTFOLIO/actions](https://github.com/hoangnhor/PORTFOLIO/actions)
