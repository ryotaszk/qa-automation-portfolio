import { test, expect } from '@playwright/test';

// ログイン画面が開き、Loginボタンが表示されること
test('login page shows login button', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(
    page.getByRole('button', { name: 'Login' })
  ).toBeVisible();
});

// 正常系：正しいユーザー名とパスワードでログインでき、商品一覧へ遷移すること
test('can log in with standard user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory/);
});

// 異常系：パスワードが違うとエラーメッセージが表示されること
test('shows error with wrong password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(
    page.getByText('Username and password do not match')
  ).toBeVisible();
});

// ログイン後、商品をカートに入れるとバッジが1になること
test('can add item to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

// ログインから購入完了までの一連の流れが通ること
test('can complete checkout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
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
