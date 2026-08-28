# Batch Cart v1 handoff

Work order: `batch-cart-build-1`

Completed: 2026-08-28

Deploy type: static PWA

Build output: `dist/`

## What was built

- A finished browser-local multi-recipe shopping calculator.
- Recipe cards with original servings, target servings, and pasted ingredient lines.
- Deterministic parsing for fractions, decimals, common mass units, common volume units, and package/count units.
- Scaled aggregation with simple singular/plural matching.
- Original unit details under every total. Mixed compatible units show a check notice. Incompatible dimensions stay separate and show why.
- Editable shopping-list quantities, units, and ingredient names.
- Pantry exclusions that persist across reloads.
- Print, native share or clipboard fallback, JSON export, and JSON import.
- Isolated `/demo` mode with three realistic dinner recipes, reset, and start-real actions.
- IndexedDB namespaces `batch-cart` and `demo:batch-cart`.
- PWA manifest, install icons, versioned service worker, runtime cache, offline fallback, update notice, and offline status notice.
- Real History API routes for `/`, `/demo`, `/privacy`, `/terms`, and a styled 404 state.
- US$12 one-time Batch Cart Plus offer. It uses the Sociobot checkout, returned-token storage, daily license verification, paste-to-restore, cached offline verdict, and named saved plan snapshots.
- A product-specific luminous glass design with generated hero art, self-hosted fonts, responsive layout, print rules, focus states, and reduced-motion handling.
- Metadata, canonical URLs, social card, robots, sitemap, security headers, privacy, terms, MIT license, and product documentation.

## How to run

```sh
npm install
npm run dev
```

Demo: `http://localhost:5173/demo`

## How to verify

```sh
npm test
npm run build
```

Final results:

- Unit tests: 6 passed.
- Chromium tests: 20 passed.
- Every entry in `.factory/claims.json` has one tagged browser test.
- Axe: no serious or critical findings on home, demo, privacy, terms, or 404.
- 390 × 844 mobile overflow check: passed.
- Keyboard skip-link and SPA history/focus checks: passed.
- Console errors on home and demo: none.
- Offline claim: passed after first visit with Playwright `context.setOffline(true)`.
- `verify-url.sh`: title present, `lang=en`, one h1, main present, no missing image alt, no unlabeled buttons, no console errors. Local evidence is in `.factory/evidence/`.
- `npm audit`: 0 vulnerabilities.
- Build: `dist/index.html` exists. Total deploy directory is 524 KB.
- Initial app JS: 28.21 KB raw / 9.89 KB gzip.
- Initial CSS: 18.76 KB raw / 5.00 KB gzip.
- Hero WebP: 77.68 KB.
- Fonts used on the first view: about 71 KB WOFF2.

## Lighthouse mobile

Run against the production preview with Lighthouse 12.8.2 and headless Chromium:

| Category or metric | Result |
| --- | ---: |
| Performance | 99 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| First Contentful Paint | 1.5 s |
| Largest Contentful Paint | 2.0 s |
| Total Blocking Time | 0 ms |
| Cumulative Layout Shift | 0.012 |
| Speed Index | 1.5 s |

INP is not produced by the Lighthouse lab run. Total Blocking Time is recorded as its lab responsiveness proxy.

## Visual asset provenance

The source image is `assets/src/hero-glass.png`. The shipped asset is `public/hero-glass.webp`. It was generated with `/opt/fleet/lib/gen-image.sh` using deployment `factory-image`, then visually reviewed and optimized. The exact prompt is in `assets/src/hero-glass.json` and the generator sidecar. No text, brand, logo, person, or visible artifact appears in the selected image.

## Known gaps and release steps

- The factory must register the `batch-cart` product and confirm the production checkout price before launch. The client contains no payment-provider secret or numeric product ID.
- The license verification path is covered with a cached-valid browser fixture. A real purchase requires the factory-registered product.
- The parser intentionally covers common household units rather than every regional measure. Unknown units remain attached to the ingredient name and stay editable.
- The product does not scrape recipes, recommend nutrition, sync between devices, or order groceries. These are brief-defined non-goals.
- Web Share availability depends on the browser. Unsupported browsers copy the same calculated list to the clipboard.
