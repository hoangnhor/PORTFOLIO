import test from "node:test";
import assert from "node:assert/strict";
import { validatePortfolioPayload } from "../src/validators/portfolio.validator.js";

function runValidator(body) {
  const req = { body };
  const res = {
    statusCode: 200,
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.payload = data;
      return this;
    }
  };
  let nextCalled = false;

  validatePortfolioPayload(req, res, () => {
    nextCalled = true;
  });

  return { nextCalled, statusCode: res.statusCode, payload: res.payload };
}

test("validator accepts valid payload shape", () => {
  const result = runValidator({
    fullName: "A",
    headline: "B",
    intro: "C",
    email: "a@b.com",
    resumeUrl: "Tran-Van-Hoang-Fresher-Fullstack-Developer-CV.pdf",
    socials: [{ label: "GitHub", url: "https://github.com/a" }],
    education: [{ school: "X", period: "2021-2027" }],
    skills: [{ category: "Frontend", items: ["React.js"] }],
    projects: [{ title: "P", summary: "S", links: [{ label: "Demo", url: "https://example.com" }] }],
    experiences: [{ company: "C", role: "R", period: "P", details: ["D"] }]
  });

  assert.equal(result.nextCalled, true);
});

test("validator rejects invalid socials url", () => {
  const result = runValidator({
    socials: [{ label: "GitHub", url: "github.com/a" }]
  });

  assert.equal(result.nextCalled, false);
  assert.equal(result.statusCode, 400);
  assert.match(result.payload.message, /valid http\/https URL/);
});

test("validator rejects unknown fields", () => {
  const result = runValidator({
    fullName: "A",
    unknownKey: "x"
  });

  assert.equal(result.nextCalled, false);
  assert.equal(result.statusCode, 400);
  assert.match(result.payload.message, /Unknown fields/);
});
