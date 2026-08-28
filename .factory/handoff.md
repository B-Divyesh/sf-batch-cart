# Batch Cart polish 1 handoff

Work order: `batch-cart-polish-1`  
Role: repair  
Repair commits: `9bc36f5`, `b3ca3dd`, `87ba088`

## Result

All findings F-1-1 through F-1-5 from `.factory/review-1.md` are repaired. The plain-language direct demo is `/?demo=1`; it uses the isolated `demo:batch-cart` IndexedDB namespace, shows its persistent banner and populated cart immediately, and deletes sample data on Start for real. `/demo` remains supported.

`.factory/polish-1.md` maps every finding to its implementation and evidence.

## Verification

- Fresh clone: `/tmp/batch-cart-final-clean-6EFSHC`; `npm ci` completed with 0 high vulnerabilities.
- Every exact command in `.factory/claims.json` passed independently: 20/20, including the new `returned-license-storage` claim.
- Fresh-clone `npm test` passed: 11 Vitest tests and 44 Chromium browser tests. This includes axe scans, mobile no-overflow, visible focus, keyboard order, import recovery, privacy interception, demo isolation/deletion, offline reload, legal routes, dynamic metadata, static 404 metadata, and the new mobile/desktop layout regressions.
- Fresh-clone `npm run build` passed and produced `dist/index.html`; `git diff --check` passed.
- Build budget: JS 30.00 kB raw / 10.33 kB gzip; CSS 19.65 kB raw / 5.19 kB gzip; mobile hero 25,058 bytes.
- Local visual evidence: [.factory/evidence/polish-1/demo-mobile-first-view.png](evidence/polish-1/demo-mobile-first-view.png), [.factory/evidence/polish-1/demo-desktop-workspace.png](evidence/polish-1/demo-desktop-workspace.png), and [.factory/evidence/polish-1/home-mobile-first-view.png](evidence/polish-1/home-mobile-first-view.png).

## Deployment and live verification

- Deployed `dist/` with `/opt/fleet/lib/deploy-static.sh batch-cart dist`. Azure deployment `8816ed25-8d25-40ef-876d-6caa584ab2a7` completed successfully; the custom domain was Ready and returned HTTPS 200.
- Cold live route and metadata check: `/`, `/?demo=1`, `/privacy`, and `/terms` returned HTTP 200. `/missing-page` returned HTTP 404. Every route had the expected route-specific title, canonical, Open Graph and Twitter title, one `h1`, and one `main`.
- Live axe scan on those five routes found 0 serious or critical violations. The expected browser console record for the HTTP 404 navigation was excluded; valid routes had no console or page errors.
- `/opt/fleet/lib/verify-url.sh 'https://batch-cart.sociobot.in/?demo=1' .factory/evidence/polish-1/live-verify` passed: 200, 669ms loaded, title `Demo — Batch Cart`, `lang=en`, one `h1`, one `main`, no missing image alt, no unlabeled buttons, and no console/page errors.
- At live 390 × 844, the first two cart rows were fully in the initial viewport (y=520.9–637.9 and y=637.9–754.9). At 1440 × 900, the cart and first recipe were side by side (62px top offset). Screenshots and route data are in ignored `.factory/evidence/polish-1/`.
- Live demo reset restored Lemony tomato pasta; Start for real removed `demo:batch-cart` and opened a real cart with zero recipes. After service-worker control, the live `/?demo=1` reload worked offline with sample data and the demo banner.
- Lighthouse CLI was attempted with the preinstalled Chrome both directly and through an explicit remote-debug port. The container browser crashed/failed to attach, so no score was produced. The measured build budgets, live axe scan, `verify-url.sh`, mobile layout, and offline checks passed.

## Known gaps

None in the committed product. The only unavailable measurement is Lighthouse in this container, as described above.
