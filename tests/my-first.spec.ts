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

test('can add a todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  await page.getByPlaceholder('What needs to be done?').fill('Playwrightを試す');
  await page.keyboard.press('Enter');
  await expect(page.getByText('Playwrightを試す')).toBeVisible();
});
