# Adversarial first-read review 7 — FAIL

Reviewed 2026-08-29 against <https://batch-cart.sociobot.in> and clean clone `520d6873681bc9e8bc4a8b332748edc68fc1e2d1`.

## Verdict

**FAIL.** The cold first read, demo, declared claims, routes, accessibility checks, and prior repairs are confirmed. One visible landing-page claim is not in `.factory/claims.json`, so the claims contract has not reached zero findings.

## First read before scrolling

Fresh Chromium contexts opened `/` at 390 × 844 and 1440 × 900. Neither session logged a page or console error.

| Question | Answer from the first screen | Exact evidence |
| --- | --- | --- |
| What does it do? | Combines recipes into one shopping list. | “Combine recipes into one shopping list” |
| For whom? | Home cooks making several dishes whose serving counts change. | “For home cooks planning several dishes who need one list when serving counts change.” |
| What should I click first? | **Try it with sample data**. | The named primary action is visible with “The demo opens three recipes with a ready shopping list.” |

This mandatory gate passes. On the 390 px view, the action explanation and all three facts are visible before the fold. The dark aubergine, lime, apricot, clipped glass planes, self-hosted type, and original food-measurement art are a distinct product-specific identity, not a generic SaaS template.

## Findings

### F-7-1 — BLOCKING — the footer makes an unlisted provenance claim

**Location/quote:** live landing-page footer and `index.html`: “v1.0.12 · Generated artwork”. The same statement is on the static 404 footer. `.factory/claims.json` has 24 entries, none for generated-art provenance.

**Why this fails:** “Generated artwork” is a visitor-facing assertion about the origin of a shipped asset. It is not a version label or decorative separator. The claims rule requires every claim-like landing or README statement to have a registry entry and observable sandbox test, or to be removed. The existing unit assertion only confirms that this text exists; it is not a registered claim test and cannot establish provenance.

**Concrete fix:** remove “Generated artwork” from both footers, leaving `v1.0.12`. Keep the required provenance record in `.factory/design.md`. Do not add a token test that only searches for the phrase; a runtime sandbox cannot establish how the artwork was made.

## Copy audit

Counts treat `US$12` and hyphenated terms as one word. Controls and headings are included because a first-time visitor and screen-reader user encounters them independently. No entry exceeds 22 words, uses a banned marketing adjective, has a non-result-naming button, or requires a terminology rewrite. The sole flagged entry is F-7-1.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Scale recipes for a dinner or event | 7 | pass |
| Combine recipes into one shopping list | 6 | pass |
| For home cooks planning several dishes who need one list when serving counts change. | 14 | pass |
| Try it with sample data | 5 | pass |
| Open your cart | 3 | pass |
| The demo opens three recipes with a ready shopping list. | 10 | pass |
| Works offline after your first visit | 6 | registered `offline-reload` |
| Recipes stay in this browser | 5 | registered `local-privacy` |
| Full cart free · Plus is US$12 once | 7 | registered `free-core`, `hosted-checkout` |
| Several recipes. / One shopping list. | 2 / 3 | pass; informative art caption |
| Live calculation | 2 | pass |
| Add recipes and see one shopping list | 7 | pass |
| Change any serving count. / Matching amounts combine. | 4 / 3 | registered `scaled-aggregation` |
| Combined result / Shopping list | 2 / 2 | pass |
| Combined ingredients will appear here. / Add a recipe to start the calculation. | 5 / 7 | pass |
| Print list / Share list / Export data / Import data | 2 / 2 / 2 / 2 | result-naming verbs; registered |
| Recipes / Add recipe | 1 / 2 | pass |
| Your recipes will stack here / Add a recipe, then paste its ingredients one per line. / Add your first recipe | 5 / 10 / 4 | pass |
| Batch Cart Plus / Keep plans for repeat events / Save named copies of this cart and restore them later. / View Plus plans | 3 / 5 / 10 / 3 | registered `plus-snapshots` |
| Three clear steps / How Batch Cart builds the shopping list | 3 / 7 | pass |
| Paste each recipe / Enter one ingredient per line with its quantity. | 3 / 8 | pass |
| Set every serving count / Batch Cart scales each recipe from its original yield. | 4 / 9 | registered `scaled-aggregation` |
| Check one combined list / Matching weights and volumes merge. / Uncertain conversions stay visible. | 4 / 5 / 4 | registered `scaled-aggregation`, `uncertain-conversions` |
| Recipe and privacy limits / A calculator, not a recipe service | 4 / 6 | pass |
| Batch Cart does not scrape recipe sites. | 7 | registered `no-recipe-scraping` |
| Your recipes stay in this browser. / Export a copy whenever you want. | 6 / 6 | registered `local-privacy`, `data-export` |
| It converts units using fixed standard measures. / Mixed units are marked for your review. | 7 / 7 | registered `fixed-measures`, `uncertain-conversions` |
| Optional one-time license / Save repeat plans with Plus / US$12 once | 3 / 5 / 2 | registered `plus-snapshots`, `hosted-checkout` |
| Keep named event plans and restore them for the next gathering. / The full calculator, print, share, and export tools remain free. | 11 / 10 | registered `plus-snapshots`, `free-core` |
| Buy Batch Cart Plus / Sociobot opens its hosted checkout. | 4 / 5 | registered `hosted-checkout` |
| Have a license? / Restore purchase / The free cart has no time limit. | 3 / 2 / 7 | registered `free-core` |
| One list from every recipe. | 5 | pass |
| Generated artwork | 2 | **flag: F-7-1, unlisted claim** |

Navigation labels `Batch Cart`, `Demo`, `Cart`, `Privacy`, `Terms`, and `Built by Param Factory (opens in a new tab)` are clear route or destination labels. The mobile header intentionally omits `Cart` to remain within the 390 px width; the visible home action still names that result.

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Combine scaled recipes into one shopping list. | 7 | registered `scaled-aggregation` |
| Batch Cart is for households and event cooks planning several dishes at once. | 13 | pass |
| Paste ingredients, set the original and target servings for each recipe, and use one combined cart at the store. | 19 | supported by the tested recipe and aggregation flow |
| What Batch Cart does | 4 | standalone heading |
| Scales each recipe from its original serving count. | 8 | registered `scaled-aggregation` |
| Adds amounts when their units can be converted. | 8 | registered `scaled-aggregation`, `fixed-measures` |
| Keeps incompatible units separate and marks them for review. | 9 | registered `uncertain-conversions` |
| Moves checked pantry items out of the shopping list. | 9 | registered `pantry-exclusion` |
| Prints, shares, imports, and exports the active cart. | 8 | registered `list-printing`, `list-sharing`, `data-import`, `data-export` |
| Works offline after the first connected visit. | 7 | registered `offline-reload` |
| Keeps recipe data in this browser. / It is not sent to a server. | 6 / 7 | registered `local-privacy` |
| The demo opens three recipes with a ready shopping list. / Use Reset demo to restore them. | 10 / 6 | registered `demo-seed-reset` |
| Use Start for real to discard the sample and return to your cart. | 13 | registered `demo-isolation`, `demo-deletion` |
| Free cart and Batch Cart Plus | 6 | standalone heading |
| The active cart, serving controls, pantry checks, print, share, import, and export stay free. | 14 | registered `free-core` |
| Batch Cart Plus is US$12 once and adds named plan snapshots for repeat events. | 14 | registered `hosted-checkout`, `plus-snapshots` |
| Payment uses the Sociobot hosted checkout. | 6 | registered `hosted-checkout` |
| Batch Cart stores a returned license in this browser and verifies a stored license at most once per day. | 19 | registered `returned-license-storage`, `license-verification-daily` |
| Requires Node.js 20 or newer. | 6 | developer prerequisite, not product claim |
| Open localhost:5173. / The demo is at localhost:5173/?demo=1. | 3 / 8 | run instructions |
| npm test runs parser unit tests and Chromium browser tests. | 10 | developer instruction |
| Browser tests cover every registered claim, mobile layout, and serious accessibility findings. | 12 | developer test-suite description |
| npm run build writes the static site to dist/. | 9 | developer instruction |
| Run one claim by its ID. | 6 | developer instruction |
| The real cart and the sample cart are kept apart. | 10 | registered `demo-isolation` |
| Export JSON before clearing browser storage or moving devices. | 9 | registered `data-export` |
| See /privacy and /terms in the app. | 7 | route instruction |
| Batch Cart uses no analytics, trackers, third-party runtime scripts, or CDN fonts. | 12 | registered `private-runtime` |
| Deploy the contents of dist/ to a static host. | 9 | developer instruction |
| MIT. / See LICENSE. | 1 / 2 | license reference |

Headings not repeated above (`Batch Cart`, `Live product`, `One-click demo`, `Develop`, `Test and build`, `Privacy and data ownership`, `Deploy`, and `License`) are labels rather than sentences; all name their section or destination without jargon. README URLs and shell commands are not prose sentences.

## Demo, sandbox, and privacy checks

- Home → **Try it with sample data** opened the shareable `/?demo=1` entry.
- Fresh 390 × 844 demo: the persistent “Demo — sample data, nothing is saved” banner, **Reset demo**, **Start for real**, and three visible calculated shopping-list rows appeared without scrolling. The sample contained 12 realistic rows from Lemony tomato pasta, Herb market salad, and Garlic bread.
- Fresh 1440 × 900 demo: a recipe name, serving controls, and populated cart quantity/name inputs were visible together (cart controls y=616–660; recipe name y=641).
- The live demo cold request log contained only the app origin’s HTML, CSS, JS, fonts, and artwork. Its behavior used no off-origin request. The registered privacy test additionally records the whole edit flow and passed.
- The exact `demo-isolation`, `demo-deletion`, and `demo-seed-reset` commands passed in the clean clone. Their source tests confirm separate `demo:batch-cart` storage, delete it on ordinary exits, and restore the shipped sample on reset.
- The service-worker offline claim, local privacy claim, and no-third-party-runtime claim each passed through their declared clean-context test. There is no runtime AI feature, provider key, or unexplained AI claim. The brief is a deterministic local recipe calculator; an AI step would not be an implied useful core action. Import, export, print, share, pantry handling, and snapshots are present.

## Claims and quality gates

`.factory/claims.json` contains 24 unique IDs. I ran each listed `test` command independently in a fresh remote clone after `npm ci`; all 24 passed. This includes aggregation, conversion/review, pantry, import/export, share/print, demo isolation/deletion/reset, local privacy, private runtime, license flows, no scraping, offline reload, Plus snapshots, free core, deletion, and checkout. The registry’s one-to-one tag check passes (the `returned-license-storage` tag correctly lives in `accessibility.spec.ts`, while the other claim tests are in `claims.spec.ts`).

The same clean clone passed `npm test` (13 unit tests and 51 Chromium tests), `npm run build` (created `dist/index.html`), and `git diff --check`. `npm ci` reported 0 vulnerabilities.

## Earlier findings — live and code confirmation

| Earlier finding | Confirmation in this review |
| --- | --- |
| F-1-1 | Fixed: direct mobile demo shows populated cart rows in the first viewport with the banner and both demo controls. |
| F-1-2 | Fixed: desktop demo keeps readable cart and recipe inputs beside one another in the first viewport. |
| F-1-3 | Fixed: returned-license storage is registered/tested; the former unsupported README claims are absent. |
| F-1-4 | Fixed: home, demo, Privacy, Terms, and 404 each have route-specific title, description, canonical, OG, and Twitter values. |
| F-1-5 | Fixed: recipe, workspace, payment, and Plus language remains plain; actions name their result. |
| F-2-1 (including review 4 reopening) | Fixed: the static keyboard shell is present before app data; the full suite passed with the skip-link regression. |
| F-2-2 | Fixed: unbounded “accurate” is absent from live and README copy. |
| F-2-3 | Fixed: the three-recipe/Reset statement has `demo-seed-reset` coverage. |
| F-2-4 | Fixed: quantity, unit, and ingredient override persistence/export has `editable-totals` coverage. |
| F-2-5 | Fixed: unsupported receipt wording is absent; the remaining checkout statement has `hosted-checkout` coverage. |
| F-2-6 | Fixed: `license-revocation` preserves the free cart while removing Plus. |
| F-2-7 | Fixed: terms retain only product-owned legal/support wording and all legal links work. |
| F-2-8 | Fixed: `free-core` includes pantry behavior with the other named free controls. |
| F-2-9 | Fixed: `local-data-deletion` removes both namespaces, plans, and license keys. |
| F-2-10 | Fixed: the hero support sentence and all three facts fit the reviewed mobile and desktop screens. |
| F-2-11 | Fixed: `/missing-page` is a designed HTTP 404 with standard header/footer and a return link. |
| F-2-12 | Fixed: fixed-standard-measures wording is plain and exact conversion coverage remains. |
| F-2-13 | Fixed: README uses standalone product and paid-tier headings. |
| F-3-1 | Fixed: live SPA navigation focuses the new h1 and announces `Privacy — Batch Cart`; Back returns focus and announces home. |
| F-5-1 | Fixed: static and SPA 404 h1 is `Page not found`, with no metaphor. |
| F-5-2 | Fixed: the factual `Recipe and privacy limits` label remains. |
| F-6-1 | Fixed: demo-deletion coverage exercises Privacy, Cart, wordmark, Back, hard non-demo load, and Start for real. |
| F-6-2 | Fixed: desktop shows both source and calculated sample values before scrolling. |
| F-6-3 | Fixed: export/import/free-core tests assert the named pantry and override behaviors, not merely button presence. |
| F-6-4 | Fixed: the previous absolute/timing copy remains absent. |
| F-6-5 | Fixed: `Open your cart` names the returning-user result and README says Start for real returns to that cart. |
| F-6-6 | Fixed: `How Batch Cart builds the shopping list` and `How demo data is stored` are concrete headings. |

Structural checks also passed: real URLs, history/back behavior, focus restoration, one h1 per route, `<main>`, `lang`, description, canonical, favicon/apple touch icon, social card, robots/sitemap, security headers, route 404, working internal links, mailto links, and consistent header/footer. The application uses a response-header CSP with `frame-ancestors 'none'`; the live initial request log contains only self-hosted assets. The checkout is the only explicit external product link and is covered by its checkout claim test.

## What would make this perfect

Remove the untestable “Generated artwork” footer assertion from `index.html` and `public/404.html`, then rerun the 24 exact claim commands, `npm test`, and `npm run build`. With that claim removed, this review has no remaining finding.
