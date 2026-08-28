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
});
