# Adversarial first-read review 8 — FAIL

Reviewed 2026-08-29 against <https://batch-cart.sociobot.in> and clean clone of
`1a4f417250a0bd6779ee7e1518de613b6a1831e5`.

## Verdict

**FAIL.** The task, audience, first action, one-click sample cart, declared
claims, privacy behavior, routes, links, visual identity, and previous repairs
all verify. One moderate accessibility violation remains on the two product
workspaces. A PASS requires zero findings of every severity.

## First read before scrolling

Fresh Chromium contexts opened the production home page at 390 × 844 and 1440
× 900. Neither load logged a page or console error.

| Question | Answer after one screen | Exact evidence |
| --- | --- | --- |
| What does it do? | It combines recipes into one shopping list. | “Combine recipes into one shopping list” |
| For whom? | Home cooks preparing several dishes whose serving counts change. | “For home cooks planning several dishes who need one list when serving counts change.” |
| What should I click first? | **Try it with sample data**. | The result-naming primary action and “The demo opens three recipes with a ready shopping list.” |

This mandatory first-read gate passes on both viewports. On the 390px screen,
the action explanation and all three facts remain visible without scrolling.

## Findings

### F-8-1 — MINOR — the shopping list is exposed as a nested complementary landmark

**Location/quote:** live `/` and `/?demo=1`, `<aside class="cart-plane"
aria-labelledby="cart-title">`; source [`src/main.ts`](../src/main.ts) in
`workspace()`. A fresh Axe scan reports `landmark-complementary-is-top-level`
with moderate impact: “Aside should not be contained in another landmark.”

**Why this matters:** The shopping list is the primary work area, not
complementary content. Screen-reader landmark navigation identifies it as a
complementary landmark inside `main`, which is an invalid landmark hierarchy
and makes the page structure less dependable.

**Concrete fix:** Change that element to `<section class="cart-plane"
aria-labelledby="cart-title">` (and its closing tag), retaining the existing
heading. Add an Axe regression that requires zero violations on `/` and
`/?demo=1`, rather than only zero serious/critical violations.

## Copy audit

Counts treat a hyphenated term and `US$12` as one word. Navigation, headings,
controls, labels, and footer text are included because a first-time visitor or
screen-reader user encounters them; command examples are excluded. No landing
or README copy finding was found: all sentences are at most 22 words, use
consistent recipe/shopping-list/cart terms, and the actions name their result.
The rows below list every current sentence or standalone interface text.

### Landing page

| Area | Text (word count) |
| --- | --- |
| Header | `Skip to main content` (4); `Batch Cart` (2); `Demo` (1); `Cart` (1, desktop); `Privacy` (1) |
| Hero | `Scale recipes for a dinner or event` (7); `Combine recipes into one shopping list` (6); `For home cooks planning several dishes who need one list when serving counts change.` (14) |
| Hero actions and facts | `Try it with sample data` (5); `Open your cart` (3); `The demo opens three recipes with a ready shopping list.` (10); `Works offline after your first visit` (6); `Recipes stay in this browser` (5); `Full cart free · Plus is US$12 once` (7) |
| Hero caption | `Several recipes.` (2); `One shopping list.` (3) |
| Empty workspace | `Live calculation` (2); `Add recipes and see one shopping list` (7); `Change any serving count.` (4); `Matching amounts combine.` (3); `Combined result` (2); `Shopping list 0` (3); `Combined ingredients will appear here.` (5); `Add a recipe to start the calculation.` (7) |
| Empty workspace controls | `Print list` (2); `Share list` (2); `Export data` (2); `Import data` (2); `Recipes 0` (2); `Add recipe` (2); `Your recipes will stack here` (5); `Add a recipe, then paste its ingredients one per line.` (9); `Add your first recipe` (4) |
| Saved-plan preview | `Batch Cart Plus` (3); `Keep plans for repeat events` (5); `Save named copies of this cart and restore them later.` (10); `View Plus plans` (3) |
| How it works | `Three clear steps` (3); `How Batch Cart builds the shopping list` (7); `Paste each recipe` (3); `Enter one ingredient per line with its quantity.` (8); `Set every serving count` (4); `Batch Cart scales each recipe from its original yield.` (9); `Check one combined list` (5); `Matching weights and volumes merge.` (5); `Uncertain conversions stay visible.` (4) |
| Limits | `Recipe and privacy limits` (4); `A calculator, not a recipe service` (6); `Batch Cart does not scrape recipe sites.` (7); `Your recipes stay in this browser.` (5); `Export a copy whenever you want.` (6); `It converts units using fixed standard measures.` (7); `Mixed units are marked for your review.` (7) |
| Plus | `Optional one-time license` (3); `Save repeat plans with Plus` (5); `US$12 once` (2); `Keep named event plans and restore them for the next gathering.` (11); `The full calculator, print, share, and export tools remain free.` (10); `Buy Batch Cart Plus` (4); `Sociobot opens its hosted checkout.` (5); `Have a license?` (3); `License token` (2); `Restore purchase` (2); `The free cart has no time limit.` (7) |
| Footer | `One list from every recipe.` (5); `Privacy` (1); `Terms` (1); `Built by Param Factory` (4); `(opens in a new tab)` (5); `v1.0.12` (1) |

The hero image has useful non-text alternative text: “Glass recipe sheets and
ingredients converge into one illuminated tray.”

### README

| Section | Text (word count) |
| --- | --- |
| Title and introduction | `Batch Cart` (2); `Combine scaled recipes into one shopping list.` (7); `Batch Cart is for households and event cooks planning several dishes at once.` (13); `Paste ingredients, set the original and target servings for each recipe, and use one combined cart at the store.` (18); `Live product` (2); `One-click demo` (2) |
| What Batch Cart does | `What Batch Cart does` (4); `Scales each recipe from its original serving count.` (8); `Adds amounts when their units can be converted.` (8); `Keeps incompatible units separate and marks them for review.` (9); `Moves checked pantry items out of the shopping list.` (9); `Prints, shares, imports, and exports the active cart.` (8); `Works offline after the first connected visit.` (7); `Keeps recipe data in this browser.` (6); `It is not sent to a server.` (7) |
| Demo | `The demo opens three recipes with a ready shopping list.` (10); `Use Reset demo to restore them.` (6); `Use Start for real to discard the sample and return to your cart.` (14) |
| Price and license | `Free cart and Batch Cart Plus` (6); `The active cart, serving controls, pantry checks, print, share, import, and export stay free.` (14); `Batch Cart Plus is US$12 once and adds named plan snapshots for repeat events.` (14); `Payment uses the Sociobot hosted checkout.` (6); `Batch Cart stores a returned license in this browser and verifies a stored license at most once per day.` (19) |
| Development | `Develop` (1); `Requires Node.js 20 or newer.` (6); `Open localhost:5173.` (2); `The demo is at localhost:5173/?demo=1.` (5) |
| Verification | `Test and build` (3); `npm test runs parser unit tests and Chromium browser tests.` (9); `Browser tests cover every registered claim, mobile layout, and serious accessibility findings.` (12); `npm run build writes the static site to dist/.` (9); `Run one claim by its ID.` (7) |
| Privacy, deployment, license | `Privacy and data ownership` (4); `The real cart and the sample cart are kept apart.` (9); `Export JSON before clearing browser storage or moving devices.` (11); `See /privacy and /terms in the app.` (7); `Batch Cart uses no analytics, trackers, third-party runtime scripts, or CDN fonts.` (12); `Deploy` (1); `Deploy the contents of dist/ to a static host.` (9); `License` (1); `MIT.` (1); `See LICENSE.` (2) |

Claim-like copy maps to a declared claim and tagged observable test: scaling,
conversion review, fixed measures, pantry behavior, import/export, print/share,
offline, local privacy, no scraping, demo seed/reset/isolation/deletion, free
core, snapshots, hosted checkout, and license behavior. No unlisted claim was
found.

## Demo, sandbox, privacy, and claims

- The first-screen `Try it with sample data` opens `/?demo=1` in one click.
  At 390 × 844 it immediately shows the persistent “Demo — sample data,
  nothing is saved” banner, Reset demo, Start for real, a 12-item shopping
  list, and visible realistic rows (`160 g butter`, `1.2 kg cherry tomatoes`).
- Reset demo is present and the exact `demo-seed-reset` test changes then
  restores all three named sample recipes. Start for real removed
  `demo:batch-cart`, created only the real `batch-cart` namespace, and showed
  zero recipes in the real cart in a fresh production context.
- During the complete direct-demo and exit flow, request logging saw only
  `https://batch-cart.sociobot.in`. The privacy and runtime claims separately
  cover the stricter recorded-request cases; no third-party runtime request,
  analytics request, or CDN-font request was observed.
- From a clean clone at `/tmp/batch-cart-review-8-xMaFKf/repo`, every one of
  the 24 exact commands in `.factory/claims.json` completed successfully.
  Source parity also confirms 24 claim IDs and exactly one `@claim:<id>` test
  for each ID.
- The clean clone passed `npm test` (13 unit and 51 Playwright tests),
  `npm run build` (with `dist/index.html`), and `git diff --check`.

## Earlier findings — live and code confirmation

| Earlier finding | Verification this round |
| --- | --- |
| F-1-1 | Fixed: direct mobile demo shows populated calculated rows, banner, Reset, and Start for real before scrolling. |
| F-1-2 | Fixed: desktop demo has calculated rows and source recipe controls together in the first workspace view. |
| F-1-3 | Fixed: unsupported README assertions remain absent; returned-license storage has one declared claim/test. |
| F-1-4 | Fixed: home, demo, Privacy, Terms, and HTTP 404 each have route-specific title, description, canonical, OG, Twitter, favicon, and Apple-touch metadata. |
| F-1-5 | Fixed: reviewed jargon, ambiguous actions, and product/payment wording remain replaced with plain result-naming copy. |
| F-2-1 (and review-4 reopening) | Fixed: immediate keyboard shell, skip link, and stable main landmark are in the static shell; clean 51-browser suite passes. |
| F-2-2 | Fixed: the unbounded word “accurate” remains absent from visitor-facing copy. |
| F-2-3 | Fixed: `demo-seed-reset` declares and proves the three-recipe seed and reset. |
| F-2-4 | Fixed: `editable-totals` proves edited quantity, unit, and ingredient survive reload/export. |
| F-2-5 | Fixed: untested receipt language remains absent; checkout wording maps to `hosted-checkout`. |
| F-2-6 | Fixed: `license-revocation` removes Plus while retaining the free cart. |
| F-2-7 | Fixed: terms contain product-owned support/purchase wording and all legal links return successfully. |
| F-2-8 | Fixed: `free-core` exercises pantry behavior with all named free controls. |
| F-2-9 | Fixed: `local-data-deletion` covers both data namespaces, plans, and license keys. |
| F-2-10 | Fixed: home action explanation and all three facts fit both reviewed first screens. |
| F-2-11 | Fixed: `/missing-page` is a designed HTTP 404 with shared header/footer and return action. |
| F-2-12 | Fixed: fixed-standard-measures wording is plain and exact conversion coverage remains. |
| F-2-13 | Fixed: README headings stand alone. |
| F-3-1 | Fixed: live SPA navigation focuses the new h1 and announces the new route title; Back restores home focus/announcement. |
| F-5-1 | Fixed: both not-found paths name `Page not found` without metaphor. |
| F-5-2 | Fixed: the landing limit section uses the factual `Recipe and privacy limits` label. |
| F-6-1 | Fixed: `demo-deletion` tests Privacy, Cart, wordmark, Back, hard non-demo load, and Start for real. |
| F-6-2 | Fixed: desktop first view presents readable calculated values and source controls. |
| F-6-3 | Fixed: export/import/free-core assert pantry and override outcomes, not button presence. |
| F-6-4 | Fixed: prior absolute/timing statements remain absent. |
| F-6-5 | Fixed: `Open your cart` names the returning-user result and README accurately describes Start for real. |
| F-6-6 | Fixed: `How Batch Cart builds the shopping list` and `How demo data is stored` are concrete headings. |
| F-7-1 | Fixed: the unlisted `Generated artwork` footer assertion remains absent. |

## Structure, links, and visual check

The home page has one h1, one main landmark, visible focus styles, skip link,
responsive 44px-scale actions, and a distinct aubergine/ivory/lime glass-pane
identity rather than a generic SaaS template. The 404 returns HTTP 404 with a
way home. `/`, `/?demo=1`, `/privacy`, `/terms`, the product wordmark, and
the external Param Factory link returned 200; checkout returned the expected
303 to Sociobot/Dodo; hash links are in-page targets. `robots.txt`, sitemap,
manifest, and security headers are present. Deep navigation and browser Back
focus the destination h1 and update the polite live region.

An independent Axe scan found no violations on Privacy, Terms, or 404. Home
and demo have only F-8-1. The product already provides the valuable implied
capabilities from the brief—local recipes, serving scaling, unit-aware list,
pantry exclusion, print/share, and JSON import/export. The deterministic job
does not require an AI-assisted feature, and no runtime provider key or
decorative AI feature was found.

## What would make this perfect

Use a `section` for the primary shopping-list work surface and make Axe report
zero violations on every route. Re-run the clean-clone claim commands, full
test suite, and live mobile demo check after that semantic repair.
