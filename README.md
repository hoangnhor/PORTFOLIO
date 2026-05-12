# Portfolio Fullstack (BE + FE)

## Cau truc thu muc
```text
.
|-- backend/
|   |-- src/
|   |   |-- config/
|   |   |   |-- database.js
|   |   |   `-- env.js
|   |   |-- controllers/
|   |   |   `-- portfolio.controller.js
|   |   |-- models/
|   |   |   `-- portfolio.model.js
|   |   |-- routes/
|   |   |   `-- portfolio.routes.js
|   |   |-- middlewares/
|   |   |   |-- auth.middleware.js
|   |   |   `-- error.middleware.js
|   |   |-- services/
|   |   |   |-- portfolio.service.js
|   |   |   `-- portfolio.seed.js
|   |   `-- utils/
|   |       `-- defaultPortfolio.js
|   |   `-- server.js
|   |-- .env
|   `-- package.json
|-- frontend/
|   |-- public/
|   |   |-- index.html
|   |   `-- CV_WebDev_Tran Van Hoang.pdf
|   |-- src/
|   |   |-- assets/
|   |   |   |-- styles/
|   |   |   |   `-- global.css
|   |   |   `-- templates/
|   |   |       `-- giaodienportfolio.html
|   |   |-- components/
|   |   |   `-- PortfolioFrame.jsx
|   |   |-- pages/
|   |   |   `-- HomePage.jsx
|   |   |-- services/
|   |   |   `-- portfolioApi.js
|   |   |-- hooks/
|   |   |   `-- index.js
|   |   |-- context/
|   |   |   `-- index.js
|   |   |-- layouts/
|   |   |   `-- MainLayout.jsx
|   |   |-- routes/
|   |   |   `-- AppRoutes.jsx
|   |   |-- utils/
|   |   |   `-- index.js
|   |   |-- App.jsx
|   |   `-- main.jsx
|   |-- .env
|   |-- vite.config.js
|   `-- package.json
`-- package.json
```

## Cai dat
```bash
npm run install:all
```

## Environment
`backend/.env`
```env
MONGO_URI=your_mongodb_connection_string
```

`frontend/.env`
```env
VITE_API_BASE_URL=http://localhost:5000
```

## Chay rieng tung phan
```bash
npm run dev:be
npm run dev:fe
```

## Chay dong thoi BE + FE
```bash
npm run dev
```

## Seed du lieu MongoDB
```bash
npm run seed:be
```

## API
- `GET /api/health`
- `GET /api/portfolio`
- `PUT /api/portfolio` (can `x-admin-token` or `Authorization: Bearer <token>`)

## Update portfolio (protected)
```bash
curl -X PUT http://localhost:5000/api/portfolio \
  -H "Content-Type: application/json" \
  -H "x-admin-token: replace-with-strong-secret" \
  -d "{\"headline\":\"Fullstack Web Developer\"}"
```
