import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const path of ['/', '/demo', '/privacy', '/terms', '/missing-page']) {
  test(`page ${path} has one main heading and no serious accessibility errors`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter(result => ['serious', 'critical'].includes(result.impact || ''))).toEqual([]);
  });
}

test('mobile workspace fits a 390px screen without page overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('history navigation restores routes and focuses the page heading', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Privacy', exact: true }).first().click();
  await expect(page).toHaveTitle('Privacy — Batch Cart');
  await page.goBack();
  await expect(page).toHaveTitle(/Batch Cart — combine recipes/);
  await expect(page.locator('h1')).toBeFocused();
});

test('home and demo load without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  await page.goto('/demo');
  expect(errors).toEqual([]);
});

test('the skip link reaches the main content by keyboard', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('a returned Plus license is stored, verified, and removed from the address', async ({ page }) => {
  await page.route('https://api.sociobot.in/api/v1/products/batch-cart/verify?license=test-token', route => route.fulfill({
    contentType: 'application/json',
    body: JSON.stringify({ valid: true, reason: 'ok', expires_at: null }),
  }));
  await page.goto('/?license=test-token');
  await expect(page).toHaveURL('http://127.0.0.1:4173/');
  await expect(page.getByText('Plus is active on this device.')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('sb_license:batch-cart'))).toBe('test-token');
});
