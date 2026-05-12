import Portfolio from "../models/portfolio.model.js";

export async function findPortfolio() {
  return Portfolio.findOne().lean();
}

export async function upsertPortfolio(payload) {
  return Portfolio.findOneAndUpdate({}, payload, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true
  }).lean();
}
