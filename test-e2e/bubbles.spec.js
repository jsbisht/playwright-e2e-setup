const { test, expect } = require("@playwright/test");
const { describe } = test;

const TEST_PAGE_URL = "http://localhost:3000";

describe("on the index page", async () => {
  test("the header items", async ({ page }) => {
    await page.goto(TEST_PAGE_URL);
    await expect(page.locator(".link.logo")).toHaveText("Bubbles");
    await expect(page.locator(".link.account")).toHaveText("Account");
    await expect(page.locator(".link.login")).toHaveText("Login");
  });
  test("the page content", async ({ page }) => {
    await expect(page.locator("h2")).toHaveText("Welcome to Bubbles City");
  });
});

describe("on the login page", async () => {
  test("the header items", async ({ page }) => {
    await page.goto(`${TEST_PAGE_URL}/login`);
    await expect(page.locator(".link.logo")).toHaveText("Bubbles");
    await expect(page.locator(".link.account")).toHaveText("Account");
    await expect(page.locator(".link.login")).toHaveText("Login");
  });
  test("the page content", async ({ page }) => {
    await page.goto(`${TEST_PAGE_URL}/login`);
    await expect(page.locator("button.google-login")).toHaveText(
      "Sign in with Google"
    );
  });
});
