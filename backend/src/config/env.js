import dotenv from "dotenv";

dotenv.config();

function parseOrigins(value) {
  const rawValue = String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (rawValue.includes("*")) {
    return ["*"];
  }

  return rawValue;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hoang_portfolio",
  adminToken: process.env.ADMIN_TOKEN || "",
  frontendOrigins: parseOrigins(process.env.FRONTEND_ORIGINS || process.env.FRONTEND_ORIGIN || "*")
};
