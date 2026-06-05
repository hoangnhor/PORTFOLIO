import { expect, test } from "@playwright/test";

const PORTFOLIO_CACHE_KEY = "portfolio:full:v3";

test("shows loading then renders API data", async ({ page }) => {
  await page.route("**/api/portfolio/meta", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ updatedAt: new Date().toISOString() })
    });
  });
  await page.route("**/api/portfolio", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        fullName: "API User",
        headline: "Fullstack Developer",
        intro: "Hello",
        email: "api@example.com",
        location: "HCM",
        socials: [],
        education: [],
        skills: [{ category: "Frontend", items: ["React.js"] }],
        projects: [{ title: "From API", summary: "API data", stack: [], links: [], highlights: [] }],
        experiences: []
      })
    });
  });

  await page.goto("/");
  await expect(page.getByText("From API")).toBeVisible();
});

test("shows fallback and recover after reload", async ({ page }) => {
  let failPortfolio = true;

  await page.route("**/api/portfolio/meta", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ updatedAt: new Date().toISOString() })
    });
  });
  await page.route("**/api/portfolio", async (route) => {
    if (failPortfolio) {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "server error" })
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        fullName: "Recovered User",
        headline: "Recovered",
        intro: "Recovered intro",
        email: "ok@example.com",
        location: "HCM",
        socials: [],
        education: [],
        skills: [],
        projects: [{ title: "Recovered Project", summary: "ok", stack: [], links: [], highlights: [] }],
        experiences: []
      })
    });
  });

  await page.goto("/");
  await expect(page.getByText("CMMS – Asset & Maintenance Management System")).toBeVisible();

  failPortfolio = false;
  await page.reload();
  await expect(page.getByText("Recovered Project")).toBeVisible();
});

test("refreshes stale cached portfolio when server updatedAt changes", async ({ page }) => {
  await page.addInitScript(
    ({ cacheKey, snapshot }) => {
      window.localStorage.setItem(cacheKey, JSON.stringify(snapshot));
    },
    {
      cacheKey: PORTFOLIO_CACHE_KEY,
      snapshot: {
        fullName: "Cached User",
        headline: "Cached headline",
        intro: "Cached intro",
        email: "cached@example.com",
        location: "Cached location",
        updatedAt: "2025-01-01T00:00:00.000Z",
        socials: [],
        education: [],
        skills: [],
        projects: [{ title: "Cached Project", summary: "cached", stack: [], links: [], highlights: [] }],
        experiences: []
      }
    }
  );

  await page.route("**/api/portfolio/meta", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ updatedAt: "2026-01-01T00:00:00.000Z" })
    });
  });
  await page.route("**/api/portfolio", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        fullName: "Fresh User",
        headline: "Fresh headline",
        intro: "Fresh intro",
        email: "fresh@example.com",
        location: "Fresh location",
        socials: [],
        education: [],
        skills: [],
        projects: [{ title: "Fresh Project", summary: "fresh", stack: [], links: [], highlights: [] }],
        experiences: []
      })
    });
  });

  await page.goto("/");
  await expect(page.getByText("Fresh Project")).toBeVisible();
});
