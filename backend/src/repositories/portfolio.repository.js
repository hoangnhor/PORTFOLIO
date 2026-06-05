import Portfolio from "../models/portfolio.model.js";

const PORTFOLIO_KEY = "main";

export async function findPortfolio() {
  return Portfolio.findOne({ key: PORTFOLIO_KEY }).lean();
}

export async function findPortfolioMeta() {
  return Portfolio.findOne({ key: PORTFOLIO_KEY }, { updatedAt: 1 }).lean();
}
