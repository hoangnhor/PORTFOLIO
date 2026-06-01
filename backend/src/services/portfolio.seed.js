import { connectDatabase, disconnectDatabase } from "../config/database.js";
import Portfolio from "../models/portfolio.model.js";
import { defaultPortfolio } from "../utils/defaultPortfolio.js";
import { logger } from "../utils/logger.js";

async function seed() {
  try {
    await connectDatabase();
    const shouldReset = String(process.env.SEED_RESET || "").toLowerCase() === "true";

    if (shouldReset) {
      await Portfolio.deleteMany({});
    }

    await Portfolio.findOneAndUpdate({ key: "main" }, { ...defaultPortfolio, key: "main" }, {
      upsert: true,
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true
    });
    logger.info("seed_completed", { reset: shouldReset });
  } catch (error) {
    logger.error("seed_failed", { message: error.message });
  } finally {
    await disconnectDatabase();
  }
}

seed();
