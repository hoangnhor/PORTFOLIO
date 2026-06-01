import { expect, test } from "@playwright/test";

const viewports = [
  { name: "mobile-375", width: 375, height: 667 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 }
];

for (const viewport of viewports) {
  test(`home responsive layout - ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator("#main-content")).toBeVisible();
    const hasHorizontalOverflow = await page.evaluate(() => {
      const html = document.documentElement;
      const body = document.body;
      return html.scrollWidth > html.clientWidth + 1 || body.scrollWidth > body.clientWidth + 1;
    });
    expect(hasHorizontalOverflow).toBeFalsy();
  });
}
