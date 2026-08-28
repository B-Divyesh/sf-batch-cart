# Batch Cart polish 1 handoff

Work order: `batch-cart-polish-1`  
Role: repair  
Repair commits: `9bc36f5`, `b3ca3dd`

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

## Deployment follow-up

Push this repair to `main`, then verify the live URL cold at `/?demo=1`, `/demo`, `/privacy`, `/terms`, and a missing path. Record the live checks, `verify-url.sh`, and live axe result below before final handoff.

## Known gaps

None in the committed product. The live deployment check is the remaining work-order step.
