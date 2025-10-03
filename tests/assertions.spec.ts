import { test, expect } from "@playwright/test";

test("Login Page Assertions", async ({ page }) => {
  // Navigate to the login page
  await page.goto("https://the-internet.herokuapp.com/login");

  // 1. Auto-retrying assertions(default beaviour, will retry until timeout)
  await expect(page).toHaveTitle(/The Internet/);

  //   2. Non Auto-retrying assertions(will not retry, will fail immediately if not met)
  const headingText = await page.locator("h2").textContent();
  expect(headingText).toBe("Login Page");

  // 3. Negating matchers
  await expect(page.locator("#flash")).not.toBeVisible();

  // 4. Soft Assertions
  await expect.soft(page).toHaveURL(/login/);

  // 5. Last assertions
  await expect(page.getByRole("button", { name: "Login" })).toBeEnabled();
});

test("Multiple soft assertins with fianl hard assertions", async ({ page }) => {
  // Navigate to the login page
  await page.goto("https://the-internet.herokuapp.com/login");

  // Multiple soft Assertions
  await expect.soft(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await expect.soft(page).toHaveURL(/logins/);
  await expect.soft(page.locator("#flash")).not.toBeVisible();

  // Final hard assertion
  const errors = test.info().errors;
  expect(errors.length, `There were ${errors.length} soft assertion failures`).toBe(0);

});