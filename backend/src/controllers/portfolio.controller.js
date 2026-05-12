import { getPortfolioFromDb, upsertPortfolioToDb } from "../services/portfolio.service.js";

export async function getPortfolio(req, res, next) {
  try {
    const portfolio = await getPortfolioFromDb();

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found in database" });
    }

    res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    return res.json(portfolio);
  } catch (error) {
    return next(error);
  }
}

export async function upsertPortfolio(req, res, next) {
  try {
    const payload = req.body || {};
    const portfolio = await upsertPortfolioToDb(payload);
    return res.json(portfolio);
  } catch (error) {
    return next(error);
  }
}
