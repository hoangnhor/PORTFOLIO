import test from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import request from "supertest";

process.env.ADMIN_TOKEN = "test-admin-token";

const { default: app } = await import("../src/app.js");

test("GET /api/health returns success payload", async () => {
  const response = await request(app).get("/api/health");

  assert.equal(response.status, 200);
  assert.equal(typeof response.headers["x-request-id"], "string");
  assert.notEqual(response.headers["x-request-id"].trim(), "");
  assert.equal(response.body.status, "ok");
  assert.ok(["connected", "disconnected"].includes(response.body.dbStatus));
  assert.equal(typeof response.body.time, "string");
});

test("GET /api/ready returns not_ready when db is unavailable", async () => {
  const response = await request(app).get("/api/ready");
  assert.equal(response.status, 503);
  assert.equal(response.body.status, "not_ready");
  assert.equal(response.body.dbStatus, "disconnected");
  assert.equal(typeof response.body.requestId, "string");
});

test("GET /api/portfolio returns safe response when db is unavailable", async () => {
  mongoose.set("bufferTimeoutMS", 1);
  const customRequestId = "test-request-id-portfolio";
  const response = await request(app).get("/api/portfolio").set("x-request-id", customRequestId);

  assert.ok(response.status >= 400);
  assert.equal(response.headers["x-request-id"], customRequestId);
  assert.equal(typeof response.body?.message, "string");
  assert.notEqual(response.body.message.trim(), "");
  assert.equal(response.body.requestId, customRequestId);
});

test("GET /api/portfolio/meta returns safe response when db is unavailable", async () => {
  mongoose.set("bufferTimeoutMS", 1);
  const customRequestId = "test-request-id-portfolio-meta";
  const response = await request(app).get("/api/portfolio/meta").set("x-request-id", customRequestId);

  assert.ok(response.status >= 400);
  assert.equal(response.headers["x-request-id"], customRequestId);
  assert.equal(typeof response.body?.message, "string");
  assert.notEqual(response.body.message.trim(), "");
  assert.equal(response.body.requestId, customRequestId);
});

test("PUT /api/portfolio rejects missing or invalid admin token", async () => {
  const payload = { headline: "Test headline" };

  const missingTokenResponse = await request(app).put("/api/portfolio").send(payload);
  assert.equal(missingTokenResponse.status, 401);
  assert.equal(missingTokenResponse.body.message, "Unauthorized");
  assert.equal(typeof missingTokenResponse.body.requestId, "string");
  assert.notEqual(missingTokenResponse.body.requestId.trim(), "");

  const customRequestId = "test-request-id-auth";
  const invalidTokenResponse = await request(app)
    .put("/api/portfolio")
    .set("x-admin-token", "invalid-token")
    .set("x-request-id", customRequestId)
    .send(payload);
  assert.equal(invalidTokenResponse.status, 401);
  assert.equal(invalidTokenResponse.body.message, "Unauthorized");
  assert.equal(invalidTokenResponse.headers["x-request-id"], customRequestId);
  assert.equal(invalidTokenResponse.body.requestId, customRequestId);
});
