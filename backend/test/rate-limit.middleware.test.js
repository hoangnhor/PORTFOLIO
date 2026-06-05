import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createMongoRateLimiter } from "../src/middlewares/rate-limit.middleware.js";
import { connectDatabase, disconnectDatabase } from "../src/config/database.js";
import { env } from "../src/config/env.js";

let mongoServer;

test.before(async () => {
  mongoServer = await MongoMemoryServer.create();
  env.mongoUri = mongoServer.getUri();
  await connectDatabase();
});

test.after(async () => {
  await disconnectDatabase();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

test("mongo-backed rate limiter blocks after max attempts", async () => {
  const app = express();
  app.set("trust proxy", false);
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

  const first = await request(app).get("/ping").set("x-request-id", "rate-limit-1");
  assert.equal(first.status, 200);
  assert.equal(first.headers["ratelimit-limit"], "1");
  assert.equal(first.headers["ratelimit-remaining"], "0");
  assert.equal(typeof first.headers["ratelimit-reset"], "string");

  const second = await request(app).get("/ping").set("x-request-id", "rate-limit-2");
  assert.equal(second.status, 429);
  assert.equal(second.body.message, "Too many requests.");
  assert.equal(second.body.requestId, "rate-limit-2");
});
