# Adversarial first-read review 9 — FAIL

Reviewed 2026-08-29 against <https://batch-cart.sociobot.in> and commit
`ef5da26f05ad3c5a871db0538551cb89d84af8d5`. The live HTML, application
JavaScript, and CSS are byte-identical to a fresh build of this commit.

## Verdict

**FAIL.** The first screen, one-click sample cart, sandbox isolation, offline
behavior, routes, visual identity, accessibility scans, clean suite, build, and
all 24 declared commands work. Acceptance still fails because one tagged claim
test does not perform the interaction it promises, the footer makes an
unlisted absolute claim, and one landing label uses a subjective marketing
adjective. PASS requires zero findings and no untested claim.

## Findings

### F-9-1 — BLOCKING — the aggregation claim test never changes servings

**Location/quote:** `.factory/claims.json` says, “Changing servings scales and
combines matching ingredient amounts.” The exact tagged test at
`tests/e2e/claims.spec.ts:3` only opens `/demo` and asserts the pre-seeded value
`1.2 kg` for cherry tomatoes. It never edits either **Cook for** control.

**Why this fails:** The declared command passes even if serving-control changes
stop recalculating the cart. The separate untagged fractional-serving test does
exercise a change, but it is not run by
`npm run test:e2e -- --grep @claim:scaled-aggregation`. The claims contract
requires the registered command itself to assert the promised observable
outcome. A manual live check confirmed the product currently works: changing
the first recipe from 6 to 8 servings changed tomatoes from `1.2 kg` to
`1.45 kg`. The defect is claim coverage, not current calculation behavior.

**Concrete fix:** In `@claim:scaled-aggregation`, record `1.2 kg`, change the
first **Cook for** value from 6 to 8, blur the field, and assert `1.45 kg` plus
the two contributing recipe sources. Keep that interaction inside the one
tagged test.

### F-9-2 — BLOCKING — the footer contains an unlisted absolute claim

**Location/quote:** landing footer: “One list from every recipe.” No
`.factory/claims.json` entry lists this footer location or promises support for
“every recipe.”

**Why this misleads:** “Every” is broader than the tested three-recipe sample.
The product requires quantity-led ingredient lines, does not scrape recipe
sites, and can leave incompatible units separate. A first-time visitor can
read the footer as universal recipe-format support. This is an unlisted claim,
which prevents a zero-finding verdict.

**Concrete fix:** Replace it with “One shopping list from your recipes.” This
retains the required footer one-liner without an absolute. Do not add an
unbounded “every recipe” test.

### F-9-3 — MINOR — “clear” is subjective marketing copy

**Location/quote:** landing section label: “Three clear steps”.

**Why this weakens the copy:** The number is useful; “clear” is self-praise
rather than information a visitor can use. Clarity is not an observable
product fact.

**Concrete fix:** Use “Three steps”.

## First read before scrolling

Fresh Chromium contexts opened `/` at 390 × 844 and 1440 × 900 with no stored
state, interaction, or scroll. Both returned 200 without console or page
errors.

| Question | Answer from the first screen | Exact evidence |
| --- | --- | --- |
| What does it do? | Combines recipes into one shopping list. | “Combine recipes into one shopping list” |
| For whom? | Home cooks preparing several dishes whose serving counts change. | “For home cooks planning several dishes who need one list when serving counts change.” |
| What should I click first? | **Try it with sample data**. | The named action is followed by “The demo opens three recipes with a ready shopping list.” |

The mandatory first-read gate passes. On mobile, the primary action ends at
y=457, its explanation ends at y=525, and all three facts end at y=591. On
desktop, all support copy ends at y=835 of 900.

## Copy audit

Counts use whitespace-separated words; decorative separators do not count.
Hyphenated terms, prices, versions, URLs, and code tokens count as one word.
Headings, controls, navigation, and image alternatives are included because
they are encountered independently. No sentence exceeds 22 words and no
banned word appears. Flags are F-9-2 and F-9-3.

### Landing page

| Area | Exact copy | Words | Result |
| --- | --- | ---: | --- |
| Shell | Loading Batch Cart… | 3 | pass |
| Header | Skip to main content | 4 | pass |
| Header | Batch Cart | 2 | pass |
| Header | Demo | 1 | pass |
| Header | Cart | 1 | pass |
| Header | Privacy | 1 | pass |
| Hero | Scale recipes for a dinner or event | 7 | pass |
| Hero | Combine recipes into one shopping list | 6 | pass |
| Hero | For home cooks planning several dishes who need one list when serving counts change. | 14 | pass |
| Hero action | Try it with sample data | 5 | pass: result-naming verb |
| Hero action | Open your cart | 3 | pass: result-naming verb |
| Hero | The demo opens three recipes with a ready shopping list. | 10 | pass: `demo-seed-reset` |
| Hero fact | Works offline after your first visit | 6 | pass: `offline-reload` |
| Hero fact | Recipes stay in this browser | 5 | pass: `local-privacy` |
| Hero fact | Full cart free · Plus is US$12 once | 7 | pass: `free-core`, `hosted-checkout` |
| Image alt | Glass recipe sheets and ingredients converge into one illuminated tray. | 10 | pass |
| Image caption | Several recipes. | 2 | pass |
| Image caption | One shopping list. | 3 | pass |
| Workspace | Live calculation | 2 | pass |
| Workspace | Add recipes and see one shopping list | 7 | pass |
| Workspace | Change any serving count. | 4 | claim test incomplete: F-9-1 |
| Workspace | Matching amounts combine. | 3 | claim test incomplete: F-9-1 |
| Cart | Combined result | 2 | pass |
| Cart | Shopping list 0 | 3 | pass: dynamic count |
| Cart | Combined ingredients will appear here. | 5 | pass |
| Cart | Add a recipe to start the calculation. | 7 | pass |
| Cart action | Print list | 2 | pass: result-naming verb |
| Cart action | Share list | 2 | pass: result-naming verb |
| Cart action | Export data | 2 | pass: result-naming verb |
| Cart action | Import data | 2 | pass: result-naming verb |
| Recipes | Recipes 0 | 2 | pass: dynamic count |
| Recipe action | Add recipe | 2 | pass: result-naming verb |
| Empty state | Your recipes will stack here | 5 | pass |
| Empty state | Add a recipe, then paste its ingredients one per line. | 10 | pass |
| Empty-state action | Add your first recipe | 4 | pass: result-naming verb |
| Workspace | Batch Cart Plus | 3 | pass |
| Workspace | Keep plans for repeat events | 5 | pass |
| Workspace | Save named copies of this cart and restore them later. | 10 | pass: `plus-snapshots` |
| Workspace action | View Plus plans | 3 | pass: result-naming verb |
| How it works | Three clear steps | 3 | **flag F-9-3** → “Three steps” |
| How it works | How Batch Cart builds the shopping list | 7 | pass |
| Step 1 | Paste each recipe | 3 | pass |
| Step 1 | Enter one ingredient per line with its quantity. | 8 | pass |
| Step 2 | Set every serving count | 4 | pass |
| Step 2 | Batch Cart scales each recipe from its original yield. | 9 | claim test incomplete: F-9-1 |
| Step 3 | Check one combined list | 4 | pass |
| Step 3 | Matching weights and volumes merge. | 5 | pass: aggregation and fixed-measure claims |
| Step 3 | Uncertain conversions stay visible. | 4 | pass: `uncertain-conversions` |
| Limits | Recipe and privacy limits | 4 | pass |
| Limits | A calculator, not a recipe service | 6 | pass |
| Limits | Batch Cart does not scrape recipe sites. | 7 | pass: `no-recipe-scraping` |
| Limits | Your recipes stay in this browser. | 6 | pass: `local-privacy` |
| Limits | Export a copy whenever you want. | 6 | pass: `data-export` |
| Limits | It converts units using fixed standard measures. | 7 | pass: `fixed-measures` |
| Limits | Mixed units are marked for your review. | 7 | pass: `uncertain-conversions` |
| Plus | Optional one-time license | 3 | pass |
| Plus | Save repeat plans with Plus | 5 | pass |
| Plus | US$12 once | 2 | pass: `hosted-checkout` |
| Plus | Keep named event plans and restore them for the next gathering. | 11 | pass: `plus-snapshots` |
| Plus | The full calculator, print, share, and export tools remain free. | 10 | pass: `free-core` |
| Plus action | Buy Batch Cart Plus | 4 | pass: result-naming verb |
| Plus | Sociobot opens its hosted checkout. | 5 | pass: `hosted-checkout` |
| Plus | Have a license? | 3 | pass |
| Plus field | License token | 2 | pass |
| Plus action | Restore purchase | 2 | pass: result-naming verb |
| Plus | The free cart has no time limit. | 7 | pass: `free-core` |
| Footer | One list from every recipe. | 5 | **flag F-9-2** → “One shopping list from your recipes.” |
| Footer | Privacy | 1 | pass |
| Footer | Terms | 1 | pass |
| Footer | Built by Param Factory | 4 | pass |
| Footer | (opens in a new tab) | 5 | pass |
| Footer | v1.0.13 | 1 | pass |

The populated cart additionally says “Edit any total.” (3 words) and “Tick
items you already have.” (5 words); these map to `editable-totals` and
`pantry-exclusion`.

### README

| Area | Exact copy | Words | Result |
| --- | --- | ---: | --- |
| Title | Batch Cart | 2 | pass |
| Introduction | Combine scaled recipes into one shopping list. | 7 | claim test incomplete: F-9-1 |
| Introduction | Batch Cart is for households and event cooks planning several dishes at once. | 13 | pass |
| Introduction | Paste ingredients, set the original and target servings for each recipe, and use one combined cart at the store. | 19 | pass |
| Link label | Live product | 2 | pass |
| Link label | One-click demo | 2 | pass |
| Heading | What Batch Cart does | 4 | pass |
| Feature | Scales each recipe from its original serving count. | 8 | claim test incomplete: F-9-1 |
| Feature | Adds amounts when their units can be converted. | 8 | pass: aggregation and fixed-measure claims |
| Feature | Keeps incompatible units separate and marks them for review. | 9 | pass: `uncertain-conversions` |
| Feature | Moves checked pantry items out of the shopping list. | 9 | pass: `pantry-exclusion` |
| Feature | Prints, shares, imports, and exports the active cart. | 8 | pass: four registered claims |
| Feature | Works offline after the first connected visit. | 7 | pass: `offline-reload` |
| Feature | Keeps recipe data in this browser. | 6 | pass: `local-privacy` |
| Feature | It is not sent to a server. | 7 | pass: `local-privacy` |
| Demo | The demo opens three recipes with a ready shopping list. | 10 | pass: `demo-seed-reset` |
| Demo | Use Reset demo to restore them. | 6 | pass: `demo-seed-reset` |
| Demo | Use Start for real to discard the sample and return to your cart. | 13 | pass: demo isolation/deletion |
| Heading | Free cart and Batch Cart Plus | 6 | pass |
| Price | The active cart, serving controls, pantry checks, print, share, import, and export stay free. | 14 | pass: `free-core` |
| Price | Batch Cart Plus is US$12 once and adds named plan snapshots for repeat events. | 14 | pass: checkout/snapshot claims |
| Price | Payment uses the Sociobot hosted checkout. | 6 | pass: `hosted-checkout` |
| License | Batch Cart stores a returned license in this browser and verifies a stored license at most once per day. | 19 | pass: returned-license/daily claims |
| Heading | Develop | 1 | pass |
| Development | Requires Node.js 20 or newer. | 5 | pass |
| Development | Open http://localhost:5173. | 2 | pass |
| Development | The demo is at http://localhost:5173/?demo=1. | 5 | pass |
| Heading | Test and build | 3 | pass |
| Verification | npm test runs parser unit tests and Chromium browser tests. | 10 | pass |
| Verification | Browser tests cover every registered claim, mobile layout, and accessibility violations. | 11 | **flag through F-9-1:** the tagged aggregation path is incomplete |
| Verification | npm run build writes the static site to dist/. | 9 | pass |
| Verification | Run one claim by its ID. | 6 | pass |
| Heading | Privacy and data ownership | 4 | pass |
| Privacy | The real cart and the sample cart are kept apart. | 10 | pass: `demo-isolation` |
| Privacy | Export JSON before clearing browser storage or moving devices. | 9 | pass |
| Privacy | See /privacy and /terms in the app. | 7 | pass |
| Privacy | Batch Cart uses no analytics, trackers, third-party runtime scripts, or CDN fonts. | 12 | pass: `private-runtime` |
| Heading | Deploy | 1 | pass |
| Deployment | Deploy the contents of dist/ to a static host. | 9 | pass |
| Heading | License | 1 | pass |
| License | MIT. | 1 | pass |
| License | See LICENSE. | 2 | pass |

Terminology is otherwise consistent: `recipe`, `shopping list`, `cart`,
`pantry item`, `Recipe serves`, `Cook for`, `saved plan`, `Batch Cart Plus`,
`demo`, and `license` each retain one meaning. The 64-character catalog line,
“Combine recipes into one shopping list as serving counts change,” is
verb-first and contains no marketing word.

## Demo, sandbox, privacy, and offline behavior

- The home action opened `/?demo=1` in one click.
- At 390 × 844, the persistent “Demo — sample data, nothing is saved” banner,
  **Reset demo**, **Start for real**, and two complete populated rows were
  visible without scrolling: `160 g butter` and `1.2 kg cherry tomatoes`.
- At 1440 × 900, readable recipe controls and populated cart values were both
  in the first viewport.
- A fresh direct-demo context contained only `demo:batch-cart`. Its full
  request log used only `https://batch-cart.sociobot.in`.
- Reset restored Lemony tomato pasta, Herb market salad, and Garlic bread.
- A real recipe named `Private family pie` survived a demo edit and **Start for
  real**. The demo database was deleted and `Demo-only stew` did not enter the
  real cart.
- After service-worker control, an offline reload returned 200 with the demo
  heading and all three sample recipes.

The demo gate passes.

## Claims and quality gates

I cloned the repository to `/tmp/batch-cart-review9-clean-lpOP12/repo`, ran
`npm ci`, and invoked every exact `test` command from `.factory/claims.json`
independently. All 24 commands exited zero:

| Claim ID | Command result | Independent assessment |
| --- | --- | --- |
| `scaled-aggregation` | PASS | Tagged path is incomplete: F-9-1 |
| `uncertain-conversions` | PASS | covered |
| `fixed-measures` | PASS | covered |
| `pantry-exclusion` | PASS | covered through reload |
| `data-export` | PASS | recipes, pantry, and override covered |
| `data-import` | PASS | recipe, pantry, and override covered |
| `list-sharing` | PASS | calculated text asserted |
| `list-printing` | PASS | print call asserted |
| `demo-isolation` | PASS | manual pre-existing-real-data check also passed |
| `demo-deletion` | PASS | all ordinary exits covered |
| `demo-seed-reset` | PASS | three names, rows, and Reset covered |
| `editable-totals` | PASS | edit, reload, and export covered |
| `local-privacy` | PASS | edit request log covered |
| `private-runtime` | PASS | initial request log covered |
| `license-verification-daily` | PASS | same-day reload covered |
| `license-token-only` | PASS | exact URL and empty body covered |
| `license-revocation` | PASS | Plus removal and free controls covered |
| `returned-license-storage` | PASS | returned token storage covered |
| `no-recipe-scraping` | PASS | URL text and request log covered |
| `offline-reload` | PASS | service-worker offline reload covered |
| `plus-snapshots` | PASS | save and restore covered |
| `free-core` | PASS | every named control exercised after ten years |
| `local-data-deletion` | PASS | both databases, plans, and license keys covered |
| `hosted-checkout` | PASS | price, 303, and Dodo destination covered |

Registry parity is 24 unique IDs and 24 unique tags. F-9-2 is an unlisted
claim; F-9-1 means one listed claim remains incompletely tested despite its
zero exit status.

The same clean clone passed `npm test` (13 unit and 51 Chromium tests) and
`npm run build`; `dist/index.html` exists. Initial application JavaScript is
31.12 kB raw / 10.49 kB gzip, and CSS is 20.33 kB raw / 5.34 kB gzip. The
public-origin suite passed 51/51. The factory URL verifier passed home and demo
with one h1, one main, complete alternatives/labels, and no console or page
errors.

## Earlier findings checked live and in code

| Earlier ID | Current verification |
| --- | --- |
| F-1-1 | Fixed: populated demo rows, banner, Reset, and Start for real are in the first phone viewport. |
| F-1-2 | Fixed: source recipes and calculated rows share the desktop first view. |
| F-1-3 | Fixed: returned-license storage is registered; unsupported secret/build claims remain absent. |
| F-1-4 | Fixed: every route and static 404 has route-specific sharing metadata. |
| F-1-5 | Fixed: the earlier recipe, workspace, payment, and Plus jargon remains absent. |
| F-2-1 | Fixed, including review 4: the static keyboard shell precedes JavaScript; immediate Tab reaches the skip link. |
| F-2-2 | Fixed: “accurate” remains absent from visitor copy. |
| F-2-3 | Fixed: the three-recipe seed and Reset have registered coverage. |
| F-2-4 | Fixed: edited totals persist through reload/export. |
| F-2-5 | Fixed: unsupported receipt wording remains absent. |
| F-2-6 | Fixed: revocation removes Plus while leaving the free cart. |
| F-2-7 | Fixed: unsupported refund/third-party terms wording remains absent. |
| F-2-8 | Fixed: the future-clock free-core path includes pantry checks and every named control. |
| F-2-9 | Fixed: confirmed deletion removes both databases, plans, and license keys. |
| F-2-10 | Fixed: action explanation and three facts fit both first screens. |
| F-2-11 | Fixed: the static 404 has shared chrome, metadata, return action, and HTTP 404. |
| F-2-12 | Fixed: fixed-standard-measures wording is plain and tested. |
| F-2-13 | Fixed: README feature and paid-tier headings stand alone. |
| F-3-1 | Fixed: client routes and Back focus the h1 and announce the new title. |
| F-5-1 | Fixed: static and SPA 404 headings say “Page not found” without metaphor. |
| F-5-2 | Fixed: the limits section uses a factual label. |
| F-6-1 | Fixed: Privacy, Cart, wordmark, Back, hard exit, and Start for real delete demo data. |
| F-6-2 | Fixed: readable source and result values appear in the desktop first view. |
| F-6-3 | Fixed: import/export cover cart choices and free-core operates every named control. |
| F-6-4 | Fixed as scoped: the earlier “correct/every” and timing wording remains absent. F-9-1 is a distinct test-path gap. |
| F-6-5 | Fixed: “Open your cart” and the README describe returning real data correctly. |
| F-6-6 | Fixed: shopping-list and demo-storage headings are concrete. |
| F-7-1 | Fixed: “Generated artwork” remains absent from visitor footers. |
| F-8-1 | Fixed: the shopping list is a labelled `section`; live Axe finds zero violations. |

No earlier ID is reopened.

## Structure, links, accessibility, and visual identity

- `/`, `/?demo=1`, `/demo`, `/privacy`, and `/terms` return 200;
  `/missing-page` returns the designed 404. The intentional 404 response emits
  Chromium's normal failed-resource line, but no application exception.
- Titles are 17–51 characters and follow the route pattern: home is
  `Batch Cart — combine recipes into one shopping list`; Demo, Privacy, Terms,
  and 404 use route-specific titles.
- Every route has one h1, one main, `lang=en`, a description under 155
  characters, canonical, Open Graph/Twitter data, favicon, Apple-touch icon,
  and consistent header/footer. The social image is 1200 × 630.
- `robots.txt`, `sitemap.xml`, the manifest, response-header CSP,
  `frame-ancestors`, nosniff, Referrer-Policy, and Permissions-Policy are live.
- The link crawl found no dead destination. Internal/product/legal links and
  Param Factory return 200; checkout returns 303 to the Dodo hosted session;
  `mailto:` links are explicit. Same-document skip links remain on their
  current route, including the 404.
- Live Back navigation focuses and announces the destination h1. Focus rings,
  44px targets, 390px overflow, 200% text, reduced motion, and zero-violation
  Axe scans pass.
- The aubergine field, lime cart plane, clipped translucent recipe panes,
  Fraunces/Atkinson pairing, and original culinary measurement art match
  `.factory/design.md`. The result is distinct from a generic SaaS template.

## Missed leverage

No additional AI step is implied. Recipe scaling and unit aggregation are
deterministic, and remote model use would weaken the local-first privacy model.
The expected adjacent capabilities—JSON import/export, print/share, pantry
exclusion, offline use, and optional saved-plan snapshots—are present. No
provider key, decorative AI feature, or unexplained model request exists.

## What would make this perfect

Make the tagged aggregation claim test perform and verify a serving change,
replace the absolute footer line with “One shopping list from your recipes,”
and shorten “Three clear steps” to “Three steps.” Then rerun all 24 exact claim
commands, `npm test`, `npm run build`, the live request/offline checks, both
first-view checks, route crawl, and Axe suite. Nothing else was found.
