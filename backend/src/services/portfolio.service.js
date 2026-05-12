import Portfolio from "../models/portfolio.model.js";

export async function getPortfolioFromDb() {
  return Portfolio.findOne().lean();
}

export async function upsertPortfolioToDb(payload) {
  return Portfolio.findOneAndUpdate({}, payload, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true
  });
}
