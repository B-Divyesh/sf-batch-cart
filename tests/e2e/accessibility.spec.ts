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

test('the direct sample URL shows two calculated shopping-list rows without scrolling on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?demo=1');
  await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reset demo' })).toBeVisible();
  const rows = page.locator('.cart-row');
  await expect(rows).toHaveCount(12);
  for (const row of await rows.evaluateAll(items => items.slice(0, 2).map(item => {
    const box = item.getBoundingClientRect();
    return { top: box.top, bottom: box.bottom };
  }))) {
    expect(row.top).toBeGreaterThanOrEqual(0);
    expect(row.bottom).toBeLessThanOrEqual(844);
  }
});

test('desktop demo keeps the calculated list beside the source recipes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/?demo=1');
  const cart = await page.locator('.cart-plane').boundingBox();
  const recipe = await page.locator('[data-recipe]').first().boundingBox();
  expect(cart).not.toBeNull();
  expect(recipe).not.toBeNull();
  expect(Math.abs((cart?.y || 0) - (recipe?.y || 0))).toBeLessThan(180);
});

test('invalid imports preserve the current cart and still load safely after reload', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/demo');
  await page.getByLabel('Import data').setInputFiles({
    name: 'bad-batch-cart.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({ version: 1, recipes: [null], pantry: [], overrides: {}, snapshots: [] })),
  });
  await expect(page.locator('.live-region')).toContainText('This file is not a Batch Cart export.');
  await expect(page.locator('input[value="Lemony tomato pasta"]')).toBeVisible();
  await page.reload();
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Plan dinner with sample recipes');
  await expect(page.locator('input[value="Lemony tomato pasta"]')).toBeVisible();
  expect(errors).toEqual([]);
});

test('mobile keyboard focus starts at the skip link, follows the visible cart, and exposes Import data', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeAttached();
  await expect(page.locator('main')).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  const importInput = page.getByLabel('Import data');
  const firstCartControl = page.locator('.cart-plane input').first();
  const firstRecipeControl = page.locator('[data-recipe]').first().getByLabel('Recipe name');
  const cartPrecedesRecipe = await page.evaluate(() => {
    const cart = document.querySelector('.cart-plane input');
    const recipe = document.querySelector('[data-recipe] input');
    return Boolean(cart && recipe && cart.compareDocumentPosition(recipe) & Node.DOCUMENT_POSITION_FOLLOWING);
  });
  expect(cartPrecedesRecipe).toBe(true);
  await firstCartControl.focus();
  await expect(firstCartControl).toBeFocused();
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => Boolean(document.activeElement?.closest('.cart-plane')))).toBe(true);
  await importInput.focus();
  await expect(importInput).toBeFocused();
  const focusStyle = await page.locator('.file-label').evaluate(label => {
    const style = getComputedStyle(label);
    return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
  });
  expect(focusStyle).toEqual({ outlineStyle: 'solid', outlineWidth: '3px' });
});

test('the first screen includes the action explanation and all three facts', async ({ page }) => {
  for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await expect(page.locator('.plain-facts li')).toHaveCount(3);
    const support = await page.locator('.after-action, .plain-facts li').evaluateAll(elements => elements.map(element => {
      const box = element.getBoundingClientRect();
      return { top: box.top, bottom: box.bottom };
    }));
    expect(support).toHaveLength(4);
    expect(support.every(box => box.top >= 0 && box.bottom <= viewport.height)).toBe(true);
  }
});

test('serving counts outside the stated range are rejected with a visible explanation', async ({ page }) => {
  await page.goto('/demo');
  const firstRecipe = page.locator('[data-recipe]').first();
  await firstRecipe.getByLabel('Cook for').fill('501');
  await firstRecipe.getByLabel('Cook for').press('Tab');
  await expect(page.getByRole('alert')).toContainText('Serving counts must be between 1 and 500.');
  await expect(page.getByLabel('Quantity for cherry tomatoes').first()).toHaveValue('1.2');
});

test('license restoration failures stay visible to sighted users', async ({ page }) => {
  await page.route('https://api.sociobot.in/api/v1/products/batch-cart/verify?license=bad-token', route => route.fulfill({
    contentType: 'application/json', body: JSON.stringify({ valid: false }),
  }));
  await page.goto('/');
  await page.getByText('Have a license?').click();
  await page.getByLabel('License token').fill('bad-token');
  await page.getByRole('button', { name: 'Restore purchase' }).click();
  await expect(page.locator('#license-status')).toHaveText('This license is not active. Check the token and try again.');
});

test('license network failures stay visible to sighted users', async ({ page }) => {
  await page.route('https://api.sociobot.in/api/v1/products/batch-cart/verify?license=offline-token', route => route.abort());
  await page.goto('/');
  await page.getByText('Have a license?').click();
  await page.getByLabel('License token').fill('offline-token');
  await page.getByRole('button', { name: 'Restore purchase' }).click();
  await expect(page.locator('#license-status')).toHaveText('The license could not be checked. Connect to the internet and try again.');
});

test('mobile wordmark and footer links meet the 44px touch target baseline', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const targets = [page.getByRole('link', { name: 'Batch Cart home' }), ...await page.locator('footer a').all()];
  for (const target of targets) {
    const box = await target.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
});

test('the demo Plus link opens the paid tier on the home page', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('link', { name: 'View Plus plans' }).click();
  await expect(page).toHaveURL(/\/#plus$/);
  await expect(page.getByRole('heading', { name: 'Save repeat plans with Plus' })).toBeVisible();
});

test('mobile first view loads the compact responsive hero image', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const imageResponse = page.waitForResponse(response => response.url().endsWith('/hero-glass-600.webp'));
  await page.goto('/');
  const response = await imageResponse;
  const hero = page.locator('.hero-art img');
  await expect(hero).toBeVisible();
  await expect.poll(() => hero.evaluate(image => (image as HTMLImageElement).currentSrc)).toMatch(/hero-glass-600\.webp$/);
  expect((await response.body()).byteLength).toBeLessThanOrEqual(30_000);
});

test('demo remains usable at 200 percent text size on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  await page.locator('html').evaluate(element => { element.style.fontSize = '200%'; });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Print list' })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('fractional serving counts are valid and recalculate the cart', async ({ page }) => {
  await page.goto('/demo');
  const recipe = page.locator('[data-recipe]').first();
  const baseServings = recipe.getByLabel('Recipe serves');
  const targetServings = recipe.getByLabel('Cook for');
  await expect(baseServings).toHaveAttribute('step', 'any');
  await expect(targetServings).toHaveAttribute('step', 'any');
  await targetServings.fill('2.5');
  expect(await targetServings.evaluate(input => (input as HTMLInputElement).validity.valid)).toBe(true);
  await targetServings.press('Tab');
  await expect(page.getByLabel('Quantity for cherry tomatoes').first()).toHaveValue('762.5');
});

test('history navigation restores routes and focuses the page heading', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Privacy', exact: true }).first().click();
  await expect(page).toHaveTitle('Privacy — Batch Cart');
  await page.goBack();
  await expect(page).toHaveTitle(/Batch Cart — combine recipes/);
  await expect(page.locator('h1')).toBeFocused();
});

test('each route updates its sharing metadata', async ({ page }) => {
  const routes = [
    ['/', 'Batch Cart — combine recipes into one shopping list', 'https://batch-cart.sociobot.in/'],
    ['/?demo=1', 'Demo — Batch Cart', 'https://batch-cart.sociobot.in/demo'],
    ['/privacy', 'Privacy — Batch Cart', 'https://batch-cart.sociobot.in/privacy'],
    ['/terms', 'Terms — Batch Cart', 'https://batch-cart.sociobot.in/terms'],
    ['/missing-page', 'Page not found — Batch Cart', 'https://batch-cart.sociobot.in/404'],
  ];
  for (const [path, title, canonical] of routes) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', title);
  }
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

test('@claim:returned-license-storage stores, verifies, and removes a returned Plus license', async ({ page }) => {
  await page.route('https://api.sociobot.in/api/v1/products/batch-cart/verify?license=test-token', route => route.fulfill({
    contentType: 'application/json',
    body: JSON.stringify({ valid: true, reason: 'ok', expires_at: null }),
  }));
  await page.goto('/?demo=1&license=test-token');
  await expect.poll(() => new URL(page.url()).search).toBe('?demo=1');
  expect(new URL(page.url()).pathname).toBe('/');
  await expect(page).toHaveTitle('Demo — Batch Cart');
  await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('sb_license:batch-cart'))).toBe('test-token');
});

test('an installed service-worker update is announced', async ({ page }) => {
  await page.addInitScript(() => {
    const worker = new EventTarget() as EventTarget & { state: string };
    worker.state = 'installing';
    const registration = new EventTarget() as EventTarget & { installing: EventTarget };
    registration.installing = worker;
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: {
        controller: {},
        register: async () => {
          setTimeout(() => {
            registration.dispatchEvent(new Event('updatefound'));
            worker.state = 'installed';
            worker.dispatchEvent(new Event('statechange'));
          });
          return registration;
        },
      },
    });
  });
  await page.goto('/');
  await expect(page.getByRole('status')).toHaveText('An update is ready. Reload to use it.');
});
