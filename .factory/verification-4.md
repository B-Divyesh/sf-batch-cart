# Independent verification 4 — PASS

Verified on 2026-08-28 against candidate commit `d03df34b7658c58a90aa36c529ec78e07c4be3b0` and <https://batch-cart.sociobot.in>.

## Decision

**PASS — release candidate accepted.** The live deployment is byte-identical to a fresh production build of the candidate. Required claim tests, repository tests, production build, live functional checks, PWA offline check, accessibility scans, security headers, and rate-limiting checks passed. No product code was modified for this verification.

## First-read and demo gate — PASS

I opened the live home page cold in a fresh Chromium context at 1440 × 900 before inspecting its code. The first screen says:

- **What it does:** “Combine recipes into one shopping list.”
- **For whom:** “For home cooks planning several dishes who want correct amounts after every serving change.”
- **First action:** **Try it with sample data**, with adjacent copy that says it opens three scaled recipes and their combined cart.

The action opens `/demo` in one click with realistic pasta, salad, and garlic-bread recipes and a persistent **“Demo — sample data, nothing is saved”** banner, Reset demo, and Start for real. At 390 × 844, the same job, audience, and action are visible without horizontal overflow.

## Mandatory claim tests — PASS

`.factory/claims.json` exists. From the clean candidate checkout I ran `npm ci`, then every registry `test` command separately (each starts from the product’s `/demo` entry point). All completed with exit 0:

| Claims | Result |
| --- | --- |
| `scaled-aggregation`, `uncertain-conversions`, `fixed-measures`, `pantry-exclusion` | PASS |
| `data-export`, `data-import`, `list-sharing`, `list-printing` | PASS |
| `demo-isolation`, `demo-deletion`, `local-privacy`, `private-runtime` | PASS |
| `license-verification-daily`, `license-token-only`, `no-recipe-scraping`, `offline-reload` | PASS |
| `plus-snapshots`, `free-core`, `hosted-checkout` | PASS |

A source parity check found 19 registry IDs and exactly 19 unique `@claim:` tags, with no missing, extra, or duplicate ID.

## Functional QA — PASS

- Normal use: on live `/demo`, changing the first recipe from 6 to 8 servings recalculated tomatoes from `1.2 kg` to `1.45 kg`, garlic from `10` to `12 cloves`, olive oil from `7.5` to `9 tbsp`, and spaghetti from `600` to `800 g`.
- Pantry: marking cherry tomatoes as owned moved it into “In the pantry (1)” and it remained there after reload.
- Invalid input and recovery: `1/0 g salt` shows “Use a quantity greater than zero”; replacing it with `1/2 g salt` restores calculation. The `501` serving boundary shows the required 1–500 explanation. A structurally invalid JSON import shows the local validation message, preserves the cart, and still reloads with the sample recipe and no page errors.
- Import/export, print, share, incompatible-unit review, fractional servings, free controls, paid snapshot restore, and hosted checkout were exercised by the declared browser claims and full suite.
- The live checkout link is `https://api.sociobot.in/api/v1/products/batch-cart/checkout`; it returns 303 to a Dodo hosted checkout. There is no sign-in or AI runtime.

## Local quality gates — PASS

- Clean install: `npm ci` completed; `npm audit --audit-level=high` found 0 vulnerabilities.
- Every declared claim command: PASS (19/19).
- `npm test`: PASS — 11 Vitest tests and 41 Chromium tests.
- `npm run build`: PASS (`tsc --noEmit && vite build`); `dist/index.html` exists.
- No lint script or separate lint configuration is present. `git diff --check` passed.
- Fresh build budgets: JS 29,559 bytes raw / 10,256 gzip; CSS 19,266 bytes raw / 5,095 gzip; 390px hero 25,058 bytes. The first live load requested only three Latin WOFF2 subsets (72,320 bytes total transfer), within the 120 KB initial-font budget.

## Live deployment identity, security, and PWA — PASS

Fresh local build and live production SHA-256 match exactly:

| File | SHA-256 |
| --- | --- |
| `index.html` | `a3d339dbc21405ca714b1ad5a6a2cee6ae2c353f272668f875f206e25d04e59f` |
| `assets/index-Eb5RUEHk.js` | `f7f3b92b911cbac2e579803a07d8b5b13db7af9fbf9d8e8a31b2ba617cfac601` |
| `assets/index-C0flgUuJ.css` | `3081bb2c91a4705d81e8da5921539cc0773ac2a486bd171d2c13dc539447cab0` |
| `sw.js` | `f711f196433c009f5ecf2dd0bb4258ac8e3f11199f121dcf855db9e9375ac3c3` |

- A fresh live request had no console/page errors and contacted only `https://batch-cart.sociobot.in`; no analytics, tracker, CDN-font, or third-party runtime request was observed.
- The PWA manifest has standalone display, versioned start URL, theme/background colors, 192/512/maskable icons. Service worker `batch-cart-v6` precaches the shell, claims clients, and supports `SKIP_WAITING`; the offline reload claim passed from `/demo` after first visit.
- Live HTML has HSTS, CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive permissions policy. Hashed JS uses `Cache-Control: public, max-age=31536000, immutable`; shell/SW use short revalidation. `/missing-page` returns HTTP 404.
- A burst of 50 concurrent invalid-license requests to the only product server endpoint observed 30 × HTTP 200 then 20 × HTTP 429, each 429 with `Retry-After: 4`. The completion order is concurrent, so the reliable observed capacity is 30 successes per burst.

## Accessibility and responsive QA — PASS

- `/opt/fleet/lib/verify-url.sh https://batch-cart.sociobot.in .factory/evidence/verification-4` passed: HTTP 200, title, `lang=en`, one `<h1>`, `<main>`, complete image alt text, labeled buttons, and no console/page errors.
- Live Playwright axe scans of `/`, `/demo`, `/privacy`, `/terms`, and `/missing-page` found zero serious or critical violations.
- Desktop and 390px mobile had no horizontal overflow. Keyboard checks covered the skip link, visible Import focus-within ring, cart-before-recipes mobile focus order, and route-change heading focus. Reduced-motion CSS changes scroll behavior to `auto` and transition durations to `.01ms`.
- A first parallel live run produced three transient browser-test timeouts (mobile focus, skip link, synthetic worker-update toast). Each was immediately rerun serially against the same unmodified live deployment and passed; no functional or visual failure reproduced. This does not affect the separately run claim tests, all of which passed.
- Lighthouse CLI was attempted twice with the preinstalled Playwright Chromium but the container launcher could not attach to that browser (`Unable to connect to Chrome` / tab crash). This is an environment limitation, not a product assertion; the measured transfer budgets, mobile layout, live axe scan, and URL checker above passed.

## Defects

No release-blocking defects found. No known product defects found during this verification.

Evidence from this run is in ignored `.factory/evidence/verification-4/`; no product source files were changed.
