# Batch Cart independent verification 7 — PASS

Date: 2026-08-29  
Candidate commit: `d695a6136c879886e435fa92216c64b665a3d06e`  
Live URL: <https://batch-cart.sociobot.in>  
Verifier work order: `batch-cart-verify-7`

## Decision

**PASS.** The live deployment is byte-identical to a fresh production build of
the candidate for the checked release assets. It satisfies the researched
local-first recipe-aggregation job. No Critical, High, Medium, or Low defects
were found. Product code was not changed during this verification.

## Mandatory claims and first read

`.factory/claims.json` is present and declares 24 unique claims. From this
clean candidate checkout, after `npm ci`, I ran every exact declared command
individually through its specified demo entry point. All exited zero:

- `scaled-aggregation`, `uncertain-conversions`, `fixed-measures`,
  `pantry-exclusion`, `data-export`, `data-import`, `list-sharing`, and
  `list-printing`
- `demo-isolation`, `demo-deletion`, `demo-seed-reset`, `editable-totals`,
  `local-privacy`, `private-runtime`, `license-verification-daily`,
  `license-token-only`, `license-revocation`, and `returned-license-storage`
- `no-recipe-scraping`, `offline-reload`, `plus-snapshots`, `free-core`,
  `local-data-deletion`, and `hosted-checkout`

The combined claim retry also passed: 24/24 with Playwright status `passed` and
no failed tests.

Cold first read of live `/`: **“Combine recipes into one shopping list.”** It
says it is for home cooks planning several dishes and explains that amounts
change with servings. The obvious first action is **“Try it with sample data”**
and adjacent copy says the demo opens three recipes with a ready shopping list.
The screen also states offline, local-data, and free/US$12 facts. It answers
what it does, for whom, and what to click first in plain words, and passes the
required one-click sample-demo check.

## Clean local verification

| Check | Result |
| --- | --- |
| `npm ci` | Passed; 0 audit vulnerabilities |
| `npm test` | Passed: 13 unit tests and 50 Chromium tests |
| `npm run build` | Passed (`tsc --noEmit && vite build`); generated `dist/` |
| Lint/type checks | No lint script/configuration exists; TypeScript is included in build; `git diff --check` passed |
| Initial JS | 30.63 kB raw / **10.38 kB gzip** |
| CSS | 20.35 kB raw / **5.35 kB gzip** |

The production bundles are within the static-product 200 kB JS and 50 kB CSS
budgets. The largest loaded font is 36.62 kB and the responsive mobile hero is
25.06 kB, both within their budgets.

## Deployment identity and functional QA

A freshly built candidate matched the live SHA-256 and byte length for
`index.html`, `assets/index-Cpym82AU.js`, `assets/index-B8WGR663.css`,
`hero-glass.webp`, `manifest.webmanifest`, and `sw.js`. This is direct evidence
that the deployed app matches `d695a6136c879886e435fa92216c64b665a3d06e`.

Fresh live `/demo` contained the persistent sandbox banner, exactly three
realistic recipes, and 12 calculated rows. Changing the first recipe to serve
10 changed the cherry-tomato total from 1.2 to 1.7. The checked flows include:

- invalid 501 servings reports the 1–500 range and retains the prior cart;
- invalid ingredient input is recoverable (the full claim suite verifies
  `1/0 g salt` rejects and `1 g salt` produces 1.5);
- pantry selection persists after reload; JSON import/export, print, and share
  pass their observable claim checks;
- demo reset/isolation/deletion and real-cart data deletion pass;
- direct live offline reload after service-worker activation retained the three
  sample recipes with no console/page errors;
- worker update handling is covered by the passing installed-worker update
  regression. The worker uses versioned cache `batch-cart-v13`, `skipWaiting`,
  and `clients.claim`.

The app meets the brief: user-entered recipe cards, per-recipe serving changes,
deterministic unit-aware combination with conversion-review markers, pantry
exclusions, and printable/shareable/importable/exportable lists. Recipe URLs
are treated as invalid local ingredient text; no scraping occurs.

## Privacy, HTTP, and billing endpoint

Cold live page and live demo interaction request logs contained only
`https://batch-cart.sociobot.in`; no tracker, analytics, third-party script, or
CDN-font request occurred. The only documented external destination is the
Sociobot billing API for an explicit license action. The claim suite separately
verifies token-only request content and daily verification caching.

Live response headers include a self-only CSP (with only
`https://api.sociobot.in` in `connect-src`), `X-Content-Type-Options: nosniff`,
HSTS, `Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive
Permissions-Policy. Hashed JS has `Cache-Control: public, max-age=31536000,
immutable`; HTML and `sw.js` revalidate after 30 seconds. A missing route
returns the designed page with real HTTP 404.

The live hosted checkout endpoint returned HTTP 303 to
`https://checkout.dodopayments.com/session/...`. For a single client, 40 rapid,
harmless invalid-license verification requests returned 200 for requests 1–30
and HTTP 429 from request 31 onward. The first 429 had `Retry-After: 3` and
`X-RateLimit-After: 3`; observed allowance: **30 requests per burst**.

## Accessibility, mobile, and first-load quality

- `/`, `/demo`, `/privacy`, `/terms`, and `/missing-page` each have one `h1`
  and one `main`; axe-core found **no serious or critical violations** on any.
  (Home and demo each have one non-serious axe item, not release-blocking.)
- At 390×844 live home had zero horizontal overflow. Keyboard Tab starts on the
  skip link, shows a 3px focus outline, and Enter moves focus to `main`.
- Live first loads and demo flows produced no browser console or page errors.
- With `prefers-reduced-motion: reduce`, the button transition computed to
  `0.00001s`; the live manifest and installed service worker are present.
- `/opt/fleet/lib/verify-url.sh` passed after creating its required evidence
  directory: live 200, title, `lang=en`, one h1, main landmark, complete image
  alt coverage, labeled buttons, and zero browser errors. Its initial invocation
  only failed because that script does not create its output directory; this is
  a verifier invocation prerequisite, not a product issue.

## Defects by severity

| Severity | Findings |
| --- | --- |
| Critical | None |
| High | None |
| Medium | None |
| Low | None |

## Reproduce

```sh
npm ci
npm test
npm run build
npm run test:e2e -- --grep @claim:offline-reload
```

Temporary URL-verifier output is at `/tmp/batch-cart-verify-7-url` in this
disposable verification environment.
