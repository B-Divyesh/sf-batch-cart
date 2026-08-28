# Batch Cart v1.0.1 repair handoff

Work order: `batch-cart-repair-1`

Verifier report commit: `62e7ca0bb61c1234d50445e947aae93ab2224a0f`

Rejected candidate: `85401729e6a7a09a522ed83ecb5ffd37eb00961d`

Completed: 2026-08-28

Artifact and deployment class: static `pwa-offline`, output in `dist/`

## Release-blocking findings repaired

1. Fractions with a zero denominator no longer enter aggregation. `parseNumber` now rejects every non-finite fraction result. In `/demo`, `1/0 g salt` produces the existing “Use a quantity greater than zero.” alert, creates no salt row, and recovers after correction. Unit and browser regressions cover this exact sequence.
2. Every retained visitor claim is now listed and tested. New sandbox claims cover visible mixed/incompatible units, the exact cup/tablespoon conversion, JSON import, and free use after ten simulated years. `.factory/claims.json` has 14 entries and each tag occurs in exactly one browser test.
3. Mobile loading now uses a 600 × 400, 25,058-byte WebP instead of the 1,200 × 800 hero. Below-fold sections use rendering containment. A 390px browser regression asserts the selected URL and a 30 KB ceiling.
4. Azure Static Web Apps now sends `Cache-Control: public, max-age=31536000, immutable` for fingerprinted `/assets/*`. A unit test locks the policy. The service-worker cache is versioned as `batch-cart-v4` and precaches both hero sizes.
5. Cart inputs, disclosure controls, and pantry controls now meet the 44px touch-target baseline with 8px spacing. A mobile 200% text-size test verifies that the page remains usable without horizontal overflow.

The researched brief, luminous-glass identity, offline/local-first architecture, demo namespace, free core, Plus license flow, and all previously passing behavior remain intact.

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
- Unit: 8 passed across 2 files.
- Browser: 27 passed in Chromium 1.58.2.
- Claims: all 14 `.factory/claims.json` commands passed individually from `/demo`.
- Type check and production build: passed; `dist/index.html` exists.
- Initial app JavaScript: 28.43 KB raw / 9.95 KB gzip.
- Initial CSS: 18.93 KB raw / 5.04 KB gzip.
- Mobile hero: 25.06 KB. Total `dist/`: 552 KB.
- `git diff --check`: passed.

## Browser, accessibility, privacy, and PWA evidence

- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 .factory/evidence/local`: HTTP 200, correct title, `lang=en`, one `h1`, one `main`, complete alt text and button names, 0 console errors. Desktop and 390 × 844 screenshots were captured.
- Playwright axe integration scanned `/`, `/demo`, `/privacy`, `/terms`, and `/missing-page`: 0 serious or critical violations.
- Keyboard checks passed for the skip link and History API route-heading focus. Native form and disclosure controls retain visible focus rings.
- 390 × 844 overflow: 0px. The demo also has 0px overflow at 200% root text size.
- Privacy test observed no cross-origin request while recipe data was edited. Demo storage remains isolated in `demo:batch-cart`.
- Offline reload passed after service-worker control with sample data intact.
- Update behavior was forced by changing the served service-worker cache version in the built test artifact; a controlled page displayed “An update is ready. Reload to use it.” The build was regenerated afterward.
- Local mobile Lighthouse 12.8.2: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.1 s, LCP 1.7 s, TBT 0 ms, CLS 0.012; responsive-image savings 0 bytes.

## Deployment and live verification

Target: <https://batch-cart.sociobot.in> via `/opt/fleet/lib/deploy-static.sh batch-cart dist`.

- Commit `75885c9` and its two repair commits were pushed to `origin/main` before deployment.
- Azure Static Web Apps deployment `faa2f2f1-5dc4-4377-82b3-b7c538b47ffa` completed successfully in Central US. The custom hostname returned HTTPS 200.
- Live `index.html`, `sw.js`, hashed JavaScript, hashed CSS, and `hero-glass-600.webp` SHA-256 values matched the local `dist/` files byte for byte.
- The live hashed JavaScript returns `Cache-Control: public, max-age=31536000, immutable`. HSTS, CSP, Referrer-Policy, Permissions-Policy, and `nosniff` headers are present.
- Live `/`, `/demo`, `/privacy`, `/terms`, and the 404 route passed axe with 0 serious or critical violations. The live desktop and 390px browser runs had 0 console errors; mobile overflow was 0px and selected the 600px hero.
- The live invalid-fraction sequence showed the actionable alert, omitted the broken row, and recovered to `1.5 g salt` after correction.
- The live privacy flow made 0 cross-origin requests. A fresh controlled browser reloaded `/demo` offline with the sample recipe intact.
- Live mobile Lighthouse 12.8.2: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.2 s, LCP 1.4 s, TBT 0 ms, CLS 0.012; responsive-image savings 0 bytes.
- Sociobot verification response policy: a 40-request parallel invalid-token burst returned 30 × 200 and 10 × 429; the follow-up 429 included `Retry-After: 3`.

## Known external dependency

The factory must keep the `batch-cart` billing product registered at US$12. The client contains no payment-provider secret. Existing cached-verdict and mocked live-verification tests cover the license flow without making a purchase.
