import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import { attachRequestContext, requestLogger } from "./middlewares/request-context.middleware.js";
import { apiLimiter } from "./middlewares/rate-limit.middleware.js";
import portfolioRoutes from "./routes/portfolio.routes.js";

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);

function normalizeOrigin(origin) {
  return String(origin || "").trim().replace(/\/+$/, "");
}

function isLocalhostOrigin(origin) {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
}

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    const normalizedOrigin = normalizeOrigin(origin);
    if (
      env.frontendOrigins.includes("*") ||
      env.frontendOrigins.includes(normalizedOrigin) ||
      (!env.isProduction && isLocalhostOrigin(normalizedOrigin))
    ) {
      return callback(null, true);
    }

    const corsError = new Error("CORS_NOT_ALLOWED");
    corsError.status = 403;
    return callback(corsError);
  },
  methods: ["GET", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-admin-token", "Authorization", "Cache-Control"],
  maxAge: 86400
};

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);
app.use(attachRequestContext);
app.use(requestLogger);
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(apiLimiter);
app.use(express.json({ limit: "200kb" }));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    dbStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    time: new Date().toISOString()
  });
});

app.get("/api/ready", (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  if (!dbConnected) {
    return res.status(503).json({
      status: "not_ready",
      dbStatus: "disconnected",
      requestId: req.requestId || null,
      time: new Date().toISOString()
    });
  }

  return res.json({
    status: "ready",
    dbStatus: "connected",
    requestId: req.requestId || null,
    time: new Date().toISOString()
  });
});

app.use("/api/portfolio", portfolioRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
