import { expect, test } from "@playwright/test";

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
  await expect(page.getByText("Đang tải dữ liệu kỹ năng, dự án, kinh nghiệm...")).toBeVisible();
  await expect(page.getByText("From API")).toBeVisible();
});

test("shows fallback and retry recovers data", async ({ page }) => {
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
  await expect(page.getByText("Không tải được dữ liệu dự án")).toBeVisible();
  await expect(page.getByText("Đang hiển thị dữ liệu local fallback.")).toBeVisible();
  await expect(page.getByText("CMMS – Asset & Maintenance Management System")).toBeVisible();

  failPortfolio = false;
  await page.getByRole("button", { name: "Thử lại" }).click();
  await expect(page.getByText("Recovered Project")).toBeVisible();
});
