import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import request from "supertest";
import { createMongoRateLimiter } from "../src/middlewares/rate-limit.middleware.js";

test("rate limiter falls back to in-memory enforcement when db is unavailable", async () => {
  const app = express();
  app.use((req, res, next) => {
    const requestId = req.get("x-request-id") || "test-request";
    req.requestId = requestId;
    res.setHeader("x-request-id", requestId);
    next();
  });
  app.use(
    createMongoRateLimiter({
      windowMs: 60 * 1000,
      max: 1,
      message: "Too many requests."
    })
  );
  app.get("/ping", (_req, res) => res.json({ ok: true }));

  const first = await request(app).get("/ping").set("x-request-id", "fallback-1");
  assert.equal(first.status, 200);
  assert.equal(first.headers["ratelimit-limit"], "1");
  assert.equal(first.headers["ratelimit-remaining"], "0");

  const second = await request(app).get("/ping").set("x-request-id", "fallback-2");
  assert.equal(second.status, 429);
  assert.equal(second.body.message, "Too many requests.");
  assert.equal(second.body.requestId, "fallback-2");
});
