import { expect, test } from '@playwright/test';

test('@claim:scaled-aggregation scales servings and combines matching ingredients', async ({ page }) => {
  await page.goto('/demo');
  const row = page.locator('.cart-row').filter({ has: page.locator('input[value="cherry tomatoes"]') }).first();
  await expect(row.getByLabel('Quantity for cherry tomatoes')).toHaveValue('1.2');
  await expect(row.getByLabel('Unit for cherry tomatoes')).toHaveValue('kg');
});

test('rejects a fraction with a zero denominator and explains how to recover', async ({ page }) => {
  await page.goto('/demo');
  const ingredients = page.locator('[data-recipe]').first().getByLabel(/Ingredients/);
  await ingredients.fill('1/0 g salt');
  await ingredients.press('Tab');
  await expect(page.getByRole('alert')).toContainText('Use a quantity greater than zero.');
  await expect(page.getByLabel('Quantity for salt')).toHaveCount(0);
  await ingredients.fill('1 g salt');
  await ingredients.press('Tab');
  await expect(page.getByRole('alert')).toHaveCount(0);
  await expect(page.getByLabel('Quantity for salt')).toHaveValue('1.5');
});

test('@claim:uncertain-conversions keeps converted source units visible for review', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('[data-recipe]').nth(0).getByLabel(/Ingredients/).fill('1 kg cherry tomatoes');
  await page.locator('[data-recipe]').nth(0).getByLabel(/Ingredients/).press('Tab');
  await page.locator('[data-recipe]').nth(1).getByLabel(/Ingredients/).fill('500 g cherry tomatoes');
  await page.locator('[data-recipe]').nth(1).getByLabel(/Ingredients/).press('Tab');
  const row = page.locator('.cart-row').filter({ has: page.getByLabel('Ingredient name').and(page.locator('[value="cherry tomatoes"]')) }).first();
  await expect(row.getByText('Converted units — check')).toBeVisible();
  await row.getByText('Converted units — check').click();
  await expect(row).toContainText('Lemony tomato pasta: 1.5 kg cherry tomatoes');
  await expect(row).toContainText('Herb market salad: 750 g cherry tomatoes');
  await page.locator('[data-recipe]').nth(1).getByLabel(/Ingredients/).fill('1 bunch parsley');
  await page.locator('[data-recipe]').nth(1).getByLabel(/Ingredients/).press('Tab');
  const incompatibleRows = page.locator('.cart-row').filter({ has: page.locator('input[value="parsley"]') });
  await expect(incompatibleRows).toHaveCount(2);
  await expect(incompatibleRows.getByText('Converted units — check')).toHaveCount(2);
  await incompatibleRows.getByText('Converted units — check').first().click();
  await expect(incompatibleRows.first()).toContainText('These units measure different things, so they stay separate.');
});

test('@claim:fixed-measures uses the published cup and tablespoon measures', async ({ page }) => {
  await page.goto('/demo');
  const first = page.locator('[data-recipe]').first();
  await first.getByLabel('Recipe serves').fill('1');
  await first.getByLabel('Recipe serves').press('Tab');
  await first.getByLabel('Cook for').fill('1');
  await first.getByLabel('Cook for').press('Tab');
  await first.getByLabel(/Ingredients/).fill('1 cup water\n1 tbsp water');
  await first.getByLabel(/Ingredients/).press('Tab');
  const row = page.locator('.cart-row').filter({ has: page.locator('input[value="water"]') }).first();
  await expect(row.getByLabel('Quantity for water')).toHaveValue('1.06');
  await expect(row.getByLabel('Unit for water')).toHaveValue('cup');
});

test('@claim:pantry-exclusion removes checked items from the shopping list', async ({ page }) => {
  await page.goto('/demo');
  const checkbox = page.getByLabel(/Mark cherry tomatoes as already in the pantry/).first();
  await checkbox.check();
  await expect(page.locator('.pantry-group')).toContainText('In the pantry (1)');
  await page.reload();
  await expect(page.locator('.pantry-group')).toContainText('In the pantry (1)');
});

test('@claim:data-export downloads a reusable JSON copy', async ({ page }) => {
  await page.goto('/demo');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export data' }).click();
  const download = await downloadPromise;
  const stream = await download.createReadStream();
  let body = '';
  for await (const chunk of stream) body += chunk.toString();
  const data = JSON.parse(body);
  expect(data.recipes).toHaveLength(3);
  expect(data.version).toBe(1);
});

test('@claim:data-import imports a Batch Cart JSON export', async ({ page }) => {
  await page.goto('/demo');
  await page.getByLabel('Import data').setInputFiles({
    name: 'batch-cart-data.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({
      version: 1,
      recipes: [{ id: 'imported', name: 'Sunday roast', baseServings: 4, targetServings: 8, ingredients: '2 kg potatoes' }],
      pantry: [],
      overrides: {},
      snapshots: [],
    })),
  });
  await expect(page.locator('input[value="Sunday roast"]')).toBeVisible();
  await expect(page.getByLabel('Quantity for potato')).toHaveValue('4');
  await expect(page.getByLabel('Unit for potato')).toHaveValue('kg');
});

test('@claim:list-sharing shares the calculated shopping list', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: async (payload: unknown) => { (window as unknown as { shared: unknown }).shared = payload; } });
  });
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Share list' }).click();
  await expect.poll(() => page.evaluate(() => (window as unknown as { shared?: { text?: string } }).shared?.text)).toContain('cherry tomatoes');
});

test('@claim:list-printing opens a printable shopping list', async ({ page }) => {
  await page.addInitScript(() => { window.print = () => { (window as unknown as { printed: boolean }).printed = true; }; });
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Print list' }).click();
  await expect.poll(() => page.evaluate(() => (window as unknown as { printed?: boolean }).printed)).toBe(true);
});

test('@claim:demo-isolation keeps sample changes away from real data', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('[data-recipe]').first().getByLabel('Recipe name').fill('Demo only recipe');
  await page.locator('[data-recipe]').first().getByLabel('Recipe name').press('Tab');
  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page.getByText('Your recipes will stack here')).toBeVisible();
  await expect(page.locator('input[value="Demo only recipe"]')).toHaveCount(0);
});

test('@claim:demo-deletion deletes the demo database when leaving the sample cart', async ({ page }) => {
  await page.goto('/demo');
  await expect.poll(() => page.evaluate(async () => (await indexedDB.databases()).some(database => database.name === 'demo:batch-cart'))).toBe(true);
  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect.poll(() => page.evaluate(async () => (await indexedDB.databases()).some(database => database.name === 'demo:batch-cart'))).toBe(false);
});

test('@claim:demo-seed-reset opens three recipes and restores the original sample', async ({ page }) => {
  await page.goto('/?demo=1');
  await expect(page.locator('[data-recipe]')).toHaveCount(3);
  await expect.poll(() => page.getByLabel('Recipe name').evaluateAll(inputs => inputs.map(input => (input as HTMLInputElement).value))).toEqual(['Lemony tomato pasta', 'Herb market salad', 'Garlic bread']);
  await expect(page.locator('.cart-row')).toHaveCount(12);
  const firstName = page.getByLabel('Recipe name').first();
  await firstName.fill('Changed sample');
  await firstName.press('Tab');
  await expect(page.locator('input[value="Changed sample"]')).toBeVisible();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect.poll(() => page.getByLabel('Recipe name').evaluateAll(inputs => inputs.map(input => (input as HTMLInputElement).value))).toEqual(['Lemony tomato pasta', 'Herb market salad', 'Garlic bread']);
  await expect(page.locator('.cart-row')).toHaveCount(12);
});

test('@claim:editable-totals saves edited shopping-list totals and exports them', async ({ page }) => {
  await page.goto('/demo');
  const row = page.locator('.cart-row').filter({ has: page.locator('input[value="cherry tomatoes"]') }).first();
  await row.getByLabel('Quantity for cherry tomatoes').fill('2.25');
  await row.getByLabel('Quantity for cherry tomatoes').press('Tab');
  await row.getByLabel('Unit for cherry tomatoes').fill('kg');
  await row.getByLabel('Unit for cherry tomatoes').press('Tab');
  await row.getByLabel('Ingredient name').fill('market tomatoes');
  await row.getByLabel('Ingredient name').press('Tab');
  await page.reload();
  const savedRow = page.locator('.cart-row').filter({ has: page.locator('input[value="market tomatoes"]') });
  await expect(savedRow.getByLabel('Quantity for market tomatoes')).toHaveValue('2.25');
  await expect(savedRow.getByLabel('Unit for market tomatoes')).toHaveValue('kg');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export data' }).click();
  const stream = await (await downloadPromise).createReadStream();
  let body = '';
  for await (const chunk of stream) body += chunk.toString();
  expect(Object.values(JSON.parse(body).overrides)).toContainEqual({ name: 'market tomatoes', quantity: 2.25, unit: 'kg' });
});

test('@claim:local-privacy sends no recipe data to another origin', async ({ page }) => {
  await page.goto('/demo');
  const appOrigin = new URL(page.url()).origin;
  const outsideRequests: string[] = [];
  page.on('request', request => {
    if (new URL(request.url()).origin !== appOrigin) outsideRequests.push(request.url());
  });
  await page.locator('[data-recipe]').first().getByLabel('Cook for').fill('10');
  await page.locator('[data-recipe]').first().getByLabel('Cook for').press('Tab');
  await expect(page.getByLabel('Quantity for cherry tomatoes').first()).not.toHaveValue('1.2');
  expect(outsideRequests).toEqual([]);
});

test('@claim:private-runtime loads no analytics, trackers, third-party scripts, or CDN fonts', async ({ page }) => {
  const appOrigin = new URL(process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4173').origin;
  const outsideRequests: string[] = [];
  page.on('request', request => {
    if (new URL(request.url()).origin !== appOrigin) outsideRequests.push(request.url());
  });
  await page.goto('/');
  expect(outsideRequests).toEqual([]);
});

test('@claim:license-verification-daily checks a stored license no more than once in one day', async ({ page }) => {
  let checks = 0;
  await page.clock.install({ time: new Date('2026-08-28T12:00:00Z') });
  await page.addInitScript(() => {
    if (!localStorage.getItem('sb_license:batch-cart')) {
      localStorage.setItem('sb_license:batch-cart', 'daily-token');
      localStorage.setItem('sb_license_checked:batch-cart', '0');
    }
  });
  await page.route('https://api.sociobot.in/api/v1/products/batch-cart/verify?license=daily-token', route => {
    checks += 1;
    return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ valid: true }) });
  });
  await page.goto('/');
  await expect.poll(() => checks).toBe(1);
  await page.reload();
  await page.waitForTimeout(100);
  expect(checks).toBe(1);
});

test('@claim:license-token-only sends only the pasted license token to the billing endpoint', async ({ page }) => {
  let requestUrl = '';
  let requestBody: string | null = 'not checked';
  await page.route('https://api.sociobot.in/api/v1/products/batch-cart/verify?license=pasted-token', route => {
    requestUrl = route.request().url();
    requestBody = route.request().postData();
    return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ valid: false }) });
  });
  await page.goto('/');
  await page.getByText('Have a license?').click();
  await page.getByLabel('License token').fill('pasted-token');
  await page.getByRole('button', { name: 'Restore purchase' }).click();
  await expect(page.locator('#license-status')).toHaveText('This license is not active. Check the token and try again.');
  expect(requestUrl).toBe('https://api.sociobot.in/api/v1/products/batch-cart/verify?license=pasted-token');
  expect(requestBody).toBeNull();
});

test('@claim:license-revocation removes Plus while preserving the free cart', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('sb_license_verdict:batch-cart', 'valid'));
  await page.route('https://api.sociobot.in/api/v1/products/batch-cart/verify?license=revoked-token', route => route.fulfill({
    contentType: 'application/json', body: JSON.stringify({ valid: false, reason: 'revoked' }),
  }));
  await page.goto('/?demo=1&license=revoked-token');
  await expect(page.getByRole('button', { name: 'Save plan' })).toHaveCount(0);
  await expect(page.locator('input[value="Lemony tomato pasta"]')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Print list' })).toBeEnabled();
  expect(await page.evaluate(() => localStorage.getItem('sb_license_verdict:batch-cart'))).toBe('invalid');
});

test('@claim:no-recipe-scraping treats recipe links as local text and never fetches them', async ({ page }) => {
  await page.goto('/demo');
  const appOrigin = new URL(page.url()).origin;
  const outsideRequests: string[] = [];
  page.on('request', request => {
    if (new URL(request.url()).origin !== appOrigin) outsideRequests.push(request.url());
  });
  const ingredients = page.locator('[data-recipe]').first().getByLabel(/Ingredients/);
  await ingredients.fill('https://example.com/lemon-pasta');
  await ingredients.press('Tab');
  await expect(page.getByRole('alert')).toContainText('Start this line with a quantity');
  expect(outsideRequests).toEqual([]);
});

test('@claim:offline-reload works offline after the first visit', async ({ page, context }) => {
  await page.goto('/demo');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Plan dinner with sample recipes');
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Plan dinner with sample recipes');
  await expect(page.locator('input[value="Lemony tomato pasta"]')).toBeVisible();
});

test('@claim:plus-snapshots saves and restores a named event plan', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('sb_license_verdict:batch-cart', 'valid'));
  await page.goto('/demo');
  await page.getByLabel('Plan name').fill('Friday supper');
  await page.getByRole('button', { name: 'Save plan' }).click();
  await expect(page.getByText('Friday supper')).toBeVisible();
  await page.locator('[data-recipe]').first().getByLabel('Recipe name').fill('Changed name');
  await page.locator('[data-recipe]').first().getByLabel('Recipe name').press('Tab');
  await page.getByRole('button', { name: 'Restore' }).click();
  await expect(page.locator('input[value="Lemony tomato pasta"]')).toBeVisible();
});

test('@claim:free-core keeps the full active cart free without a license', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-08-28T12:00:00Z') });
  await page.goto('/demo');
  expect(await page.evaluate(() => localStorage.getItem('sb_license:batch-cart'))).toBeNull();
  await expect(page.getByRole('button', { name: 'Print list' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Share list' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Export data' })).toBeEnabled();
  await expect(page.getByLabel('Cook for').first()).toBeEditable();
  await page.locator('[data-recipe]').first().getByLabel('Cook for').fill('12');
  await page.locator('[data-recipe]').first().getByLabel('Cook for').press('Tab');
  await page.clock.setFixedTime(new Date('2036-08-28T12:00:00Z'));
  await page.reload();
  await expect(page.locator('[data-recipe]').first().getByLabel('Cook for')).toHaveValue('12');
  await page.getByLabel(/Mark cherry tomatoes as already in the pantry/).first().check();
  await expect(page.locator('.pantry-group')).toContainText('In the pantry (1)');
});

test('@claim:local-data-deletion removes both carts, saved plans, and license data', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('sb_license_verdict:batch-cart', 'valid'));
  await page.goto('/demo');
  await page.getByLabel('Plan name').fill('Friday supper');
  await page.getByRole('button', { name: 'Save plan' }).click();
  await expect(page.getByText('Friday supper')).toBeVisible();
  await page.evaluate(async () => {
    localStorage.setItem('sb_license:batch-cart', 'delete-me');
    localStorage.setItem('sb_license_checked:batch-cart', '123');
    localStorage.setItem('sb_license_verdict:batch-cart', 'valid');
  });
  await page.goto('/privacy');
  await expect.poll(() => page.evaluate(async () => (await indexedDB.databases()).map(database => database.name).sort())).toEqual(['batch-cart', 'demo:batch-cart']);
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Delete local data' }).click();
  await expect(page.locator('.live-region')).toHaveText('Local data deleted.');
  await expect.poll(() => page.evaluate(async () => (await indexedDB.databases()).filter(database => database.name?.includes('batch-cart')).map(database => database.name))).toEqual([]);
  expect(await page.evaluate(() => Object.keys(localStorage).filter(key => key.startsWith('sb_license')))).toEqual([]);
});

test('@claim:hosted-checkout shows the one-time price and reaches Sociobot hosted checkout', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.getByText('US$12', { exact: true })).toBeVisible();
  const buy = page.getByRole('link', { name: 'Buy Batch Cart Plus' });
  await expect(buy).toHaveAttribute('href', 'https://api.sociobot.in/api/v1/products/batch-cart/checkout');
  const response = await request.get(await buy.getAttribute('href') as string, { maxRedirects: 0 });
  expect(response.status()).toBe(303);
  expect(response.headers().location).toMatch(/^https:\/\/checkout\.dodopayments\.com\/session\//);
});
