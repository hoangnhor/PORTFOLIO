import dotenv from "dotenv";

dotenv.config();

function parseOrigins(value) {
  const normalizeOrigin = (origin) => String(origin || "").trim().replace(/\/+$/, "");

  const rawValue = String(value || "")
    .split(",")
    .map((item) => normalizeOrigin(item))
    .filter(Boolean);

  if (rawValue.includes("*")) {
    return ["*"];
  }

  return rawValue;
}

function parsePort(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1 || parsed > 65535) {
    return 5000;
  }
  return parsed;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: (process.env.NODE_ENV || "development") === "production",
  port: parsePort(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hoang_portfolio",
  adminToken: String(process.env.ADMIN_TOKEN || "").trim(),
  frontendOrigins: parseOrigins(process.env.FRONTEND_ORIGINS || process.env.FRONTEND_ORIGIN || "http://localhost:5173")
};

export function validateEnv() {
  if (!env.mongoUri) {
    throw new Error("MONGO_URI is required");
  }

  if (env.isProduction && !env.adminToken) {
    throw new Error("ADMIN_TOKEN is required in production");
  }
}
