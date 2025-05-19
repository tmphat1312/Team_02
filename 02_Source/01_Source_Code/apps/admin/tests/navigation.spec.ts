import { test } from '@playwright/test';

test('should navigate to /amenities page', async ({ page }) => {
  await page.goto('/');

  // Click on the "Amenities" link
  await page.click('a[href="/amenities"]');

  // Assert that the URL is correct
  await page.waitForURL('/amenities');
});

test('should navigate to /categories page', async ({ page }) => {
  await page.goto('/');

  // Click on the "Categories" link
  await page.click('a[href="/categories"]');

  // Assert that the URL is correct
  await page.waitForURL('/categories');
});

test('should navigate to /common-rules page', async ({ page }) => {
  await page.goto('/');

  // Click on the "Common Rules" link
  await page.click('a[href="/common-rules"]');

  // Assert that the URL is correct
  await page.waitForURL('/common-rules');
});
