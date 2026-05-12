export function notFoundHandler(req, res) {
  return res.status(404).json({ message: "Route not found" });
}

export function errorHandler(error, req, res, next) {
  if (error?.message === "CORS_NOT_ALLOWED") {
    return res.status(403).json({ message: "CORS blocked for origin" });
  }

  const status = error?.status || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  return res.status(status).json({
    message: error?.message || "Internal server error"
  });
}
