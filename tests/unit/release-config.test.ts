import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('static release caching', () => {
  it('ships the keyboard shell before JavaScript starts', () => {
    const page = readFileSync('index.html', 'utf8');
    const skipLink = page.indexOf('<a class="skip-link" href="#main">');
    const main = page.indexOf('<main id="main"');
    const script = page.indexOf('<script type="module"');
    expect(skipLink).toBeGreaterThan(0);
    expect(main).toBeGreaterThan(skipLink);
    expect(script).toBeGreaterThan(main);
  });

  it('serves fingerprinted build assets with an immutable one-year policy', () => {
    const config = JSON.parse(readFileSync('public/staticwebapp.config.json', 'utf8')) as {
      routes: Array<{ route: string; headers?: Record<string, string> }>;
    };
    const assets = config.routes.find(route => route.route === '/assets/*');
    expect(assets?.headers?.['Cache-Control']).toBe('public, max-age=31536000, immutable');
  });

  it('returns the designed static not-found page with an HTTP 404 status', () => {
    const config = JSON.parse(readFileSync('public/staticwebapp.config.json', 'utf8')) as {
      routes: Array<{ route: string; rewrite?: string }>;
      navigationFallback?: unknown;
      responseOverrides?: Record<string, { rewrite?: string; statusCode?: number }>;
    };
    expect(config.navigationFallback).toBeUndefined();
    expect(config.routes.filter(route => ['/demo', '/privacy', '/terms'].includes(route.route)).every(route => route.rewrite === '/index.html')).toBe(true);
    expect(config.responseOverrides?.['404']).toEqual({ rewrite: '/404.html', statusCode: 404 });
    const page = readFileSync('public/404.html', 'utf8');
    expect(page).toContain('<main id="main" tabindex="-1">');
    expect(page).toContain('<h1>Page not found</h1>');
    expect(page).not.toContain('This pane slipped away');
    expect(page).not.toContain('That page is not in the cart');
    expect(page).toContain('<link rel="canonical" href="https://batch-cart.sociobot.in/404">');
    expect(page).toContain('<meta property="og:title" content="Page not found — Batch Cart">');
    expect(page).toContain('<meta name="twitter:title" content="Page not found — Batch Cart">');
    expect(page).toContain('<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">');
    expect(page).toContain('<nav aria-label="Main navigation">');
    expect(page).toContain('href="/?demo=1"');
    expect(page).toContain('href="/#workspace"');
    expect(page).toContain('Built by Param Factory');
    expect(page).toContain('v1.0.8 · Generated artwork');
  });

  it('maps each registered claim to exactly one tagged browser test', () => {
    const claims = JSON.parse(readFileSync('.factory/claims.json', 'utf8')) as Array<{ id: string; test: string }>;
    const browserTests = [readFileSync('tests/e2e/claims.spec.ts', 'utf8'), readFileSync('tests/e2e/accessibility.spec.ts', 'utf8')].join('\n');
    expect(new Set(claims.map(claim => claim.id)).size).toBe(claims.length);
    for (const claim of claims) {
      expect(claim.test).toBe(`npm run test:e2e -- --grep @claim:${claim.id}`);
      expect(browserTests.match(new RegExp(`test\\(['\"]@claim:${claim.id}(?:\\s|['\"])`, 'g'))).toHaveLength(1);
    }
  });
});
