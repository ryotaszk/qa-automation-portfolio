import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';


// ログイン画面が開き、Loginボタンが表示されること
test('login page shows login button', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await expect(
    page.getByRole('button', { name: 'Login' })
  ).toBeVisible();
});

// 正常系：正しいユーザー名とパスワードでログインでき、商品一覧へ遷移すること
test('can log in with standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});

// 異常系：パスワードが違うとエラーメッセージが表示されること
test('shows error with wrong password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'wrong_password');
  await expect(
    page.getByText('Username and password do not match')
  ).toBeVisible();
});

// ログイン後、商品をカートに入れるとバッジが1になること
test('can add item to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

// ログインから購入完了までの一連の流れが通ること
test('can complete checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.locator('.shopping_cart_link').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByPlaceholder('First Name').fill('Taro');
  await page.getByPlaceholder('Last Name').fill('Suzuki');
  await page.getByPlaceholder('Zip/Postal Code').fill('100-0001');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});
