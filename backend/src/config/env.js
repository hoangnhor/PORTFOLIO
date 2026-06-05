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

function parseTrustProxy(value, fallback) {
  const rawValue = String(value || "").trim();
  if (!rawValue) {
    return fallback;
  }

  if (rawValue === "true" || rawValue === "1") {
    return 1;
  }

  if (rawValue === "false" || rawValue === "0") {
    return false;
  }

  const parsed = Number(rawValue);
  if (Number.isInteger(parsed) && parsed >= 0) {
    return parsed;
  }

  return rawValue;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: (process.env.NODE_ENV || "development") === "production",
  port: parsePort(process.env.PORT || 5000),
  mongoUri:
    process.env.MONGO_URI ||
    ((process.env.NODE_ENV || "development") === "production" ? "" : "mongodb://127.0.0.1:27017/hoang_portfolio"),
  trustProxy: parseTrustProxy(process.env.TRUST_PROXY, (process.env.NODE_ENV || "development") === "production" ? 1 : false),
  frontendOrigins: parseOrigins(
    process.env.FRONTEND_ORIGINS || process.env.FRONTEND_ORIGIN || "http://localhost:5173,http://localhost:5174"
  )
};

export function validateEnv() {
  if (!env.mongoUri) {
    throw new Error("MONGO_URI is required");
  }
}
