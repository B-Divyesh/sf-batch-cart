# Batch Cart independent verification 6 — PASS

Date: 2026-08-29
Candidate commit: `865d481fe8c8af70a10d5e3a3f14b4f797b5fff4`
Live URL: <https://batch-cart.sociobot.in>
Verifier work order: `batch-cart-verify-6`

## Decision

**PASS.** The deployed product is byte-identical to the candidate for the checked
release assets and meets the researched brief's local-first multi-recipe shopping
list job.

No open Critical, High, Medium, or Low defects were found.

## Required first checks

### Claims and demo entry point

`.factory/claims.json` exists with 24 unique entries. From a clean install, I ran
every declared command independently, in file order, against its declared demo
entry point:

- `scaled-aggregation`, `uncertain-conversions`, `fixed-measures`,
  `pantry-exclusion`, `data-export`, `data-import`, `list-sharing`, and
  `list-printing`
- `demo-isolation`, `demo-deletion`, `demo-seed-reset`, and `editable-totals`
- `local-privacy`, `private-runtime`, `license-verification-daily`,
  `license-token-only`, `license-revocation`, and `returned-license-storage`
- `no-recipe-scraping`, `offline-reload`, `plus-snapshots`, `free-core`, and
  `local-data-deletion`
- `hosted-checkout`

All 24 commands passed. The complete retry of the browser suite below also
exercised every tagged claim.

### Cold first read of the live page

At a fresh desktop visit, the first screen says **“Combine recipes into one
shopping list.”** It says this is for home cooks planning several dishes and
explains that serving changes update the amounts. The obvious first action is
**“Try it with sample data,”** immediately followed by “The demo opens three
recipes with a ready shopping list.” It also presents the three required facts:
offline after first visit, recipes stay in this browser, and the free/US$12
price distinction. The page therefore answers what it does, for whom, and what
to click first in plain words, with the required one-click sample demo.

## Clean local verification

| Check | Result |
| --- | --- |
| `npm ci` | Passed; 0 audit vulnerabilities |
| `npm test` retry | Passed: 13 unit tests and 49 Playwright tests |
| `npm run build` | Passed; generated `dist/` |
| Initial JS | 30.52 kB raw / **10.36 kB gzip** |
| CSS | 20.35 kB raw / **5.35 kB gzip** |

The first complete `npm test` attempt reached 48/49 and Chromium itself crashed
during the daily-license test (a browser process SIGSEGV, not an assertion).
The isolated affected claim then passed (13.4 s), the isolated service-worker
update test passed (12.8 s), and a complete retry passed all 49 tests (1.5 min).
This transient runner failure is recorded for transparency and is not a
reproduced product defect.

## Live behavior and brief acceptance

Fresh live Playwright verification at `/?demo=1` found the persistent demo
banner, 3 realistic recipes, and 12 calculated shopping-list rows. I verified:

- invalid `1/0 g salt` gives a local, recoverable error; replacing it with
  `1 g salt` calculates a 1.5 total;
- an invalid 501 serving count explains the permitted 1–500 range;
- pantry selection survives reload (`In the pantry (1)`);
- JSON export contains the 3 sample recipes; print and share receive the
  calculated list;
- demo-flow request logging contains no off-origin request and no page/console
  errors;
- the worker is active at `/sw.js`; after first load the demo reloads offline
  with the sample recipe still available;
- an installed-worker update is announced by its isolated regression test.

This is the smallest useful product in the brief: user-entered recipe cards,
per-recipe servings, deterministic unit-aware aggregation with review markers,
pantry exclusions, and list print/share/export/import. Recipe URLs are treated
as invalid ingredient text, not scraped.

## Deployment identity, privacy, HTTP, and rate limit

The live and candidate-build SHA-256 values matched exactly for `index.html`,
`assets/index-DiAh7Ln9.js`, `assets/index-B8WGR663.css`, `manifest.webmanifest`,
`404.html`, `sw.js`, both offline files, both hero images, and the social card.

A cold live request loaded only same-origin HTML, JS, CSS, fonts, and artwork;
there were no console or page errors. The demo editing flow likewise contacted
only the app origin. The response CSP restricts scripts, styles, images, and
fonts to self; `connect-src` is self plus the documented Sociobot billing API.
Responses include `X-Content-Type-Options: nosniff`, HSTS, and a strict referrer
policy. Hashed JS is `Cache-Control: public, max-age=31536000, immutable`; the
HTML and `sw.js` are revalidated every 30 seconds.

The only server-side product interaction is Sociobot billing verification. A
single-client check of a harmless invalid license reached **429 on request 31**,
therefore observing an allowance of **30 requests**. The 429 response included
`Retry-After: 3` and `X-RateLimit-After: 3`.

## Accessibility, responsive behavior, and performance

- axe-core Playwright scan: no serious or critical violations on `/`, `/?demo=1`,
  `/privacy`, `/terms`, or `/missing-page`.
- At 390×844 there was zero horizontal overflow on the landing page and demo.
  The keyboard starts at the skip link; its live focus outline is a visible
  3 px apricot outline. Reduced-motion media is active and the focus transition
  is effectively instant (`0.00001s`).
- Demo, privacy, terms, and 404 each have one main landmark and one h1 through
  the passing suite. Internal landing/demo/privacy/terms links returned 200;
  missing page returned 404.
- Live Lighthouse (Chrome 145): performance **100**, accessibility **100**,
  best practices **100**, SEO **100**; LCP **1.35 s**, CLS **0.021**, total
  transfer **114.6 kB**.

## Evidence retained during this verification

Temporary verifier artifacts (not product files) were generated at:

- `/tmp/batch-cart-npm-test-retry.log`
- `/tmp/batch-cart-build.log`
- `/tmp/batch-cart-live-qa.json`
- `/tmp/batch-cart-live-a11y.json`
- `/tmp/batch-cart-lighthouse.json`
- `/tmp/batch-cart-live-cold-desktop.png`
- `/tmp/batch-cart-live-demo-desktop.png`
- `/tmp/batch-cart-live-mobile.png`
