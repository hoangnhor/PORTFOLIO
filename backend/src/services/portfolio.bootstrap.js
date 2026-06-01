import { connectDatabase, disconnectDatabase } from "../config/database.js";
import Portfolio from "../models/portfolio.model.js";
import { defaultPortfolio } from "../utils/defaultPortfolio.js";
import { logger } from "../utils/logger.js";

async function bootstrapPortfolio() {
  const docs = await Portfolio.find({}, { _id: 1, key: 1, updatedAt: 1 }).sort({ updatedAt: -1 }).lean();

  if (!docs.length) {
    await Portfolio.findOneAndUpdate({ key: "main" }, { ...defaultPortfolio, key: "main" }, { upsert: true, new: true });
    logger.info("portfolio_bootstrap_created_default");
    return;
  }

  const mainDoc = docs.find((doc) => doc.key === "main");
  if (!mainDoc) {
    await Portfolio.updateOne({ _id: docs[0]._id }, { $set: { key: "main" } });
    logger.warn("portfolio_bootstrap_assigned_main_key", { assignedId: String(docs[0]._id) });
  }
}

async function run() {
  try {
    await connectDatabase();
    await bootstrapPortfolio();
    logger.info("portfolio_bootstrap_completed");
  } catch (error) {
    logger.error("portfolio_bootstrap_failed", { message: error?.message || "Unknown error" });
    process.exitCode = 1;
  } finally {
    await disconnectDatabase();
  }
}

run();
