import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Portfolio from "../src/models/portfolio.model.js";
import { defaultPortfolio } from "../src/utils/defaultPortfolio.js";

const { default: app } = await import("../src/app.js");
const { connectDatabase, disconnectDatabase } = await import("../src/config/database.js");
const { env } = await import("../src/config/env.js");

let mongoServer;
const integrationEnabled = String(process.env.ENABLE_INTEGRATION_MONGO || "").toLowerCase() === "true";

test.before(async () => {
  if (!integrationEnabled) {
    return;
  }
  mongoServer = await MongoMemoryServer.create();
  env.mongoUri = mongoServer.getUri();
  await connectDatabase();
});

test.after(async () => {
  if (!integrationEnabled) {
    return;
  }
  await disconnectDatabase();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

test("GET /api/portfolio returns persisted data", async (t) => {
  if (!integrationEnabled) {
    t.skip("set ENABLE_INTEGRATION_MONGO=true to run");
    return;
  }
  await Portfolio.deleteMany({});

  const payload = {
    key: "main",
    fullName: "Integration User",
    headline: "Fullstack Developer",
    intro: "Portfolio intro",
    email: "integration@example.com",
    education: [
      {
        school: "STU",
        period: "2021-2026",
        details: ["Computer Science"]
      }
    ],
    projects: [
      {
        title: "Project A",
        summary: "Summary",
        links: [{ label: "Demo", url: "https://example.com" }]
      }
    ],
    experiences: [{ company: "ABC", role: "Intern", period: "2026", description: "Worked on APIs", details: [] }]
  };

  await Portfolio.create(payload);

  const getResponse = await request(app).get("/api/portfolio");
  assert.equal(getResponse.status, 200);
  assert.equal(getResponse.body.fullName, payload.fullName);
  assert.equal(getResponse.body.email, payload.email);
  assert.deepEqual(getResponse.body.education?.[0]?.details, ["Computer Science"]);
});

test("GET /api/portfolio falls back to default portfolio when collection is empty", async (t) => {
  if (!integrationEnabled) {
    t.skip("set ENABLE_INTEGRATION_MONGO=true to run");
    return;
  }
  await Portfolio.deleteMany({});

  const response = await request(app).get("/api/portfolio").set("x-request-id", "integration-default");

  assert.equal(response.status, 200);
  assert.equal(response.body.fullName, defaultPortfolio.fullName);
  assert.equal(response.body.headline, defaultPortfolio.headline);
  assert.equal(response.body.email, defaultPortfolio.email);
});

test("GET /api/ready returns ready when mongo connected", async (t) => {
  if (!integrationEnabled) {
    t.skip("set ENABLE_INTEGRATION_MONGO=true to run");
    return;
  }
  assert.equal(mongoose.connection.readyState, 1);
  const response = await request(app).get("/api/ready");

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ready");
  assert.equal(response.body.dbStatus, "connected");
});
