# Independent verification 5 — PASS

Verified on 2026-08-29 against candidate commit `f905004d23ad4f1d243844cce4bf566b97a6bed8` and [https://batch-cart.sociobot.in](https://batch-cart.sociobot.in).

## Decision

**PASS — candidate accepted.** No product source was modified. The live production files are byte-identical to the fresh build of the tested candidate, all required claim and repository tests passed, and the live PWA completed the core multi-recipe shopping task offline.

## First read and demo gate — PASS

I opened the live home page cold in a fresh Chromium context at 1440 × 900 before inspecting source. In plain words it says:

- **What it does:** “Combine recipes into one shopping list.”
- **For whom:** “For home cooks planning several dishes who want correct amounts after every serving change.”
- **What to click first:** **Try it with sample data**; adjacent copy says it opens three recipes with a ready shopping list.

The one-click action reaches `/?demo=1`/`/demo`, showing Lemony tomato pasta, Herb market salad, and Garlic bread in an isolated sample cart. The persistent banner says “Demo — sample data, nothing is saved” and offers **Reset demo** and **Start for real**. At 390 × 844 the headline, audience, action explanation, and three facts all fit in the first screen; horizontal overflow was 0 px.

## Required claims — PASS

`.factory/claims.json` exists and declares 24 claims. After a clean `npm ci`, I ran every exact registry command separately, each through the product's local demo entry point. All exited 0:

| Claims | Result |
| --- | --- |
| `scaled-aggregation`, `uncertain-conversions`, `fixed-measures`, `pantry-exclusion` | PASS |
| `data-export`, `data-import`, `list-sharing`, `list-printing` | PASS |
| `demo-isolation`, `demo-deletion`, `demo-seed-reset`, `editable-totals` | PASS |
| `local-privacy`, `private-runtime`, `license-verification-daily`, `license-token-only` | PASS |
| `license-revocation`, `returned-license-storage`, `no-recipe-scraping`, `offline-reload` | PASS |
| `plus-snapshots`, `free-core`, `local-data-deletion`, `hosted-checkout` | PASS |

## Local quality gates — PASS

- `npm ci`: passed; audit reported 0 vulnerabilities.
- `npm test`: passed — 12 Vitest unit tests and 49 Playwright browser tests (1.5 minutes).
- `npm run build`: passed (`tsc --noEmit && vite build`) and produced `dist/`.
- No separate lint script/configuration exists in this repository.
- Fresh production build: JavaScript 30.54 kB raw / 10.42 kB gzip; CSS 20.30 kB raw / 5.33 kB gzip. Both are within the static-product budgets.

## Live deployment identity and product exercise — PASS

The following fresh-build files and live responses have identical SHA-256 digests:

| File | SHA-256 |
| --- | --- |
| `index.html` | `ca8e23ccfa05af05189df1962baa423c62e56f87c82dabb6799e97c37d93334e` |
| `assets/index-HzkV3h3H.js` | `c36e67c09f763a11cebd1f1195d9e46ff1d7458705e1ebdb152e2a4b44552121` |
| `assets/index-Cb4BrVv1.css` | `66a9fc42a5295aeacfc721731870ac8c47ccd02299bbcbc914c2c4e927c33e69` |
| `sw.js` | `62b137ed4059310e1638aeb242e65d4d22ffa2c47e683c3bfef8cb406c24e53a` |
| `manifest.webmanifest` | `ae273aad98b536e51dbfd2a6d966dc8bef169ddbd1b6c4a52e374c9aec43fb35` |

Fresh live demo exercise showed three recipes, twelve calculated rows, and `1.2 kg` combined cherry tomatoes. I verified serving validation at 501 (“Serving counts must be between 1 and 500”), invalid ingredient recovery (`1/0 g salt` explains the problem; replacing it with `1 g salt` recalculates to 2), pantry persistence after reload, JSON export (version 1, three recipes, pantry selection), print invocation, and the sample/real-data boundary through the claim suite. The declared tests also cover conversion review, incompatible units, import, share, editable totals, snapshots, free-core controls, deletion, and hosted checkout.

## Privacy, PWA, headers, and rate allowance — PASS

- The whole live demo flow's outgoing request log contained only the application origin; changing servings, recovering invalid input, checking pantry, reloading, exporting, sharing, and printing sent no recipe data elsewhere. Cold first load also made only same-origin requests; no analytics, tracker, CDN-font, or third-party runtime request appeared.
- The live manifest, standalone configuration, icons, and service worker are present. After the first demo visit, `navigator.serviceWorker.controller` was active for the app scope. With the browser offline, a reload returned HTTP 200 and retained the demo banner, three recipes, and twelve rows with no errors.
- Live responses include HSTS, CSP with `frame-ancestors 'none'` as a response header, `X-Content-Type-Options: nosniff`, strict referrer policy, and restrictive permissions policy. Hashed JS/CSS are `max-age=31536000, immutable`; shell, manifest, and worker revalidate after 30 seconds. `robots.txt`, `sitemap.xml`, manifest, and designed `404.html` are served.
- The only product server call is Sociobot license/checkout. A contiguous single-client invalid-license probe received HTTP 429 on request 31, after 30 rapid successful requests, with `Retry-After: 3` and `X-RateLimit-After: 3`. The observed burst allowance is therefore 30 requests before enforcement. The claim suite also confirms token-only verification, daily verification caching, revocation handling, and the hosted checkout redirect.

## Accessibility, keyboard, mobile, and performance — PASS

- `/opt/fleet/lib/verify-url.sh https://batch-cart.sociobot.in /tmp/batch-cart-verify-5-url` passed: 200, title, `lang=en`, exactly one h1, main landmark, complete image alt text, labeled buttons, and no console/page errors.
- Fresh live Playwright axe scans of `/`, `/demo`, `/privacy`, `/terms`, and `/missing-page` reported zero serious or critical violations. The expected HTTP 404 navigation logs a browser network message for `/missing-page`; the normal product routes reported no console or page errors.
- Keyboard checks cover the skip link, visible focus states, keyboard-operable controls, heading focus after routes, and the mobile cart-first focus order. Reduced motion changes transitions/animations to `0.01ms`; 390 px demo overflow is 0.
- Mobile Lighthouse (Chrome 145): performance **98**, accessibility **100**, best practices **100**, SEO **100**; LCP **1.4 s**, CLS **0.021**, total transfer **113 KiB**.

## Defects

No release-blocking, high, medium, or low product defects found. The prior deployment-only concern does not reproduce: the live production assets exactly match this candidate and all fresh evidence passes.

## Evidence artifacts

Non-product artifacts from this verification are under `/tmp/batch-cart-verify-5-url`, `/tmp/batch-cart-live-desktop-cold.png`, `/tmp/batch-cart-live-mobile-cold.png`, `/tmp/batch-cart-live-mobile-demo.png`, and `/tmp/batch-cart-lighthouse.json` in the verification container.
