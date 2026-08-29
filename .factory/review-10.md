# Adversarial first-read review 10 — FAIL

Reviewed 2026-08-29 against <https://batch-cart.sociobot.in> and commit
`01c5c027c11cea4f4e478d7d783dc23d9d3f4129`. The deployed HTML, application
JavaScript, and CSS are byte-identical to a fresh production build of that
commit.

## Verdict

**FAIL.** The cold first screen, one-click demo, sandbox isolation, all 24
registered claims, offline behavior, routes, accessibility, and earlier fixes
verify. One minor terminology error remains in the README. PASS requires zero
findings of any severity.

## Findings

### F-10-1 — MINOR — the README renames the shopping-list output as a cart

**Location/quote:** `README.md`, introduction: “Paste ingredients, set the
original and target servings for each recipe, and use one combined **cart** at
the store.” The product headline, interface, brief, and copy terminology table
call the calculated store-facing result a **shopping list**. “Cart” otherwise
means the complete working data set, as in “active cart” and “return to your
cart.”

**Why this matters:** A first-time reader is given two words for the same
result. “Combined cart” also sounds like a physical or online basket, while
the product creates a list. This violates the plain-words requirement to use
one word for one concept.

**Concrete fix:** Replace the sentence with: “Paste ingredients, set each
recipe’s original and target servings, and use one combined shopping list at
the store.” Then update `.factory/copy-audit.md` and rerun the copy regression.

## First read before scrolling

I opened `/` in separate fresh Chromium contexts at 390 × 844 and 1440 × 900.
I did not scroll or interact before recording these answers. Both requests
returned 200 with `scrollY = 0` and no console or page errors.

| Question | Answer from the first screen | Exact evidence |
| --- | --- | --- |
| What does this do? | It combines recipes into one shopping list. | “Combine recipes into one shopping list” |
| For whom? | Home cooks planning several dishes whose serving counts change. | “For home cooks planning several dishes who need one list when serving counts change.” |
| What should I click first? | **Try it with sample data**. | The named primary action is followed by “The demo opens three recipes with a ready shopping list.” |

The mandatory first-read gate passes at both sizes. On the phone, the primary
action ends at y=457, its explanation ends at y=525, and all three facts end at
y=591. The desktop first screen also contains both actions, the explanation,
and all three facts.

## Copy audit

Counts use whitespace-separated words; decorative separators are not words.
Hyphenated terms, prices, versions, URLs, and code tokens count as one word.
The tables include sentences, headings, actions, labels, navigation, and image
alternatives encountered on the cold landing page. No sentence exceeds 22
words and no banned marketing word appears. F-10-1 is the only copy flag.

### Live landing page

| Area | Exact copy | Words | Result |
| --- | --- | ---: | --- |
| Initial status | Loading Batch Cart… | 3 | pass |
| Header | Skip to main content | 4 | pass |
| Header | Batch Cart | 2 | pass |
| Header | Demo | 1 | pass |
| Header | Cart | 1 | pass |
| Header | Privacy | 1 | pass |
| Hero | Scale recipes for a dinner or event | 7 | pass |
| Hero | Combine recipes into one shopping list | 6 | pass |
| Hero | For home cooks planning several dishes who need one list when serving counts change. | 14 | pass |
| Hero action | Try it with sample data | 5 | pass — result-naming action |
| Hero action | Open your cart | 3 | pass — result-naming action |
| Hero | The demo opens three recipes with a ready shopping list. | 10 | pass |
| Hero fact | Works offline after your first visit | 6 | pass |
| Hero fact | Recipes stay in this browser | 5 | pass |
| Hero fact | Full cart free · Plus is US$12 once | 7 | pass |
| Image alternative | Glass recipe sheets and ingredients converge into one illuminated tray. | 10 | pass |
| Image caption | Several recipes. | 2 | pass |
| Image caption | One shopping list. | 3 | pass |
| Workspace | Live calculation | 2 | pass |
| Workspace | Add recipes and see one shopping list | 7 | pass |
| Workspace | Change any serving count. | 4 | pass |
| Workspace | Matching amounts combine. | 3 | pass |
| Shopping list | Combined result | 2 | pass |
| Shopping list | Shopping list 0 | 3 | pass — dynamic count |
| Empty state | Combined ingredients will appear here. | 5 | pass |
| Empty state | Add a recipe to start the calculation. | 7 | pass |
| Action | Print list | 2 | pass |
| Action | Share list | 2 | pass |
| Action | Export data | 2 | pass |
| Action | Import data | 2 | pass |
| Recipes | Recipes 0 | 2 | pass — dynamic count |
| Action | Add recipe | 2 | pass |
| Empty state | Your recipes will stack here | 5 | pass |
| Empty state | Add a recipe, then paste its ingredients one per line. | 10 | pass |
| Action | Add your first recipe | 4 | pass |
| Workspace | Batch Cart Plus | 3 | pass |
| Workspace | Keep plans for repeat events | 5 | pass |
| Workspace | Save named copies of this cart and restore them later. | 10 | pass |
| Action | View Plus plans | 3 | pass |
| How it works | Three steps | 2 | pass |
| How it works | How Batch Cart builds the shopping list | 7 | pass |
| Step 1 | Paste each recipe | 3 | pass |
| Step 1 | Enter one ingredient per line with its quantity. | 8 | pass |
| Step 2 | Set every serving count | 4 | pass |
| Step 2 | Batch Cart scales each recipe from its original yield. | 9 | pass |
| Step 3 | Check one combined list | 4 | pass |
| Step 3 | Matching weights and volumes merge. | 5 | pass |
| Step 3 | Uncertain conversions stay visible. | 4 | pass |
| Limits | Recipe and privacy limits | 4 | pass |
| Limits | A calculator, not a recipe service | 6 | pass |
| Limits | Batch Cart does not scrape recipe sites. | 7 | pass |
| Limits | Your recipes stay in this browser. | 6 | pass |
| Limits | Export a copy whenever you want. | 6 | pass |
| Limits | It converts units using fixed standard measures. | 7 | pass |
| Limits | Mixed units are marked for your review. | 7 | pass |
| Plus | Optional one-time license | 3 | pass |
| Plus | Save repeat plans with Plus | 5 | pass |
| Plus | US$12 once | 2 | pass |
| Plus | Keep named event plans and restore them for the next gathering. | 11 | pass |
| Plus | The full calculator, print, share, and export tools remain free. | 10 | pass |
| Plus action | Buy Batch Cart Plus | 4 | pass |
| Plus | Sociobot opens its hosted checkout. | 5 | pass |
| Plus disclosure | Have a license? | 3 | pass |
| Plus field | License token | 2 | pass |
| Plus action | Restore purchase | 2 | pass |
| Plus | The free cart has no time limit. | 7 | pass |
| Footer | One shopping list from your recipes. | 6 | pass |
| Footer | Privacy | 1 | pass |
| Footer | Terms | 1 | pass |
| Footer | Built by Param Factory | 4 | pass |
| Footer | (opens in a new tab) | 5 | pass |
| Footer | v1.0.14 | 1 | pass |

The populated workspace additionally shows “Edit any total.” (3 words) and
“Tick items you already have.” (5 words). Those statements map to
`editable-totals` and `pantry-exclusion`.

### README

| Area | Exact copy | Words | Result |
| --- | --- | ---: | --- |
| Title | Batch Cart | 2 | pass |
| Introduction | Combine scaled recipes into one shopping list. | 7 | pass |
| Introduction | Batch Cart is for households and event cooks planning several dishes at once. | 13 | pass |
| Introduction | Paste ingredients, set the original and target servings for each recipe, and use one combined cart at the store. | 19 | **flag — F-10-1: inconsistent term** |
| Link label | Live product | 2 | pass |
| Link label | One-click demo | 2 | pass |
| Heading | What Batch Cart does | 4 | pass |
| Feature | Scales each recipe from its original serving count. | 8 | pass |
| Feature | Adds amounts when their units can be converted. | 8 | pass |
| Feature | Keeps incompatible units separate and marks them for review. | 9 | pass |
| Feature | Moves checked pantry items out of the shopping list. | 9 | pass |
| Feature | Prints, shares, imports, and exports the active cart. | 8 | pass |
| Feature | Works offline after the first connected visit. | 7 | pass |
| Feature | Keeps recipe data in this browser. | 6 | pass |
| Feature | It is not sent to a server. | 7 | pass |
| Demo | The demo opens three recipes with a ready shopping list. | 10 | pass |
| Demo | Use Reset demo to restore them. | 6 | pass |
| Demo | Use Start for real to discard the sample and return to your cart. | 13 | pass |
| Heading | Free cart and Batch Cart Plus | 6 | pass |
| Price | The active cart, serving controls, pantry checks, print, share, import, and export stay free. | 14 | pass |
| Price | Batch Cart Plus is US$12 once and adds named plan snapshots for repeat events. | 14 | pass |
| Price | Payment uses the Sociobot hosted checkout. | 6 | pass |
| License | Batch Cart stores a returned license in this browser and verifies a stored license at most once per day. | 19 | pass |
| Heading | Develop | 1 | pass |
| Development | Requires Node.js 20 or newer. | 5 | pass |
| Development | Open http://localhost:5173. | 2 | pass |
| Development | The demo is at http://localhost:5173/?demo=1. | 5 | pass |
| Heading | Test and build | 3 | pass |
| Verification | npm test runs parser unit tests and Chromium browser tests. | 10 | pass — verified below |
| Verification | Browser tests cover every registered claim, mobile layout, and accessibility violations. | 11 | pass — verified below |
| Verification | npm run build writes the static site to dist/. | 9 | pass — verified below |
| Verification | Run one claim by its ID. | 6 | pass |
| Heading | Privacy and data ownership | 4 | pass |
| Privacy | The real cart and the sample cart are kept apart. | 10 | pass |
| Privacy | Export JSON before clearing browser storage or moving devices. | 9 | pass |
| Privacy | See /privacy and /terms in the app. | 7 | pass |
| Privacy | Batch Cart uses no analytics, trackers, third-party runtime scripts, or CDN fonts. | 12 | pass |
| Heading | Deploy | 1 | pass |
| Deployment | Deploy the contents of dist/ to a static host. | 9 | pass |
| Heading | License | 1 | pass |
| License | MIT. | 1 | pass |
| License | See LICENSE. | 2 | pass |

Terminology is otherwise consistent: a source dish is a `recipe`; the
calculated output is a `shopping list`; the complete working data is a `cart`;
an owned item is a `pantry item`; original and planned yields are `Recipe
serves` and `Cook for`; the reusable paid copy is a `saved plan`; the paid tier
is `Batch Cart Plus`; the isolated sample mode is the `demo`; and the purchase
credential is a `license`.

## Demo, sandbox, privacy, and offline behavior

- The visible home action opened `/?demo=1` in one click in fresh mobile and
  desktop contexts.
- The first demo screen showed the persistent “Demo — sample data, nothing is
  saved” banner, **Reset demo**, **Start for real**, three named recipes, and a
  12-row shopping list. The phone showed two complete rows at y=521–755. The
  desktop showed a recipe name at y=641–693 and calculated rows at y=606–840.
- Editing the first recipe and selecting **Reset demo** restored “Lemony tomato
  pasta.” Selecting **Start for real** removed `demo:batch-cart` and opened the
  real cart without the sample.
- A separately created real recipe, “Private family pie,” survived entering,
  editing, and leaving the demo. “Demo-only stew” never appeared in real data.
- The complete one-click demo and exit flow made no off-origin request. A
  separate service-worker context reloaded `/demo` offline with the banner and
  all three recipes.

The demo and sandbox requirements pass.

## Claims

I cloned the candidate into `/tmp/batch-cart-review10-clean-mWnRJZ/repo`, ran
`npm ci`, and invoked every exact command from `.factory/claims.json`
individually. All 24 commands passed. I also inspected each tagged test against
its claim; none merely checks for the presence of a control.

| Claim ID | Result | Observable coverage |
| --- | --- | --- |
| `scaled-aggregation` | PASS | `1.2 kg` → serving edit → `1.45 kg`, with both recipe sources |
| `uncertain-conversions` | PASS | converted and incompatible units remain separate/marked with sources |
| `fixed-measures` | PASS | one cup plus one tablespoon yields the exact cup total |
| `pantry-exclusion` | PASS | checked item moves to pantry and survives reload |
| `data-export` | PASS | downloaded JSON contains recipes, pantry choice, and override |
| `data-import` | PASS | fixture restores recipe, pantry choice, and override in the UI |
| `list-sharing` | PASS | share payload contains calculated ingredient text |
| `list-printing` | PASS | print action invokes the print path |
| `demo-isolation` | PASS | demo edit is absent from the real cart |
| `demo-deletion` | PASS | Privacy, Cart, wordmark, Back, hard exit, and Start for real delete demo storage |
| `demo-seed-reset` | PASS | three named recipes and 12 rows return after Reset |
| `editable-totals` | PASS | quantity, unit, and name survive reload and export |
| `local-privacy` | PASS | recipe edit produces no off-origin request |
| `private-runtime` | PASS | initial load uses no analytics, tracker, third-party script, or CDN font request |
| `license-verification-daily` | PASS | two same-day loads make one verification request |
| `license-token-only` | PASS | verification URL contains only the token and has no body |
| `license-revocation` | PASS | Plus disappears while the free cart remains available |
| `returned-license-storage` | PASS | returned token is stored after the URL is cleaned |
| `no-recipe-scraping` | PASS | recipe URL is rejected as local text and never fetched |
| `offline-reload` | PASS | a separate context reloads the populated demo offline |
| `plus-snapshots` | PASS | named sample plan saves and restores |
| `free-core` | PASS | every named free control works after a ten-year clock change |
| `local-data-deletion` | PASS | both databases, saved plans, and license keys are removed |
| `hosted-checkout` | PASS | US$12 copy, Sociobot 303, and Dodo destination verify |

Registry parity is 24 unique IDs to 24 unique `@claim:` tags. The landing,
demo, legal routes, metadata, and README contain no unlisted product claim.
F-10-1 is terminology, not an untested capability.

## Earlier findings checked live and in code

I read `review-1.md` through `review-9.md`, `polish-1.md` through
`polish-9.md`, and the prior handoff. Each prior finding was checked against
the live product and current source.

| Earlier ID | Current verification |
| --- | --- |
| F-1-1 | Fixed: populated shopping-list rows, banner, Reset, and Start for real are visible in the first phone demo screen. |
| F-1-2 | Fixed: source recipe and calculated values share the desktop first view. |
| F-1-3 | Fixed: returned-license storage is registered/tested; unsupported repository/build assertions remain absent. |
| F-1-4 | Fixed: product routes and the static 404 have route-specific title, description, canonical, Open Graph, and Twitter metadata. |
| F-1-5 | Fixed: the five flagged jargon/ambiguous phrases remain absent. F-10-1 concerns a different README sentence. |
| F-2-1 | Fixed, including its review-4 reopening: the static keyboard shell precedes JavaScript; immediate Tab and the full suites pass. |
| F-2-2 | Fixed: the unbounded “accurate shopping list” wording remains absent. |
| F-2-3 | Fixed: the three-recipe sample and Reset behavior have exact registered coverage. |
| F-2-4 | Fixed: edited totals persist through reload and export. |
| F-2-5 | Fixed: unsupported receipt wording remains absent. |
| F-2-6 | Fixed: license revocation removes Plus and preserves the free cart. |
| F-2-7 | Fixed: unsupported refund/third-party-terms wording remains absent. |
| F-2-8 | Fixed: the future-clock free-core test operates pantry and every other named control. |
| F-2-9 | Fixed: confirmed local deletion removes both databases, plans, and license data. |
| F-2-10 | Fixed: the action explanation and all three facts fit both required first screens. |
| F-2-11 | Fixed: the static 404 has shared navigation/footer, route metadata, a return action, and HTTP 404 status. |
| F-2-12 | Fixed: the conversion sentence uses plain fixed-measure wording. |
| F-2-13 | Fixed: README capability and paid-tier headings stand alone. |
| F-3-1 | Fixed: forward and Back navigation focus the destination h1 and announce its route title. |
| F-5-1 | Fixed: static and SPA not-found pages use “Page not found,” without metaphor. |
| F-5-2 | Fixed: the limits section uses the factual “Recipe and privacy limits” label. |
| F-6-1 | Fixed: all tested ordinary demo exits delete the sample database. |
| F-6-2 | Fixed: readable source and calculated sample values appear in the desktop first viewport. |
| F-6-3 | Fixed: import/export cover cart choices and free-core operates every named control after the future clock. |
| F-6-4 | Fixed: the earlier correctness and timing absolutes remain absent. |
| F-6-5 | Fixed: the landing says “Open your cart,” and Start for real returns to existing data. |
| F-6-6 | Fixed: shopping-list construction and demo-storage headings name their subjects. |
| F-7-1 | Fixed: “Generated artwork” remains absent from visitor footers; provenance remains in the design record. |
| F-8-1 | Fixed: the shopping list is a labelled `section`; live Axe reports zero violations. |
| F-9-1 | Fixed: the tagged aggregation test changes Cook for from 6 to 8 and verifies `1.2 kg` → `1.45 kg` plus both sources. |
| F-9-2 | Fixed: both footers say “One shopping list from your recipes.” |
| F-9-3 | Fixed: the landing label says “Three steps.” |

No earlier finding is reopened.

## Structure, accessibility, links, and visual identity

- `/`, `/?demo=1`, `/demo`, `/privacy`, and `/terms` return 200;
  `/missing-page` returns the designed HTTP 404. Robots, sitemap, manifest,
  social card, favicon, and Apple-touch icon return 200.
- Titles are 17–51 characters and use the required route pattern. Every route
  has one h1, one main landmark, `lang=en`, a route-specific description and
  canonical, Open Graph/Twitter metadata, SVG favicon, and 180px Apple-touch
  icon. The social image is 1200 × 630.
- The internal route/link crawl found no dead link. The Param Factory link
  returns 200. The Plus action returns 303 to a Dodo hosted-checkout URL.
  Explicit mail links are present on the legal pages.
- Client navigation to Privacy focuses “Your recipes stay with you” and
  announces “Privacy — Batch Cart.” Back focuses the home h1 and announces the
  home title.
- The deployed-origin Playwright suite passed 51/51. Axe reports zero
  violations on home, demo, Privacy, Terms, and 404. The factory URL verifier
  passed home and demo with no console/page errors, missing alternatives, or
  unnamed buttons.
- Response headers include CSP with `frame-ancestors 'none'`, nosniff,
  Referrer-Policy, Permissions-Policy, and HSTS. The runtime loads fonts and
  scripts from the product origin.
- The aubergine field, acid-lime shopping plane, clipped translucent recipe
  panes, Fraunces/Atkinson type pairing, and original culinary measurement art
  implement the documented identity. The layout is not a generic SaaS
  template.

## Quality gates

- Fresh `npm ci`: PASS, zero reported vulnerabilities.
- Every exact claims command: PASS, 24/24.
- Fresh `npm test`: PASS, 14 unit tests and 51 Chromium tests.
- Fresh `npm run build`: PASS; `dist/index.html` exists.
- Initial application JavaScript: 31,111 bytes raw / 10.49 kB gzip. CSS:
  20,326 bytes raw / 5.34 kB gzip.
- Deployed-origin browser/Axe suite: PASS, 51/51.
- Live HTML, hashed JavaScript, and CSS match the clean build by SHA-256.
- `git diff --check`: PASS.

## Missed leverage

No additional AI feature is implied. Recipe scaling and unit aggregation are
deterministic, and remote model use would weaken the local-first privacy model.
The brief’s obvious adjacent capabilities—JSON import/export, print/share,
pantry exclusion, offline use, and optional saved-plan snapshots—are present.
No provider key, decorative AI feature, or unexplained model request exists.

## What would make this perfect

Replace “one combined cart” in the README introduction with “one combined
shopping list,” update the copy audit, and rerun its wording regression. No
functional, demo, claim, privacy, offline, accessibility, routing, metadata,
or visual defect was found.
