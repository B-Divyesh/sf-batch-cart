# Batch Cart independent verification 11

**Decision: PASS**

- Candidate commit: `0066e2eaa8878ae04712902d2082d8785a693ead`
- Live URL: <https://batch-cart.sociobot.in>
- Verified: 2026-08-29
- Scope: clean-install local and deployed-PWA verification. No product code was changed.

## Cold first read

A cold desktop browser load says **“Combine recipes into one shopping list.”**
It explains: “For home cooks planning several dishes who need one list when
serving counts change.” The first primary action is **Try it with sample data**;
the adjacent words say it opens three recipes with a ready shopping list. This
plainly answers what it does, who it is for, and what to click first.

The one-click sample opens an isolated demo with the persistent **“Demo — sample
data, nothing is saved”** banner, Reset demo, Start for real, three named
recipes, and twelve calculated shopping-list rows.

## Required claim tests

`.factory/claims.json` exists and contains 24 claims. After a clean `npm ci`
(0 vulnerabilities), I ran every declared exact command independently before
the other QA using its `/demo` sandbox. All passed:

`scaled-aggregation`, `uncertain-conversions`, `fixed-measures`,
`pantry-exclusion`, `data-export`, `data-import`, `list-sharing`,
`list-printing`, `demo-isolation`, `demo-deletion`, `demo-seed-reset`,
`editable-totals`, `local-privacy`, `private-runtime`,
`license-verification-daily`, `license-token-only`, `license-revocation`,
`returned-license-storage`, `no-recipe-scraping`, `offline-reload`,
`plus-snapshots`, `free-core`, `local-data-deletion`, and `hosted-checkout`.

Each command was the declared
`npm run test:e2e -- --grep @claim:<id>` command. The final Playwright status
was `passed` with no failed tests.

## Local gates

- `npm test`: **PASS** — 14 Vitest tests and 51 Chromium tests.
- `npm run build`: **PASS** — TypeScript check and Vite build produced `dist/`.
- There is no separate lint script; the production build includes
  `tsc --noEmit`.
- Initial application JS is 31.11 kB raw / 10.49 kB gzip. CSS is 20.33 kB raw /
  5.34 kB gzip, within the stated static-product budgets.

## Deployment, functional, and privacy evidence

- Fresh local `dist/index.html`, `dist/assets/index-DoVcBCJj.js`,
  `dist/assets/index-CZFeCdHm.css`, and `dist/sw.js` each SHA-256 match the
  deployed origin. The live product is this candidate.
- `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npm run test:e2e`:
  **PASS, 51/51**. It exercises normal scaling and aggregation, fixed and
  uncertain conversions, fractional and out-of-range servings, malformed
  imports with recovery, pantry persistence, editable totals, JSON
  import/export, print/share, demo isolation/reset/deletion, free/Plus
  boundaries, routing, keyboard operation, accessibility, and offline reload.
- A fresh live browser recorded only `batch-cart.sociobot.in` requests for the
  initial page. The live demo privacy claim test also passed while recording
  its full edit flow. There were no console errors or page errors.
- Response headers include HSTS, CSP (`default-src 'self'`, with only
  `https://api.sociobot.in` in `connect-src`), `X-Content-Type-Options:
  nosniff`, strict-origin referrer policy, and Permissions-Policy. Fingerprinted
  JS/CSS use `max-age=31536000, immutable`.
- The optional checkout claim passed live. No sign-in is used or required.
- Rate-limit check: 40 sequential invalid-token requests to
  `GET /api/v1/products/batch-cart/verify` returned **30 × 200** followed by
  **10 × 429**. Every 429 carried `Retry-After: 2`; observed single-client
  allowance is 30 requests.

## PWA, accessibility, mobile, and performance

- Live 390×844 demo: 12 rows, zero horizontal overflow, skip link is first in
  Tab order and displays a 3px visible focus outline. Reduced-motion button
  transition resolves to `0.01ms`.
- After waiting for service-worker readiness, the live demo had a controller.
  With the browser offline, reload still rendered “Plan dinner with sample
  recipes” and “Lemony tomato pasta.” The tested update handler announces
  “An update is ready. Reload to use it.”
- Playwright Axe scans of `/`, `/demo`, `/privacy`, `/terms`, and an unknown
  route passed with zero violations, therefore zero serious or critical
  findings. This uses the repository's installed `@axe-core/playwright` and
  preinstalled Chromium.
- Live mobile Lighthouse: **96 performance, 100 accessibility, 100 best
  practices, 100 SEO**; LCP 1.50 s, CLS 0.0011, TBT 221.5 ms. The result meets
  the required 90+ performance and 95+ accessibility gates.

## Defects by severity

Release-blocking: 0. High: 0. Medium: 0. Low: 0.
