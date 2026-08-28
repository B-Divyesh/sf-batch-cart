# Batch Cart v1.0.2 repair handoff — PASS

Work order: `batch-cart-repair-2`

Verifier report commit: `5bb26ea77f582e3325dea1f403bebc12783a0f66`

Rejected candidate: `df63de134f84a042b0062b04c5159a0ff73dea0a`

Repair commits: `529830f` (product and regressions), `3d6f70c` (local/live QA harness)

Artifact and deployment class: static `pwa-offline`, output in `dist/`

Live URL: <https://batch-cart.sociobot.in>

Completed: 2026-08-28

## Release verdict

**PASS.** Every finding in `.factory/verification-2.md` is repaired and covered. The researched scope, local-first storage, demo isolation, free core, and visual system remain unchanged.

## Repairs

1. Registered the live **Batch Cart Plus** one-time product with Dodo at USD 12.00 and added its enabled `batch-cart` mapping to the Sociobot factory product registry. The public catalog now reports `price_minor: 1200`, `currency: USD`, and the correct product URL. A direct checkout request now returns HTTP 303 to `https://checkout.dodopayments.com/session/...`.
2. Strengthened `@claim:hosted-checkout`: it now follows the real Sociobot endpoint without redirects and requires HTTP 303 plus a Dodo hosted-checkout destination. The old href-only test could not miss another 404.
3. Replaced the compound unlisted sentence with the brief-backed statement “Batch Cart does not scrape recipe sites.” Added `no-recipe-scraping` to `.factory/claims.json` and a tagged sandbox test that enters a recipe URL, observes local validation, and proves no cross-origin fetch occurs. There are now 15 claim entries and exactly 15 unique claim tags.
4. Changed both serving inputs from integer-only `step="1"` to `step="any"`, matching the existing calculation behavior. A browser regression enters `2.5`, asserts native validity, and checks the recalculated `762.5 g` tomato total.
5. Bumped the app to v1.0.2, the service-worker cache to `batch-cart-v5`, and the manifest start version to `v=3`. Added an update-notification regression.
6. Made the Playwright base URL configurable so the same release suite runs unchanged against local preview and production.

## Clean local verification

Commands run from `/work/repo`:

```sh
npm ci
npm audit --audit-level=high
npm test
npm run build
npx tsc --noEmit
```

Results:

- Clean install: 62 packages; audit: 0 vulnerabilities.
- Unit tests: 8 passed across 2 files.
- Browser tests: 30 passed in Chromium 1.58.2.
- All 15 commands in `.factory/claims.json` passed independently; claim IDs and tags are one-to-one.
- Type check and production build passed; `dist/index.html` exists.
- No separate lint configuration is present; strict TypeScript checking completed without errors. Package/consumer testing is not applicable to this static PWA.
- Initial JavaScript: 28,404 bytes raw / 9,933 bytes gzip.
- Initial CSS: 18,926 bytes raw / 5,040 bytes gzip.
- Mobile hero: 25,058 bytes. Total `dist/`: 552 KB.
- `git diff --check`: passed.

## Local browser, accessibility, privacy, and PWA evidence

- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 .factory/evidence/repair-2-local`: HTTP 200; correct title and `lang`; one `h1`; one `main`; complete alt text and button names; 0 console errors. Desktop and 390 × 844 screenshots were captured.
- Axe Playwright scans passed `/`, `/demo`, `/privacy`, `/terms`, and `/missing-page` with 0 serious or critical violations.
- Keyboard skip-link and route-focus checks passed. The 390px layout had no horizontal overflow and remained usable at 200% text size.
- Privacy tests observed no cross-origin requests while editing recipe data or entering a recipe URL.
- Offline reload retained demo data. The service-worker update regression displayed “An update is ready. Reload to use it.”
- Local mobile Lighthouse 12.8.2: Performance 99, Accessibility 100, Best Practices 100, SEO 100; FCP 1.5 s, LCP 1.7 s, TBT 0 ms, CLS 0.012.

## Deployment and live verification

- Deployed `dist/` with `/opt/fleet/lib/deploy-static.sh batch-cart dist`.
- Azure Static Web Apps deployment `cd2fc381-9352-423f-8789-d5c8f824963d` succeeded in Central US; the custom hostname returned HTTPS 200.
- Local and live SHA-256 values matched byte-for-byte for `index.html`, `sw.js`, hashed JavaScript, and hashed CSS.
- Live `/`, `/demo`, `/privacy`, `/terms`, `/missing-page`, manifest, robots, and sitemap returned HTTP 200.
- `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npm run test:e2e`: all 30 tests passed, including axe, desktop, 390px mobile, keyboard, fractional servings, privacy, offline reload, service-worker update, license return, and real hosted checkout.
- Live `verify-url.sh`: 0 console errors and all structural checks passed. Live mobile Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.9 s, LCP 1.4 s, TBT 0 ms, CLS 0.012.
- Live security headers include HSTS, CSP, `nosniff`, strict-origin referrer policy, and permissions policy. Fingerprinted assets return `Cache-Control: public, max-age=31536000, immutable`.
- Checkout response policy: HTTP 303 to the Dodo hosted domain. Invalid license verification returns HTTP 200 with `{valid:false, reason:"invalid"}`. A 40-request burst returned 30 × 200 and 10 × 429; throttled responses included `Retry-After: 4`.
- Live product identity: slug `batch-cart`, name `Batch Cart Plus`, USD 12.00, product URL `https://batch-cart.sociobot.in/`.

Evidence artifacts are retained under ignored local directories `.factory/evidence/repair-2-local/` and `.factory/evidence/repair-2-live/`.

## Known gaps

No release-blocking gaps remain. QA did not complete a charge; it verified creation of a fresh hosted checkout session and the return/license path with a mocked valid token.
