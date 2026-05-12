import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import portfolioRoutes from "./routes/portfolio.routes.js";

const app = express();
app.disable("x-powered-by");

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    if (env.frontendOrigins.includes("*") || env.frontendOrigins.includes(origin)) {
      return callback(null, true);
    }

    const corsError = new Error("CORS_NOT_ALLOWED");
    corsError.status = 403;
    return callback(corsError);
  },
  methods: ["GET", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-admin-token", "Authorization"],
  maxAge: 86400
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "200kb" }));
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    dbStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    time: new Date().toISOString()
  });
});

app.use("/api/portfolio", portfolioRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

async function startServer() {
  try {
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
