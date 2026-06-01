import { logger } from "../utils/logger.js";

export function notFoundHandler(req, res) {
  return res.status(404).json({
    message: "Route not found",
    requestId: req.requestId || null
  });
}

export function errorHandler(error, req, res, _next) {
  if (error?.message === "CORS_NOT_ALLOWED") {
    return res.status(403).json({
      message: "CORS blocked for origin",
      requestId: req.requestId || null
    });
  }

  if (error instanceof SyntaxError && error?.status === 400 && "body" in error) {
    return res.status(400).json({
      message: "Invalid JSON payload",
      requestId: req.requestId || null
    });
  }

  const status = error?.status || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  const safeStatus = Number.isInteger(status) && status >= 400 && status <= 599 ? status : 500;

  if (safeStatus >= 500) {
    logger.error("api_error", {
      requestId: req.requestId || null,
      method: req.method,
      path: req.originalUrl,
      message: error?.message
    });
  }

  return res.status(safeStatus).json({
    message: safeStatus >= 500 ? "Internal server error" : error?.message || "Request failed",
    requestId: req.requestId || null
  });
}
