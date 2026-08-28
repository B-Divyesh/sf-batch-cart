# Adversarial first-read review 2 — FAIL

Reviewed 2026-08-28 against <https://batch-cart.sociobot.in> and commit `8dd2157bc23f4cfd5bbbd7f5738a60f01183e5c1`.

## Verdict

**FAIL.** The one-click demo and all 20 registered claim commands work, but the required `npm test` gate fails intermittently and eight claim-like statements have no exact registry coverage. The mobile first screen also omits the action explanation and all three plain facts, and the static 404 does not use the standard site header/footer. `PASS` requires zero findings.

## First read before scrolling

Fresh Chromium contexts opened the live home page at 390 × 844 and 1440 × 900 with `scrollY = 0`.

| Question | My answer after 30 seconds | Exact live evidence |
| --- | --- | --- |
| What does it do? | It combines several recipes into one shopping list. | “Combine recipes into one shopping list” |
| For whom? | Home cooks making several dishes who change serving counts. | “For home cooks planning several dishes who want correct amounts after every serving change.” |
| What should I click first? | **Try it with sample data**. | The named primary action was fully visible at mobile y=765–815 and desktop y=783–831. |

This mandatory three-question gate passes at both sizes. No console or page error occurred. The mobile screenshot nevertheless shows only the primary action at the bottom edge; its explanation and all three facts are below the fold (F-2-10).

## Findings

### F-2-1 — BLOCKING — the required `npm test` gate is reproducibly flaky

**Location/quote:** clean clone `/tmp/batch-cart-review2-K99Syy`; `npm test` failed with 43/44 browser tests passing:

> `mobile keyboard focus starts at the skip link, follows the visible cart, and exposes Import data`
>
> Expected “Skip to main content” to be focused; received “inactive”.

The isolated test repeated five times with one worker and failed once again (4/5 passed). `tests/e2e/accessibility.spec.ts:67-69` calls `page.goto('/demo')`, presses Tab immediately, and only then waits for the asynchronously rendered skip link.

**Why this fails:** the repository cannot reliably pass its required quality gate. A passing rerun would not make the committed gate deterministic or provide trustworthy keyboard evidence.

**Concrete fix:** wait for the rendered skip link or `main` before pressing Tab, or render the page shell synchronously before IndexedDB loading. Run the exact `npm test` command repeatedly after the repair.

### F-2-2 — BLOCKING — “accurate” is an unbounded, unlisted README claim

**Location/quote:** `README.md`: “Combine scaled recipes into one accurate shopping list.”

**Why this misleads:** `.factory/claims.json` tests specific aggregation and conversion examples, but has no claim that every resulting list is accurate. The product itself asks people to review uncertain conversions.

**Concrete fix:** use “Combine scaled recipes into one shopping list.” Do not register an unlimited accuracy promise.

### F-2-3 — BLOCKING — the seeded demo and Reset promise have no claim entry

**Location/quote:** home: “The demo opens three scaled recipes and their combined cart.” README: “The demo opens three dinner recipes in a separate sample cart. Use Reset demo to restore them.”

**Why this misleads:** `demo-isolation` and `demo-deletion` do not assert three seeded recipes or Reset. An untagged layout test checks row count, but the claims contract requires a registry entry with one matching tag. “Scaled recipes” and “combined cart” also change terms from the first screen’s “recipes” and “shopping list.”

**Concrete fix:** rewrite the landing sentence as “The demo opens three recipes with a ready shopping list.” Add `demo-seed-reset` to the registry and a tagged clean-context test that asserts all three recipe names, changes data, resets, and confirms the original sample returns.

### F-2-4 — BLOCKING — editable shopping-list totals are an unlisted product claim

**Location/quote:** live demo: “Edit any total.”

**Why this misleads:** no claims entry or tagged test changes a calculated quantity, unit, or ingredient name and verifies the override. This is a substantive product capability, not instructional decoration.

**Concrete fix:** add an `editable-totals` claim and test that changes a sample total, reloads, and verifies the displayed/exported override; otherwise remove the instruction and controls.

### F-2-5 — BLOCKING — receipt handling is asserted but not tested

**Location/quote:** landing: “Sociobot handles payment and your receipt on its hosted checkout.” Terms: “Sociobot handles payment and receipts through its checkout partner.”

**Why this misleads:** `hosted-checkout` proves the price and a 303 redirect to Dodo. It does not complete a purchase or assert that a receipt is issued.

**Concrete fix:** remove “and your receipt” / “and receipts,” leaving “Sociobot opens its hosted checkout,” or add a sandboxed billing fixture and exact receipt claim.

### F-2-6 — BLOCKING — refunded and invalid license behavior is unlisted

**Location/quote:** `/terms`: “A refunded or invalid license loses access to Plus features. Your free cart stays available.”

**Why this misleads:** `license-token-only` checks request shape and `free-core` checks an unlicensed future date. No claim test changes a valid license to refunded/invalid and verifies both Plus removal and preservation of real cart data.

**Concrete fix:** add a `license-revocation` registry entry and tagged fixture-response test covering both outcomes, or remove this behavioral promise.

### F-2-7 — BLOCKING — checkout terms and refund applicability are unlisted

**Location/quote:** `/terms`: “That checkout’s terms and refund process apply to purchases.”

**Why this misleads:** the page neither links the applicable checkout terms/refund process nor registers a test that confirms which policy a purchaser receives.

**Concrete fix:** link to the exact Sociobot purchase/refund terms and test that link, or replace the sentence with verified product-owned terms.

### F-2-8 — BLOCKING — the claim that pantry checks stay free is not covered by `free-core`

**Location/quote:** README: “The active cart, serving controls, pantry checks, print, share, import, and export stay free.”

**Why this misleads:** the `free-core` claim and test cover serving controls, print, share, import, and export after ten years, but omit pantry checks. `pantry-exclusion` proves pantry behavior only in the current demo.

**Concrete fix:** add pantry checks to the `free-core` claim and exercise one after advancing the clock, or remove “pantry checks” from this sentence.

### F-2-9 — BLOCKING — browser-storage deletion is an unlisted privacy claim

**Location/quote:** `/privacy`: “Clear this site’s storage in your browser to remove local data.”

**Why this misleads:** no registry entry verifies that recipe, pantry, snapshot, license, and demo data are all absent after the documented deletion action.

**Concrete fix:** add a `local-data-deletion` claim/test covering both IndexedDB namespaces and license keys, and give browser-specific steps or an in-product **Delete local data** action.

### F-2-10 — MAJOR — required first-screen support copy is below the fold

**Location/quote:** live home at 390 × 844. The primary action ends at y=815. “The demo opens three scaled recipes and their combined cart.” starts at y=888; the three facts start at y=956. At 1440 × 900, the facts start at y=888 and extend below the viewport.

**Why this weakens the first read:** the plain-words and site-structure checklists require the explanation beside the primary action and all three privacy/offline/price facts in the first screen. Mobile shows none of that support before scrolling.

**Concrete fix:** reduce hero art/heading height and spacing so the action explanation and all three facts end above 844px at 390px width. Add a viewport regression for those four elements, not only the CTA.

### F-2-11 — MEDIUM — the static 404 does not use the standard site skeleton

**Location/quote:** live `/missing-page` returns the designed HTTP 404, but its header contains only the Batch Cart wordmark. Its footer contains only “One list from every recipe. Privacy · Terms.” Normal routes also show Demo, Cart, Privacy, “Built by Param Factory,” and `v1.0.4 · Generated artwork`.

**Why this matters:** navigation and ownership information change on an error route, contrary to the required consistent header/footer skeleton.

**Concrete fix:** make `public/404.html` use the same header navigation and complete footer as the SPA, then add these elements to the static-404 test.

### F-2-12 — MINOR — one landing sentence is unnatural technical wording

**Location/quote:** “It uses set unit measures.”

**Why this weakens comprehension:** “set unit measures” is not ordinary cooking language and does not say what the measures do.

**Concrete fix:** use “It converts units using fixed standard measures.”

### F-2-13 — MINOR — two README headings do not stand alone

**Location/quote:** “What it does”; “Free and Plus”.

**Why this weakens navigation:** “it” has no subject in a heading list, and “Plus” is not the full tier name.

**Concrete fix:** use “What Batch Cart does” and “Free cart and Batch Cart Plus”.

## Copy audit

Counts use whitespace-delimited words; punctuation-only separators are not counted. Hyphenated words and URLs count as one word. There are no sentences over 22 words and no banned marketing words. Controls, headings, image text alternatives, and other short user-facing strings are included because the checklist explicitly requires them.

### Live landing page

| Exact copy | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | pass |
| Batch Cart · Demo · Cart · Privacy | 2 · 1 · 1 · 1 | pass |
| Scale recipes for a dinner or event | 7 | pass |
| Combine recipes into one shopping list | 6 | pass |
| For home cooks planning several dishes who want correct amounts after every serving change. | 14 | pass |
| Try it with sample data · Start with an empty cart | 5 · 5 | pass; result-naming verbs |
| The demo opens three scaled recipes and their combined cart. | 10 | flag: F-2-3 |
| Works offline after your first visit | 6 | pass |
| Recipes stay in this browser | 5 | pass |
| Full cart free · Plus is US$12 once | 8 | pass |
| Glass recipe sheets and ingredients converge into one illuminated tray. | 10 | pass; image alt |
| Several recipes. · One shopping list. | 2 · 3 | pass |
| Live calculation | 2 | pass |
| Add recipes and see one shopping list | 7 | pass |
| Change any serving count. · Matching amounts combine at once. | 4 · 5 | pass |
| Combined result · Shopping list | 2 · 2 | pass |
| Combined ingredients will appear here. | 5 | pass |
| Add a recipe to start the calculation. | 7 | pass |
| Print list · Share list · Export data · Import data | 2 · 2 · 2 · 2 | pass; result-naming verbs |
| Recipes · Add recipe | 1 · 2 | pass |
| Your recipes will stack here | 5 | pass |
| Add a recipe, then paste its ingredients one per line. | 10 | pass |
| Add your first recipe | 4 | pass |
| Batch Cart Plus | 3 | pass |
| Keep plans for repeat events | 5 | pass |
| Save named copies of this cart and restore them later. | 10 | pass |
| View Plus plans | 3 | pass |
| Three clear steps | 3 | pass |
| How the list comes together | 5 | pass |
| Paste each recipe | 3 | pass |
| Enter one ingredient per line with its quantity. | 8 | pass |
| Set every serving count | 4 | pass |
| Batch Cart scales each recipe from its original yield. | 9 | pass |
| Check one combined list | 4 | pass |
| Matching weights and volumes merge. | 5 | pass |
| Uncertain conversions stay visible. | 4 | pass |
| You stay in charge | 4 | pass |
| A calculator, not a recipe service | 6 | pass |
| Batch Cart does not scrape recipe sites. | 7 | pass |
| Your recipes stay in this browser. | 6 | pass |
| Export a copy whenever you want. | 6 | pass |
| It uses set unit measures. | 5 | flag: F-2-12 |
| Mixed units are marked for your review. | 7 | pass |
| Optional one-time license | 3 | pass |
| Save repeat plans with Plus | 5 | pass |
| US$12 once | 2 | pass |
| Keep named event plans and restore them for the next gathering. | 11 | pass |
| The full calculator, print, share, and export tools remain free. | 10 | pass |
| Buy Batch Cart Plus | 4 | pass; result-naming verb |
| Sociobot handles payment and your receipt on its hosted checkout. | 10 | copy is plain; unlisted claim F-2-5 |
| Have a license? · License token · Restore purchase | 3 · 2 · 2 | pass |
| The free cart has no time limit. | 7 | pass |
| One list from every recipe. | 5 | pass |
| Privacy · Terms · Built by Param Factory · (opens in a new tab) | 1 · 1 · 4 · 5 | pass |
| v1.0.4 · Generated artwork | 4 | pass |

### README

| Exact copy | Words | Result |
| --- | ---: | --- |
| Batch Cart | 2 | pass |
| Combine scaled recipes into one accurate shopping list. | 8 | flag: F-2-2 |
| Batch Cart is for households and event cooks planning several dishes at once. | 13 | pass |
| Paste ingredients, set the original and target servings for each recipe, and use one combined cart at the store. | 19 | pass |
| Live product · One-click demo | 2 · 2 | pass |
| What it does | 3 | flag: F-2-13 |
| Scales each recipe from its original serving count. | 8 | pass |
| Adds amounts when their units can be converted. | 8 | pass |
| Keeps incompatible units separate and marks them for review. | 9 | pass |
| Moves checked pantry items out of the shopping list. | 9 | pass |
| Prints, shares, imports, and exports the active cart. | 8 | pass |
| Works offline after the first connected visit. | 7 | pass |
| Keeps recipe data in this browser. | 6 | pass |
| It is not sent to a server. | 7 | pass |
| The demo opens three dinner recipes in a separate sample cart. | 11 | plain copy; unlisted claim F-2-3 |
| Use Reset demo to restore them. | 6 | plain copy; unlisted claim F-2-3 |
| Use Start for real to discard the sample and open an empty cart. | 13 | pass |
| Free and Plus | 3 | flag: F-2-13 |
| The active cart, serving controls, pantry checks, print, share, import, and export stay free. | 14 | plain copy; registry gap F-2-8 |
| Batch Cart Plus is US$12 once and adds named plan snapshots for repeat events. | 14 | pass |
| Payment uses the Sociobot hosted checkout. | 6 | pass |
| Batch Cart stores a returned license in this browser and verifies a stored license at most once per day. | 19 | pass |
| Develop | 1 | pass |
| Requires Node.js 20 or newer. | 5 | pass for developer documentation |
| Open `http://localhost:5173`. | 2 | pass |
| The demo is at `http://localhost:5173/?demo=1`. | 5 | pass |
| Test and build | 3 | pass |
| `npm test` runs parser unit tests and Chromium browser tests. | 10 | pass for developer documentation |
| Browser tests cover every claim in `.factory/claims.json`, offline reload, demo isolation, mobile layout, and serious accessibility findings. | 17 | pass for developer documentation |
| `npm run build` writes the static site to `dist/`. | 9 | pass for developer documentation |
| Run one claim by its ID. | 6 | pass |
| Privacy and data ownership | 4 | pass |
| The real cart and the sample cart are kept apart. | 10 | pass |
| Export JSON before clearing browser storage or moving devices. | 9 | pass |
| See `/privacy` and `/terms` in the app. | 7 | pass |
| Batch Cart uses no analytics, trackers, third-party runtime scripts, or CDN fonts. | 12 | pass |
| Deploy | 1 | pass |
| Deploy the contents of `dist/` to a static host. | 9 | pass for developer documentation |
| License | 1 | pass |
| MIT. · See LICENSE. | 1 · 2 | pass |

## Demo and sandbox evidence

- The home action opened `/?demo=1` in one click with three recipes, 12 calculated rows, and Lemony tomato pasta first.
- The persistent banner read “Demo — sample data, nothing is saved,” with **Reset demo** and **Start for real**.
- At 390 × 844, the first two calculated rows were fully visible at y=521–638 and y=638–755.
- Editing the first recipe then choosing Reset restored “Lemony tomato pasta.”
- A pre-existing real recipe named “Private family pie” survived a demo edit. **Start for real** removed the demo edit and `demo:batch-cart`; only `batch-cart` remained.
- Recording a demo edit found no off-origin request.
- After one connected visit and service-worker control, an offline reload retained the demo title, banner, and sample recipe.

The demo behavior passes. F-2-3 and F-2-4 concern missing claim registration, not a failed manual flow.

## Registered claims

Every exact command in `.factory/claims.json` ran independently from the clean clone. There are 20 registry IDs and exactly 20 unique matching `@claim:` tags.

| Claim | Result |
| --- | --- |
| `scaled-aggregation` | PASS |
| `uncertain-conversions` | PASS |
| `fixed-measures` | PASS |
| `pantry-exclusion` | PASS |
| `data-export` | PASS |
| `data-import` | PASS |
| `list-sharing` | PASS |
| `list-printing` | PASS |
| `demo-isolation` | PASS |
| `demo-deletion` | PASS |
| `local-privacy` | PASS |
| `private-runtime` | PASS |
| `license-verification-daily` | PASS |
| `license-token-only` | PASS |
| `returned-license-storage` | PASS |
| `no-recipe-scraping` | PASS |
| `offline-reload` | PASS |
| `plus-snapshots` | PASS |
| `free-core` | PASS |
| `hosted-checkout` | PASS |

No listed claim failed. F-2-2 through F-2-9 are unlisted claims and therefore remain untested under the required one-claim/one-tag contract.

## Earlier finding verification

I read `.factory/review-1.md`, `.factory/polish-1.md`, and the prior polish handoff before replacing the handoff for this work order. I checked each repair in both live behavior and current code.

| Earlier ID | Result | Fresh evidence |
| --- | --- | --- |
| F-1-1 | fixed | Two populated rows are fully within the 390 × 844 direct-demo viewport. |
| F-1-2 | fixed | At 1440px the cart and first recipe begin 62px apart vertically and occupy opposite columns. |
| F-1-3 | fixed | `returned-license-storage` now has one registry entry and one passing tag; the two removed README assertions remain absent. |
| F-1-4 | fixed | `/`, demo, privacy, terms, and HTTP 404 have route-specific title, description, canonical, Open Graph, and Twitter title. |
| F-1-5 | fixed | The five previously flagged phrases are absent. Current copy issues are new F-2-3, F-2-12, and F-2-13. |

No earlier finding is reopened under its old ID.

## Structure, accessibility, and links

- `/`, `/?demo=1`, `/demo`, `/privacy`, and `/terms` returned 200; `/missing-page` returned 404 with a designed way home.
- Every route had `lang=en`, one `main`, one `h1`, a route-specific title/description/canonical/OG/Twitter title, SVG favicon, and Apple-touch icon.
- History back-navigation restored `/` and focused its `h1`.
- Crawled internal links and the Param Factory link returned 200. The checkout returned 303 to `checkout.dodopayments.com`; mail links were explicit. Same-document fragments on the 404 were not treated as separate pages.
- Live axe scans on home, demo, privacy, terms, and 404 found zero serious or critical violations. Reduced motion changed scroll behavior to `auto` and transition duration to `0.00001s`.
- `/opt/fleet/lib/verify-url.sh` passed the live demo: 200, title, `lang=en`, one `h1`, one `main`, no missing image alt, no unlabeled buttons, and no console/page errors.
- The aubergine/lime palette, generated glass-and-produce art, clipped work planes, serif display type, and asymmetric demo workspace are recognisably product-specific rather than a generic SaaS template.

F-2-11 is the remaining skeleton inconsistency. F-2-1 is the remaining reliability failure in the keyboard gate.

## Local build and deployment identity

- Clean-clone `npm ci`: PASS, 0 vulnerabilities.
- Every registered claim command: PASS, 20/20.
- Clean-clone `npm test`: **FAIL**, 11 unit tests passed and 43/44 browser tests passed; the keyboard test also failed once in five isolated repeats.
- Clean-clone `npm run build`: PASS; `dist/index.html` exists.
- Built JS: 30,000 bytes raw / 10.33 kB gzip. Built CSS: 19,645 bytes raw / 5.19 kB gzip.
- `git diff --check`: PASS.
- Live `index.html`, hashed JS, and hashed CSS matched the clean build byte-for-byte by SHA-256.

## Missed leverage

No obvious missing AI feature is implied. Recipe scaling and unit aggregation are deterministic, and sending household recipe data to a model would add cost and privacy risk without improving the core calculation. Import/export, offline storage, print/share, pantry handling, and optional saved plans already cover the brief’s expected leverage. No provider key or decorative AI feature was found.

## What would make this perfect

Make `npm test` deterministic; register or remove every unlisted claim; fit the demo explanation and all three facts into the first mobile and desktop screens; use the full shared skeleton on the static 404; and apply the two copy rewrites. Then rerun every claim command, repeated full-suite runs, live sandbox/offline checks, route crawl, metadata checks, and the full copy audit. Nothing else should remain before `PASS`.
