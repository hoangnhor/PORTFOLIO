import { getPortfolioFromDb, upsertPortfolioToDb } from "../services/portfolio.service.js";

export async function getPortfolio(req, res) {
  try {
    const portfolio = await getPortfolioFromDb();

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found in database" });
    }

    return res.json(portfolio);
  } catch (error) {
    return res.status(500).json({ message: "Cannot load portfolio", error: error.message });
  }
}

export async function upsertPortfolio(req, res) {
  try {
    const payload = req.body || {};

    const portfolio = await upsertPortfolioToDb(payload);

    return res.json(portfolio);
  } catch (error) {
    return res.status(400).json({ message: "Cannot update portfolio", error: error.message });
  }
}
