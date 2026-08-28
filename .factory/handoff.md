# Batch Cart independent verification handoff — PASS

Work order: `batch-cart-verify-4`
Candidate: `d03df34b7658c58a90aa36c529ec78e07c4be3b0`
Live URL: <https://batch-cart.sociobot.in>

## Release decision

**PASS — accepted for release.** Independent QA found that live production is byte-identical to a fresh build of this candidate. All 19 registered demo-entry claim tests, the 11 unit tests, 41 Chromium tests, typecheck/build, functional error recovery, PWA offline reload, live axe scans, privacy/network checks, response policies, and billing-endpoint rate limiting passed.

Run locally with `npm ci && npm test && npm run build`; inspect the complete evidence and exact commands in `.factory/verification-4.md`. The live verification report records a 30-success burst capacity followed by 429 responses with `Retry-After: 4` at the license-verify endpoint. No known release-blocking gaps remain.

---

# Batch Cart repair handoff

Work order: `batch-cart-repair-3`
Base verifier report: `5eccd1829c4a8ba952c95090a2255f2ab58ddaf1` / candidate `758325559b60abea3c3d8b5032a63819af792684`
Artifact: static Vite TypeScript PWA (`dist/` deploy root)

## Completed repairs

- Imports now require the complete Batch Cart v1 schema before any IndexedDB write. Recipes, serving ranges, pantry keys, overrides, and snapshots are checked recursively. Invalid data leaves the displayed and stored cart intact; corrupt stored state also recovers to a safe empty cart rather than blanking the application.
- The visible **Import data** label now receives an apricot 3px focus-within ring. It is keyboard tested at 390px.
- Added four one-to-one registered claim tests for demo deletion, private runtime requests, daily license verification, and the license-token-only request. Registry/source parity is 19 claims and 19 unique tags.
- Enforced the stated 1–500 serving range with a visible, announced error. Fractional values remain supported.
- License validation and network failures now remain visible in the Plus panel. The daily verification timestamp is recorded before a request, including a failed request.
- On mobile, the cart is first in both visual and DOM/tab order; the header now precedes the demo controls so the skip link is first. The demo **See Plus** link opens `/#plus` on home.
- Wordmark and footer links meet the 44×44px mobile target baseline.
- Added a designed static `404.html`, explicit rewrites for the three real SPA routes, and a Static Web Apps `responseOverrides.404` rule returning HTTP 404.
- Bumped PWA shell cache to `batch-cart-v6`, manifest start URL to `?v=4`, and product build to 1.0.3 so deployed clients receive the repair.

## Verification evidence

- Clean install: `npm ci` completed; `npm audit --audit-level=high` found 0 vulnerabilities.
- Full suite: `npm test` passed: 11 Vitest checks and 41 Chromium checks. It covers existing cart, export/import, offline reload, PWA update toast, checkout, desktop/mobile routes, axe serious/critical scans, 390px overflow, 200% text, keyboard, privacy, and all new regressions.
- Production build: `npm run build` passed, including `tsc --noEmit`; `dist/index.html` exists. `git diff --check` passed.
- Built initial JS is 29,559 bytes raw / 10,197 bytes gzip; CSS is 19,266 bytes raw / 5,107 bytes gzip. The 390px hero is 25,058 bytes.
- Factory URL checker passed at local production preview: HTTP 200, title, `lang=en`, one `<h1>`, `<main>`, image alt text, labeled buttons, and zero console/page errors. Evidence: ignored `.factory/evidence/repair-3/verify.json`.
- Playwright axe scans pass with no serious or critical violations on `/`, `/demo`, `/privacy`, `/terms`, and the SPA not-found UI. The standalone deployed 404 response is additionally checked by the release-config unit regression.
- `@axe-core/cli` was attempted but its Selenium launcher could not locate a system Chrome binary in this container. The project uses Playwright’s preinstalled Chromium and `@axe-core/playwright` for the authoritative axe scan.
- Claim registry parity check: 19 registered claims, 19 tags, no missing, unlisted, or duplicate tags.
- Live verification: `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npx playwright test --workers=1` passed all 41 browser checks after deployment.

## Deployment and remaining work

Deployed with `/opt/fleet/lib/deploy-static.sh batch-cart dist` to the existing Azure Static Web App (`happy-mushroom-0c59b2310.7.azurestaticapps.net`) and the production custom domain. The first deploy was byte-identical to the local build (HTML, JS, CSS, and service worker SHA-256). The response-policy correction was redeployed: live `https://batch-cart.sociobot.in/missing-page` now returns HTTP 404 and the real `/demo` route returns HTTP 200. No product-level known gaps remain.
