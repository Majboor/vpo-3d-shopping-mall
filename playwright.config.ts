import { defineConfig, devices } from "@playwright/test";

// End-to-end smoke tests. Playwright boots the Vite dev server itself (see
// `webServer`) and drives a headless Chromium against it. The port is
// overridable via PORT so CI and local runs can avoid collisions.
const PORT = Number(process.env.PORT ?? 8080);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `npm run dev -- --port ${PORT} --host 127.0.0.1`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
