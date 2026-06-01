import { connectDatabase } from "./config/database.js";
import { env, validateEnv } from "./config/env.js";
import app from "./app.js";
import { logger } from "./utils/logger.js";

async function startServer() {
  try {
    validateEnv();
    await connectDatabase();
    app.listen(env.port, () => {
      logger.info("server_started", { port: env.port });
    });
  } catch (error) {
    logger.error("server_start_failed", { message: error.message });
    process.exit(1);
  }
}

startServer();
