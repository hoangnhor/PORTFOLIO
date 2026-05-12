import { Router } from "express";
import { getPortfolio, upsertPortfolio } from "../controllers/portfolio.controller.js";
import { requireAdminToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getPortfolio);
router.put("/", requireAdminToken, upsertPortfolio);

export default router;
