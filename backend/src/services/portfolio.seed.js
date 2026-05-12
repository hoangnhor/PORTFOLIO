import { connectDatabase, disconnectDatabase } from "../config/database.js";
import Portfolio from "../models/portfolio.model.js";
import { defaultPortfolio } from "../utils/defaultPortfolio.js";

async function seed() {
  try {
    await connectDatabase();
    await Portfolio.deleteMany({});
    await Portfolio.create(defaultPortfolio);
    console.log("Seed completed");
  } catch (error) {
    console.error("Seed failed:", error.message);
  } finally {
    await disconnectDatabase();
  }
}

seed();
