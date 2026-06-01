import { connectDatabase, disconnectDatabase } from "../config/database.js";
import Portfolio from "../models/portfolio.model.js";
import { logger } from "../utils/logger.js";

async function cleanupSingleton() {
  const docs = await Portfolio.find({}, { _id: 1, key: 1, updatedAt: 1 }).sort({ updatedAt: -1 }).lean();
  if (docs.length <= 1) {
    logger.info("portfolio_singleton_cleanup_noop", { totalDocs: docs.length });
    return;
  }

  const mainDoc = docs.find((doc) => doc.key === "main") || docs[0];
  await Portfolio.updateOne({ _id: mainDoc._id }, { $set: { key: "main" } });

  const removeIds = docs.filter((doc) => String(doc._id) !== String(mainDoc._id)).map((doc) => doc._id);
  if (removeIds.length) {
    await Portfolio.deleteMany({ _id: { $in: removeIds } });
  }

  logger.warn("portfolio_singleton_cleanup_done", {
    keptId: String(mainDoc._id),
    removedCount: removeIds.length
  });
}

async function run() {
  try {
    await connectDatabase();
    await cleanupSingleton();
  } catch (error) {
    logger.error("portfolio_singleton_cleanup_failed", { message: error?.message || "Unknown error" });
    process.exitCode = 1;
  } finally {
    await disconnectDatabase();
  }
}

run();
