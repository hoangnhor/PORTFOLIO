import mongoose from "mongoose";
import { findPortfolio, findPortfolioMeta } from "../repositories/portfolio.repository.js";
import { defaultPortfolio } from "../utils/defaultPortfolio.js";
import { logger } from "../utils/logger.js";

function isDatabaseReady() {
  return mongoose.connection.readyState === 1;
}

export async function getPortfolioFromDb() {
  if (!isDatabaseReady()) {
    logger.warn("portfolio_fallback_used", { reason: "db_unavailable" });
    return defaultPortfolio;
  }

  const existing = await findPortfolio();
  return existing || defaultPortfolio;
}

export async function getPortfolioMetaFromDb() {
  if (!isDatabaseReady()) {
    logger.warn("portfolio_meta_fallback_used", { reason: "db_unavailable" });
    return { updatedAt: null };
  }

  const existingMeta = await findPortfolioMeta();
  return existingMeta || { updatedAt: null };
}
