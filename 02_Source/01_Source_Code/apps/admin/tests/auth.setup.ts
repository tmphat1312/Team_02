import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(
  import.meta.dirname,
  '../playwright/.auth/user.json'
);

const EMAIL = process.env.TEST_EMAIL ?? 'host@mail.com';
const PASSWORD = process.env.TEST_PASSWORD ?? '';

setup('authenticate', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  // Fill in the email and password fields
  await page.fill('input[name="email"]', EMAIL);
  await page.fill('input[name="password"]', PASSWORD);

  await page.click('button[type="submit"]');

  await page.waitForLoadState('networkidle');
  expect(page.url()).toContain('/amenities');

  await page.context().storageState({ path: authFile });
});
