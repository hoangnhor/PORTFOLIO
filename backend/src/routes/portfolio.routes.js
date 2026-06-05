import { Router } from "express";
import { getPortfolio, getPortfolioMeta } from "../controllers/portfolio.controller.js";

const router = Router();

router.get("/", getPortfolio);
router.get("/meta", getPortfolioMeta);

export default router;
