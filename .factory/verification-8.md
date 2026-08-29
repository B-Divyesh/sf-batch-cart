# Batch Cart independent verification 8 — PASS

Verifier work order: `batch-cart-verify-8`
Candidate: `aadd43dff8eace67070f2887626be410b30afa2f`
Live URL: <https://batch-cart.sociobot.in>  
Verified: 2026-08-29

## Decision

**PASS — accept the candidate.** The deployed HTML, JavaScript, and stylesheet
are byte-for-byte identical to a fresh build of the candidate. No release
blocking defect was found. Product code was not changed during this review.

## Required first checks

`.factory/claims.json` exists and declares 24 claims. From this clean checkout
I ran `npm ci`, then each exact command in its `test` field separately, before
the wider repository test suite. Every command exited 0 through the product's
shipped demo entry point:

`scaled-aggregation`, `uncertain-conversions`, `fixed-measures`,
`pantry-exclusion`, `data-export`, `data-import`, `list-sharing`,
`list-printing`, `demo-isolation`, `demo-deletion`, `demo-seed-reset`,
`editable-totals`, `local-privacy`, `private-runtime`,
`license-verification-daily`, `license-token-only`, `license-revocation`,
`returned-license-storage`, `no-recipe-scraping`, `offline-reload`,
`plus-snapshots`, `free-core`, `local-data-deletion`, and `hosted-checkout`.

Cold-reading the live home page at 1440 x 900 gave this answer without
interaction: it "Combine[s] recipes into one shopping list" for "home cooks
planning several dishes" and the first primary action is **Try it with sample
data**. Its adjacent explanation says the demo opens three recipes with a
ready shopping list. The three first-screen facts cover offline use, browser
local data, and the US$12 one-time Plus price. This satisfies the plain-words
and one-click sandbox gates.

## Clean checkout and deployment

| Check | Result |
| --- | --- |
| `npm ci` | Passed; 0 reported vulnerabilities |
| `npm test` | Passed: 13 unit tests and 51 Playwright tests |
| `npm run build` | Passed (`tsc --noEmit && vite build`); produced `dist/` |
| Available lint/type checks | No lint script/configuration is present; TypeScript is part of `npm run build`; `git diff --check` passed before documentation updates |
| Live suite | `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npm run test:e2e` passed 51/51 |
| Deployment identity | Local and live `index.html`, `assets/index-DFpbCUWp.js`, and `assets/index-CZFeCdHm.css` have identical SHA-256 hashes |

The candidate bundle is 31,113 bytes JavaScript (10,427 bytes gzip) and
20,326 bytes CSS (5,346 bytes gzip). The mobile hero is 25,058 bytes. These
are below the static-product budgets. A fresh Lighthouse invocation could not
connect to Chromium in this container even with the installed Playwright
browser and no-sandbox flags; this is a verifier-tool limitation, not a page
error. Direct cold load through the factory verifier completed in 898 ms and
the asserted bundle, transfer, accessibility, and layout checks above passed.

## Product and accessibility exercise

- Live `/demo` opened its three sample recipes and 12 calculated rows.
- The live suite covered serving scaling, compatible and incompatible units,
  pantry persistence, import/export, print/share, demo isolation/deletion,
  Plus restoration/revocation, and hosted checkout.
- Boundary/recovery checks passed: a fractional serving is recalculated by the
  live suite; an out-of-range serving shows the visible 1–500 explanation and
  can be corrected. Independently, replacing a recipe with `1/0 g salt`
  produced a live alert ending "Use a quantity greater than zero" and no salt
  row, rather than an invalid calculated quantity.
- At 390 x 844 `/demo` had zero horizontal overflow and showed the populated
  shopping list. Keyboard skip-link/main focus, visible focus, 200% text,
  touch-target, client-route focus, and reduced-motion cases passed in the
  live suite. In a reduced-motion context the page reported `scroll-behavior:
  auto` and no active CSS animations.
- The live full suite's Axe scans found zero serious or critical violations on
  `/`, `/demo`, `/privacy`, `/terms`, and the missing-page route.
- `/opt/fleet/lib/verify-url.sh` passed for `/` and `/?demo=1`: HTTP 200,
  title, `lang=en`, one h1, main landmark, complete image alt text, labeled
  buttons, and no console/page errors. Temporary evidence is under
  `/tmp/batch-cart-verify-8-url` and `/tmp/batch-cart-verify-8-url-demo`.

## Privacy, PWA, HTTP, and server allowance

- A fresh Playwright request log for the home and demo flows contained only
  `https://batch-cart.sociobot.in` document/assets/fonts/images; no trackers,
  analytics, third-party scripts, or CDN fonts appeared. The separately run
  privacy claims also passed.
- The live PWA offline-reload claim and service-worker update-announcement test
  passed. It precaches the demo shell and reloads it offline after a connected
  visit.
- Live response headers include HTTPS, HSTS, CSP with response-header
  `frame-ancestors 'none'`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `X-Content-Type-Options: nosniff`, and a restrictive Permissions-Policy.
  Hashed JS, CSS, and hero assets use `public, max-age=31536000, immutable`;
  HTML, manifest, service worker, and offline fallback revalidate after 30 s.
- The only server-side product call is Sociobot license verification/checkout.
  One single-client sequential harmless invalid-token probe returned 30 x 200,
  then 429 on requests 31–35. Each 429 supplied `Retry-After: 4` and
  `X-RateLimit-After: 4`; observed allowance: **30 requests per burst**.
- No sign-in flow is present, so no identity-provider integration is required.

## Defects by severity

None found: Critical 0, High 0, Medium 0, Low 0.

## Handoff

Run `npm ci && npm test && npm run build`; use `/?demo=1` for the isolated
sample flow. Deploy verification target was the exact candidate listed above.
No product-code follow-up is required.
