# Adversarial first-read review 3 — FAIL

Reviewed 2026-08-28 against <https://batch-cart.sociobot.in> and repository commit `5e35f6ce7df2dadfc79ac597677ddf1cdb6d1f98`.

## Verdict

**FAIL.** The first read, isolated demo, all 24 registered claim commands, full test suite, build, offline/privacy checks, prior repairs, and visual/routing checks pass. One required accessibility behavior remains: SPA route changes do not announce the new page in the polite live region. A PASS requires zero findings.

## Cold first read

I opened the live home page in separate fresh Chromium contexts at 390 x 844 and 1440 x 900, with `scrollY = 0`, before using the page. There were no console or page errors.

| Question | Answer after the first screen | Exact evidence |
| --- | --- | --- |
| What does this do? | It combines recipes into one shopping list. | “Combine recipes into one shopping list” |
| Who is it for? | Home cooks planning several dishes whose serving counts change. | “For home cooks planning several dishes who want correct amounts after every serving change.” |
| What should I click first? | **Try it with sample data**. | The named action is visible with “The demo opens three recipes with a ready shopping list.” |

At 390 px, the action occupied y=407–457 and its explanation and all three facts were visible above the fold. At 1440 px, both actions, the explanation, and all facts were visible at y=649–698. This required first-read gate passes.

## Findings

### F-3-1 — MAJOR — route changes do not announce the newly opened page

**Location/evidence:** On the live home page I activated **Privacy**. The URL changed to `/privacy` and focus correctly moved to the h1, “Your recipes stay with you”. The only `[aria-live="polite"]` region had an empty string. In `src/main.ts`, `render()` adds that empty region, and `routeChanged()`/`render(true)` move focus but never place a page-change message in it.

**Why this fails:** A keyboard or screen-reader visitor receives focus, but no polite route announcement. The site-structure requirement explicitly requires both moving focus to the new h1 and announcing the change. This leaves a required SPA navigation behavior only half implemented.

**Concrete fix:** After each client-side route render, update the polite live region with a concise route name such as “Privacy — Batch Cart”, without duplicating it on the initial page load. Add a browser regression that follows a `data-link`, asserts h1 focus, and asserts the route announcement text.

## Copy audit

Word counts use whitespace-separated words; hyphenated words, prices, and URLs each count as one word. I included headings, actions, facts, and user-facing sentences. No landing or README copy is over 22 words, uses a banned marketing adjective, has inconsistent core terminology, or has a non-result-naming button. No copy finding is raised.

### Landing page

| Exact copy | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | pass |
| Batch Cart; Demo; Cart; Privacy | 2; 1; 1; 1 | pass — navigation labels |
| Scale recipes for a dinner or event | 7 | pass |
| Combine recipes into one shopping list | 6 | pass |
| For home cooks planning several dishes who want correct amounts after every serving change. | 14 | pass |
| Try it with sample data; Start with an empty cart | 5; 5 | pass — result-naming actions |
| The demo opens three recipes with a ready shopping list. | 10 | pass — `demo-seed-reset` |
| Works offline after your first visit; Recipes stay in this browser; Full cart free · Plus is US$12 once | 6; 5; 8 | pass — registered claims |
| Several recipes. One shopping list. | 2; 3 | pass |
| Live calculation; Add recipes and see one shopping list | 2; 7 | pass |
| Change any serving count. Matching amounts combine at once. | 4; 5 | pass — `scaled-aggregation` |
| Combined result; Shopping list; Combined ingredients will appear here. | 2; 2; 5 | pass |
| Add a recipe to start the calculation. | 7 | pass |
| Print list; Share list; Export data; Import data | 2; 2; 2; 2 | pass — result-naming actions |
| Recipes; Add recipe; Your recipes will stack here | 1; 2; 5 | pass |
| Add a recipe, then paste its ingredients one per line. | 10 | pass |
| Add your first recipe | 4 | pass — result-naming action |
| Batch Cart Plus; Keep plans for repeat events | 3; 5 | pass |
| Save named copies of this cart and restore them later. | 10 | pass — `plus-snapshots` |
| View Plus plans | 3 | pass — result-naming action |
| Three clear steps; How the list comes together | 3; 5 | pass |
| Paste each recipe; Enter one ingredient per line with its quantity. | 3; 8 | pass |
| Set every serving count; Batch Cart scales each recipe from its original yield. | 4; 9 | pass |
| Check one combined list; Matching weights and volumes merge. Uncertain conversions stay visible. | 4; 8 | pass — registered conversion claims |
| You stay in charge; A calculator, not a recipe service | 4; 6 | pass |
| Batch Cart does not scrape recipe sites. | 7 | pass — `no-recipe-scraping` |
| Your recipes stay in this browser. Export a copy whenever you want. | 6; 6 | pass — registered privacy/export claims |
| It converts units using fixed standard measures. Mixed units are marked for your review. | 8; 8 | pass — registered conversion claims |
| Optional one-time license; Save repeat plans with Plus; US$12 once | 3; 5; 2 | pass |
| Keep named event plans and restore them for the next gathering. | 11 | pass — `plus-snapshots` |
| The full calculator, print, share, and export tools remain free. | 10 | pass — `free-core` |
| Buy Batch Cart Plus; Sociobot opens its hosted checkout. | 4; 5 | pass — `hosted-checkout` |
| Have a license?; License token; Restore purchase; The free cart has no time limit. | 3; 2; 2; 7 | pass — `license-*`/`free-core` |
| One list from every recipe.; Privacy; Terms; Built by Param Factory (opens in a new tab); v1.0.5 · Generated artwork | 5; 1; 1; 5; 4 | pass |

The populated demo additionally says “Edit any total. Tick items you already have.” (8 words), covered by `editable-totals` and `pantry-exclusion`; it is not an undisclosed landing promise.

### README

| Exact copy | Words | Result |
| --- | ---: | --- |
| Batch Cart | 2 | pass |
| Combine scaled recipes into one shopping list. | 7 | pass |
| Batch Cart is for households and event cooks planning several dishes at once. | 13 | pass |
| Paste ingredients, set the original and target servings for each recipe, and use one combined cart at the store. | 18 | pass |
| Live product; One-click demo | 2; 2 | pass |
| What Batch Cart does | 4 | pass |
| Scales each recipe from its original serving count. | 8 | pass — `scaled-aggregation` |
| Adds amounts when their units can be converted. | 8 | pass — `scaled-aggregation` |
| Keeps incompatible units separate and marks them for review. | 9 | pass — `uncertain-conversions` |
| Moves checked pantry items out of the shopping list. | 9 | pass — `pantry-exclusion` |
| Prints, shares, imports, and exports the active cart. | 8 | pass — registered action claims |
| Works offline after the first connected visit. | 7 | pass — `offline-reload` |
| Keeps recipe data in this browser. It is not sent to a server. | 6; 7 | pass — `local-privacy` |
| The demo opens three recipes with a ready shopping list. | 10 | pass — `demo-seed-reset` |
| Use Reset demo to restore them. | 6 | pass — `demo-seed-reset` |
| Use Start for real to discard the sample and open an empty cart. | 13 | pass — demo isolation/deletion |
| Free cart and Batch Cart Plus | 6 | pass |
| The active cart, serving controls, pantry checks, print, share, import, and export stay free. | 14 | pass — `free-core` |
| Batch Cart Plus is US$12 once and adds named plan snapshots for repeat events. | 14 | pass — `plus-snapshots`/`hosted-checkout` |
| Payment uses the Sociobot hosted checkout. | 6 | pass — `hosted-checkout` |
| Batch Cart stores a returned license in this browser and verifies a stored license at most once per day. | 19 | pass — returned-license/daily claims |
| Develop; Requires Node.js 20 or newer. | 1; 6 | pass — developer documentation |
| Open `http://localhost:5173`. The demo is at `http://localhost:5173/?demo=1`. | 2; 5 | pass — developer documentation |
| Test and build; `npm test` runs parser unit tests and Chromium browser tests. | 3; 10 | pass — developer documentation |
| Browser tests cover every claim in `.factory/claims.json`, offline reload, demo isolation, mobile layout, and serious accessibility findings. | 17 | pass — verified below |
| `npm run build` writes the static site to `dist/`. | 9 | pass — developer documentation |
| Run one claim by its ID. | 6 | pass |
| Privacy and data ownership | 4 | pass |
| The real cart and the sample cart are kept apart. | 10 | pass — `demo-isolation` |
| Export JSON before clearing browser storage or moving devices. | 9 | pass |
| See `/privacy` and `/terms` in the app. | 7 | pass |
| Batch Cart uses no analytics, trackers, third-party runtime scripts, or CDN fonts. | 12 | pass — `private-runtime` |
| Deploy; Deploy the contents of `dist/` to a static host. | 1; 9 | pass — developer documentation |
| License; MIT. See LICENSE. | 1; 1; 2 | pass |

## Demo and sandbox behavior

- The visible home action opened `/?demo=1` in one click. On a fresh 390 x 844 context, the first viewport already showed sample shopping-list rows: butter at y=521–638 and cherry tomatoes at y=638–755.
- The persistent banner was present verbatim: “Demo — sample data, nothing is saved”, with one **Reset demo** and one **Start for real** control.
- The demo initially used only IndexedDB `demo:batch-cart`. After editing a recipe, **Reset demo** restored “Lemony tomato pasta”. **Start for real** navigated to `/#workspace`, removed the banner and demo database, and left only the empty real `batch-cart` database.
- A request log covering the demo load and interaction contained only `https://batch-cart.sociobot.in`. The offline, privacy, and isolation claim commands separately passed from the clean clone.

## Claims and quality gates

I cloned the repository fresh into `/tmp/batch-cart-review3-85JjnB`, ran `npm ci`, and ran every exact `test` command listed in `.factory/claims.json` independently. All 24 passed: `scaled-aggregation`, `uncertain-conversions`, `fixed-measures`, `pantry-exclusion`, `data-export`, `data-import`, `list-sharing`, `list-printing`, `demo-isolation`, `demo-deletion`, `demo-seed-reset`, `editable-totals`, `local-privacy`, `private-runtime`, `license-verification-daily`, `license-token-only`, `license-revocation`, `returned-license-storage`, `no-recipe-scraping`, `offline-reload`, `plus-snapshots`, `free-core`, `local-data-deletion`, and `hosted-checkout`.

Registry parity also passes: 24 registry IDs, 24 `@claim:` tags, and no missing, extra, or duplicate tag. The full clean-clone `npm test` passed (12 unit tests and 49 Chromium tests); the chained `npm run build` passed and produced `dist/index.html`. `git diff --check` passed.

## Earlier finding verification

I read every earlier review, polish record, verification record, and handoff. Each prior finding is fixed in both live behavior and current code.

| Earlier finding | Current verification |
| --- | --- |
| F-1-1 | Fixed: two real sample rows are in the direct-demo phone viewport. |
| F-1-2 | Fixed: the desktop regression keeps cart and recipe panes alongside each other. |
| F-1-3 | Fixed: returned-license storage is registered and tested; unsupported README statements remain removed. |
| F-1-4 | Fixed: live SPA routes and static 404 have route-specific metadata. |
| F-1-5 | Fixed: earlier jargon/ambiguous-action phrases are absent. |
| F-2-1 | Fixed: the full 49-browser-test suite passed from the clean clone. |
| F-2-2 | Fixed: “accurate” is absent from README and product copy. |
| F-2-3 | Fixed: `demo-seed-reset` covers the three-recipe seed and reset. |
| F-2-4 | Fixed: `editable-totals` persists quantity, unit, and name changes. |
| F-2-5 | Fixed: unsupported receipt wording is absent. |
| F-2-6 | Fixed: `license-revocation` covers Plus removal while free cart data remains usable. |
| F-2-7 | Fixed: unsupported checkout-terms/refund assertion is absent. |
| F-2-8 | Fixed: `free-core` explicitly exercises pantry checks. |
| F-2-9 | Fixed: the confirmed Delete local data control and its claim remove both namespaces and license data. |
| F-2-10 | Fixed: action explanation and three facts fit in both first-screen viewports. |
| F-2-11 | Fixed: static 404 has the shared header, complete footer, and return action. |
| F-2-12 | Fixed: the former “set unit measures” phrase is absent. |
| F-2-13 | Fixed: README headings are “What Batch Cart does” and “Free cart and Batch Cart Plus”. |

## Structure, privacy, and leverage checks

- `/`, `/?demo=1`, `/demo`, `/privacy`, and `/terms` returned 200; `/missing-page` returned the designed HTTP 404. Internal header/footer/legal links, the sitemap, robots file, manifest, Param Factory link, and the checkout path resolved; checkout reached the hosted Dodo destination. No dead link was found.
- The routes have the required title pattern, one h1, main landmark, language, description, canonical URL, Open Graph/Twitter image metadata, favicon, and Apple touch icon. `robots.txt`, `sitemap.xml`, a real 404, security headers, and a CSP matching the self-hosted runtime are present.
- Back/forward navigation restores the route and focuses its h1. This portion passes; the missing polite announcement is F-3-1.
- The route tests and project axe scans pass. The live cold loads had no console errors. The aubergine field, acid-lime calculation plane, clipped glass recipe panes, original generated art, and self-hosted Fraunces/Atkinson pairing implement the documented product-specific identity rather than a generic SaaS template.
- No AI feature is implied by this deterministic, local-first recipe calculator. Import/export, share/print, pantry handling, local storage, offline operation, and optional saved plans cover the concrete leverage in the brief. No provider key or decorative AI runtime was found.

## What would make this perfect

Add the route-change live announcement and its regression test, then rerun the clean-clone claim commands, full test/build, route/focus check, and accessibility scan. Nothing else was found in this review.
