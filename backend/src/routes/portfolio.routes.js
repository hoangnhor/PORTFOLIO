import { Router } from "express";
import { getPortfolio, getPortfolioMeta, upsertPortfolio } from "../controllers/portfolio.controller.js";
import { requireAdminToken } from "../middlewares/auth.middleware.js";
import { writeLimiter } from "../middlewares/rate-limit.middleware.js";
import { validatePortfolioPayload } from "../validators/portfolio.validator.js";

const router = Router();

router.get("/", getPortfolio);
router.get("/meta", getPortfolioMeta);
router.put("/", writeLimiter, requireAdminToken, validatePortfolioPayload, upsertPortfolio);

export default router;
