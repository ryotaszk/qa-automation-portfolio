import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  await expect(page).toHaveTitle(/TodoMVC/);
});

test('has heading', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  await expect(
    page.getByRole('heading', { name: 'todos' })
  ).toBeVisible();
});