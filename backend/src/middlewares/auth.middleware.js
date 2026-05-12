import { env } from "../config/env.js";

function readToken(req) {
  const headerToken = req.headers["x-admin-token"];
  if (typeof headerToken === "string" && headerToken.trim()) {
    return headerToken.trim();
  }

  const authHeader = req.headers.authorization;
  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7).trim();
  }

  return "";
}

export function requireAdminToken(req, res, next) {
  if (!env.adminToken) {
    return res.status(500).json({
      message: "Server chưa cấu hình ADMIN_TOKEN",
      requestId: req.requestId || null
    });
  }

  const token = readToken(req);
  if (!token || token !== env.adminToken) {
    return res.status(401).json({
      message: "Unauthorized",
      requestId: req.requestId || null
    });
  }

  return next();
}
