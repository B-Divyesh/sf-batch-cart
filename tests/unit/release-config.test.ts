import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('static release caching', () => {
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
    expect(page).toContain('<main id="main">');
    expect(page).toContain('<h1>That page is not in the cart</h1>');
    expect(page).toContain('<link rel="canonical" href="https://batch-cart.sociobot.in/404">');
    expect(page).toContain('<meta property="og:title" content="Page not found — Batch Cart">');
    expect(page).toContain('<meta name="twitter:title" content="Page not found — Batch Cart">');
    expect(page).toContain('<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">');
  });
});
