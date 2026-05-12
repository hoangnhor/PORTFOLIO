import rateLimit from "express-rate-limit";

function buildRateLimitHandler(message) {
  return (req, res) => {
    return res.status(429).json({
      message,
      requestId: req.requestId || null
    });
  };
}

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  handler: buildRateLimitHandler("Too many requests, please try again later.")
});

export const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: buildRateLimitHandler("Too many update attempts, please try again later.")
});
