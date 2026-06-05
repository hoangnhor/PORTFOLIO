import mongoose from "mongoose";
import RateLimitBucket from "../models/rate-limit.model.js";

const memoryBuckets = new Map();
let memoryCleanupInterval = null;

function buildRateLimitHandler(message) {
  return (req, res) => {
    return res.status(429).json({
      message,
      requestId: req.requestId || null
    });
  };
}

function getRateLimitKey(req) {
  return `${req.ip || "unknown"}:${req.method}`;
}

function setRateLimitHeaders(res, limit, remaining, resetAt) {
  const resetSeconds = Math.max(Math.ceil(resetAt.getTime() / 1000), 0);
  res.setHeader("RateLimit-Limit", String(limit));
  res.setHeader("RateLimit-Remaining", String(Math.max(remaining, 0)));
  res.setHeader("RateLimit-Reset", String(resetSeconds));
}

function cleanupExpiredMemoryBuckets(now = Date.now()) {
  for (const [key, bucket] of memoryBuckets.entries()) {
    if (bucket.resetAt.getTime() <= now) {
      memoryBuckets.delete(key);
    }
  }
}

function ensureMemoryCleanup(windowMs) {
  if (memoryCleanupInterval) {
    return;
  }

  memoryCleanupInterval = globalThis.setInterval(() => {
    cleanupExpiredMemoryBuckets();
  }, Math.max(windowMs, 60_000));

  if (typeof memoryCleanupInterval.unref === "function") {
    memoryCleanupInterval.unref();
  }
}

function applyMemoryRateLimit(req, res, next, { windowMs, max, message }) {
  const handler = buildRateLimitHandler(message);
  const key = getRateLimitKey(req);
  const now = Date.now();
  const existingBucket = memoryBuckets.get(key);
  const bucket =
    existingBucket && existingBucket.resetAt.getTime() > now
      ? existingBucket
      : { count: 0, resetAt: new Date(now + windowMs) };

  bucket.count += 1;
  memoryBuckets.set(key, bucket);

  const remaining = max - bucket.count;
  setRateLimitHeaders(res, max, remaining, bucket.resetAt);

  if (bucket.count > max) {
    return handler(req, res);
  }

  return next();
}

async function applyMongoRateLimit(req, res, next, { windowMs, max, message }) {
  const handler = buildRateLimitHandler(message);
  const key = getRateLimitKey(req);
  const now = new Date();
  const resetAt = new Date(now.getTime() + windowMs);

  let bucket = await RateLimitBucket.findOneAndUpdate(
    { key, resetAt: { $gt: now } },
    { $inc: { count: 1 } },
    { new: true }
  );

  if (!bucket) {
    bucket = await RateLimitBucket.findOneAndUpdate(
      { key },
      { $set: { count: 1, resetAt } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }

  const remaining = max - bucket.count;
  setRateLimitHeaders(res, max, remaining, bucket.resetAt);

  if (bucket.count > max) {
    return handler(req, res);
  }

  return next();
}

export function createMongoRateLimiter({ windowMs, max, message, enabled = true }) {
  ensureMemoryCleanup(windowMs);

  return async function mongoRateLimiter(req, res, next) {
    if (!enabled) {
      return next();
    }

    if (mongoose.connection.readyState === 1) {
      try {
        return await applyMongoRateLimit(req, res, next, { windowMs, max, message });
      } catch {
        return applyMemoryRateLimit(req, res, next, { windowMs, max, message });
      }
    }

    return applyMemoryRateLimit(req, res, next, { windowMs, max, message });
  };
}

export const apiLimiter = createMongoRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "Too many requests, please try again later."
});
