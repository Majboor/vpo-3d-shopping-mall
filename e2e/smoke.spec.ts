import { test, expect } from "@playwright/test";

// Smoke tests that exercise the SPA end-to-end against a real Vite dev server
// and a real (headless) browser. These cover the core navigation flows a
// visitor hits: landing page, client-side routing, and the 404 fallback.
//
// The landing / gallery routes stream heavy 3D + hero assets, so navigations
// wait for `domcontentloaded` (not `load`/`networkidle`, which never settle)
// and then assert on elements that are part of the initial React render.

test("home page loads with the VPO title and brand", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveTitle(/VPO/i);
  // The fixed nav brand link is part of the initial paint.
  await expect(page.getByRole("link", { name: "VPO." })).toBeVisible();
});

test("landing page renders without uncaught page errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/", { waitUntil: "domcontentloaded" });
  // Let the app hydrate and run its mount effects.
  await expect(page.getByRole("link", { name: "VPO." })).toBeVisible();
  await page.waitForTimeout(2000);
  expect(errors, `page errors:\n${errors.join("\n")}`).toEqual([]);
});

test("the business route renders its dedicated landing content", async ({ page }) => {
  await page.goto("/business", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/business$/);
  // VPOBusiness renders its own hero + the shared nav brand.
  await expect(page.getByRole("link", { name: "VPO." })).toBeVisible();
  await expect(page.getByText("VPO FOR BUSINESSES", { exact: false }).first()).toBeVisible();
});

test("client-side routing from the business nav link works", async ({ page }) => {
  // Start on a route without the landing frame-sequence loading overlay so the
  // nav is freely clickable, then follow the in-app link back to business.
  await page.goto("/case-studies", { waitUntil: "domcontentloaded" });
  const businessLink = page.getByRole("link", { name: "Business", exact: true }).first();
  await businessLink.click();
  await expect(page).toHaveURL(/\/business$/);
});

test("unknown routes render the 404 page", async ({ page }) => {
  await page.goto("/this-route-does-not-exist", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  await expect(page.getByRole("link", { name: /return to home/i })).toBeVisible();
});

test("the gallery editorial route loads the app shell", async ({ page }) => {
  const response = await page.goto("/gallery", { waitUntil: "domcontentloaded" });
  expect(response?.status()).toBeLessThan(400);
  // App shell renders the nav brand on every route.
  await expect(page.getByRole("link", { name: "VPO." })).toBeVisible();
});
