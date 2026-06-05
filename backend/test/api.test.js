import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { defaultPortfolio } from "../src/utils/defaultPortfolio.js";

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
  const customRequestId = "test-request-id-portfolio";
  const response = await request(app).get("/api/portfolio").set("x-request-id", customRequestId);

  assert.equal(response.status, 200);
  assert.equal(response.headers["x-request-id"], customRequestId);
  assert.equal(response.body.fullName, defaultPortfolio.fullName);
  assert.equal(response.body.headline, defaultPortfolio.headline);
  assert.equal(response.body.email, defaultPortfolio.email);
  assert.equal(response.body.requestId, undefined);
});

test("GET /api/portfolio/meta returns safe response when db is unavailable", async () => {
  const customRequestId = "test-request-id-portfolio-meta";
  const response = await request(app).get("/api/portfolio/meta").set("x-request-id", customRequestId);

  assert.equal(response.status, 200);
  assert.equal(response.headers["x-request-id"], customRequestId);
  assert.equal(response.body.updatedAt, null);
  assert.equal(response.body.requestId, undefined);
});

test("PUT /api/portfolio is disabled", async () => {
  const customRequestId = "test-request-id-put-disabled";
  const response = await request(app)
    .put("/api/portfolio")
    .set("x-request-id", customRequestId)
    .send({ headline: "Test headline" });

  assert.equal(response.status, 404);
  assert.equal(response.body.message, "Route not found");
  assert.equal(response.headers["x-request-id"], customRequestId);
  assert.equal(response.body.requestId, customRequestId);
});
