import { getPortfolioFromDb, getPortfolioMetaFromDb } from "../services/portfolio.service.js";

export async function getPortfolio(req, res, next) {
  try {
    const portfolio = await getPortfolioFromDb();
    res.setHeader("Cache-Control", "no-store");
    return res.json(portfolio);
  } catch (error) {
    return next(error);
  }
}

export async function getPortfolioMeta(req, res, next) {
  try {
    const meta = await getPortfolioMetaFromDb();
    res.setHeader("Cache-Control", "no-store");
    return res.json({
      updatedAt: meta.updatedAt || null
    });
  } catch (error) {
    return next(error);
  }
}
