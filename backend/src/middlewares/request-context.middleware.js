import { randomUUID } from "crypto";

function buildRequestId() {
  return randomUUID();
}

export function attachRequestContext(req, res, next) {
  const incomingRequestId = req.headers["x-request-id"];
  const requestId = typeof incomingRequestId === "string" && incomingRequestId.trim() ? incomingRequestId.trim() : buildRequestId();

  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);
  next();
}

export function requestLogger(req, res, next) {
  const startedAt = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - startedAt;
    console.info("[API_REQUEST]", {
      requestId: req.requestId || null,
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs
    });
  });

  next();
}
