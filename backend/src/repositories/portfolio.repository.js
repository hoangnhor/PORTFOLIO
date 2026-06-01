import Portfolio from "../models/portfolio.model.js";

const PORTFOLIO_KEY = "main";

async function ensurePortfolioKey() {
  const existing = await Portfolio.findOne({ key: PORTFOLIO_KEY }, { _id: 1 }).lean();
  if (existing) {
    return;
  }

  await Portfolio.findOneAndUpdate(
    { key: { $exists: false } },
    { $set: { key: PORTFOLIO_KEY } },
    { sort: { updatedAt: -1 } }
  );
}

export async function findPortfolio() {
  await ensurePortfolioKey();
  return Portfolio.findOne({ key: PORTFOLIO_KEY }).lean();
}

export async function findPortfolioMeta() {
  await ensurePortfolioKey();
  return Portfolio.findOne({ key: PORTFOLIO_KEY }, { updatedAt: 1 }).lean();
}

export async function upsertPortfolio(payload) {
  await ensurePortfolioKey();
  return Portfolio.findOneAndUpdate({ key: PORTFOLIO_KEY }, { ...payload, key: PORTFOLIO_KEY }, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true
  }).lean();
}
