import { connectDatabase } from "./config/database.js";
import { env, validateEnv } from "./config/env.js";
import app from "./app.js";

async function startServer() {
  try {
    validateEnv();
    await connectDatabase();
    app.listen(env.port, () => {
      console.log(`Backend running at http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
