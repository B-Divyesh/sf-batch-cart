# Batch Cart independent verification 9

**Decision: PASS**

- Candidate: `6f51cf89e1a99c45203f4da624832e41e6406cc8`
- Live URL: <https://batch-cart.sociobot.in>
- Verification date: 2026-08-29
- Scope: independent clean-checkout and deployed-PWA verification. No product code was changed.

## Cold first read

On a fresh live desktop browser, the first screen says “Combine recipes into one
shopping list,” identifies “home cooks planning several dishes” as its audience,
and puts **Try it with sample data** beside the explanation “The demo opens three
recipes with a ready shopping list.” One click opened the isolated demo at
`/?demo=1`, with three named recipes, twelve calculated rows, and the persistent
“Demo — sample data, nothing is saved” banner with Reset demo and Start for real.
This satisfies the plain-words and one-click-demo contract.

## Required claim tests

After `npm ci` (0 vulnerabilities), every command in `.factory/claims.json` was
run independently against its fresh local demo entry point and passed. This is 24
claims: `scaled-aggregation`, `uncertain-conversions`, `fixed-measures`,
`pantry-exclusion`, `data-export`, `data-import`, `list-sharing`, `list-printing`,
`demo-isolation`, `demo-deletion`, `demo-seed-reset`, `editable-totals`,
`local-privacy`, `private-runtime`, `license-verification-daily`,
`license-token-only`, `license-revocation`, `returned-license-storage`,
`no-recipe-scraping`, `offline-reload`, `plus-snapshots`, `free-core`,
`local-data-deletion`, and `hosted-checkout`.

Each was invoked exactly as declared, `npm run test:e2e -- --grep @claim:<id>`.
The full tagged run was also tried; an initial parallel attempt lost its preview
server and produced connection-refused failures, but the exact required individual
commands all passed, and the later normal full suite passed (below). This was not
reproducible as a product defect.

## Local quality gates

- `npm test`: **PASS** — 13 unit tests and 51 Playwright tests passed.
- `npm run build`: **PASS** — TypeScript check and Vite production build created
  `dist/`.
- No separate lint script exists. The build runs `tsc --noEmit`.
- Initial compressed assets: JavaScript 10.49 kB gzip; CSS 5.34 kB gzip. Both are
  within the 200 kB/50 kB budgets.

## Live deployment and product checks

- The live `index.html`, `assets/index-DFpbCUWp.js`, and
  `assets/index-CZFeCdHm.css` SHA-256 hashes exactly equal the candidate build.
- `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npm run test:e2e -- --workers=1 --reporter=dot`:
  **PASS**, 51/51. Coverage includes normal aggregation, serving boundaries,
  malformed import recovery, malformed ingredient handling, pantry persistence,
  import/export, print/share, demo isolation/deletion/reset, Plus-license fixtures,
  route metadata, desktop/mobile layout, and PWA paths.
- Fresh live request recording through landing and demo showed only
  `https://batch-cart.sociobot.in` resources (document, app JS/CSS, self-hosted
  fonts, and hero image). No analytics, tracker, CDN-font, or recipe-data request
  was observed. The claims also verify the documented license call sends only the
  token to `api.sociobot.in`.
- Live headers: HTTPS, `Strict-Transport-Security`, `X-Content-Type-Options:
  nosniff`, restrictive `Referrer-Policy`, Permissions Policy, and CSP with
  `default-src 'self'` and only `https://api.sociobot.in` in `connect-src`.
  Fingerprinted JS/CSS use `Cache-Control: public, max-age=31536000, immutable`.
- Desktop and 390×844 mobile had no console/page errors or horizontal overflow;
  the primary mobile action measured 350×50 px. Keyboard focus is visible
  (3 px solid outline); live suite checks skip link, tab flow, and touch targets.
- Live axe scan found **0 serious/critical** violations. Lighthouse live mobile:
  performance 97, accessibility 100, best practices 100, SEO 100; LCP 1.43 s,
  CLS 0.0011.
- PWA: manifest, icons, offline page, and service worker all return 200. A fresh
  `/?demo=1` visit acquired a service-worker controller; after setting the context
  offline, reload still rendered all three sample recipes. The suite’s installed
  service-worker update test passed; implementation announces “An update is ready.
  Reload to use it.”
- The product is static/local-first and exposes no candidate-owned server API or
  product-unlock endpoint, so a request allowance/429 check is not applicable.
  Its optional hosted checkout/license verification is Sociobot’s external API;
  no documented allowance is present in this repository.

`verify-url.sh` is not present in this checkout; its required title/lang/main/alt/
console coverage was independently performed by the live Playwright checks above.

## Defects

None found. No release-blocking, high, medium, or low defects were identified.
