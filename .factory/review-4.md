# Adversarial first-read review 4 — FAIL

Reviewed 2026-08-29 against <https://batch-cart.sociobot.in> and repository commit `2c394b8f920bdbd9c9da086b52459752c5aef95c`.

## Verdict

**FAIL.** The cold first read, one-click sample cart, declared claims, local build, privacy/PWA behavior, metadata, links, and product-specific visual system pass. The public site still has an intermittent keyboard startup failure: a visitor who tabs immediately after navigation can miss the skip link. This reopens earlier finding **F-2-1** and is blocking. PASS requires zero findings.

## Cold first read

I opened `/` in independent fresh Chromium contexts before scrolling or using the page. The live page returned 200 with no normal-page console or page errors.

| Question | Answer from the first screen | Exact evidence |
| --- | --- | --- |
| What does it do? | It combines recipes into one shopping list. | `Combine recipes into one shopping list` |
| Who is it for? | Home cooks making several dishes whose serving counts change. | `For home cooks planning several dishes who want correct amounts after every serving change.` |
| What should I click first? | **Try it with sample data**. | The visible control is named `Try it with sample data`; `The demo opens three recipes with a ready shopping list.` explains the result. |

At 390 × 844, the action was at y=407–457; its explanation ended at y=525 and the three facts ended at y=591. At 1440 × 900, the explanation and facts ended at y=835. The mandatory first-read gate passes in both viewports.

## Findings

### F-2-1 — BLOCKING — the live keyboard skip link remains timing-dependent

**Location/evidence:** The public-origin run

```sh
PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in \
  npx playwright test tests/e2e/accessibility.spec.ts --workers=1 --reporter=dot
```

failed 1 of 25 tests on `tests/e2e/accessibility.spec.ts:227`, **“the skip link reaches the main content by keyboard”**. Immediately after `page.goto('/')`, the test pressed Tab. It expected `Skip to main content` to be focused but received `inactive`. Five immediate serial repeats of that exact test passed, which confirms a timing-dependent regression rather than a stable pass.

The code explains the race: `init()` awaits `routeChanged()`, and `routeChanged()` awaits IndexedDB state before `render()` inserts the skip link, header, and main landmark. The related mobile test waits for the rendered shell; this direct skip-link regression does not, and a keyboard visitor has the same gap.

**Why this blocks:** A visitor who begins keyboard navigation as the document finishes loading can tab before the app shell exists and miss the required first keyboard target. The prior F-2-1 repair was required to make this path deterministic; a passing rerun does not make the live interaction reliable.

**Concrete fix:** Render a static application shell, including the skip link and `main`, before any asynchronous IndexedDB work. Then replace or populate the workspace after state loading. Keep the immediate-Tab regression (without waiting for the skip link) and run it repeatedly against both the local build and the public origin until it is deterministic.

## Copy audit

Counts use whitespace-separated words. Prices and hyphenated terms count as one word. Controls, headings, and image alt text are included because they are read independently. No landing or README line exceeds 22 words, uses a banned marketing adjective, relies on unexplained jargon, changes the core terminology, or uses a non-result-naming button. There is no copy finding in this round.

### Landing page

| Exact copy | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | pass |
| Batch Cart; Demo; Cart; Privacy | 2; 1; 1; 1 | pass |
| Scale recipes for a dinner or event | 7 | pass |
| Combine recipes into one shopping list | 6 | pass |
| For home cooks planning several dishes who want correct amounts after every serving change. | 14 | pass |
| Try it with sample data; Start with an empty cart | 5; 5 | pass — result-naming actions |
| The demo opens three recipes with a ready shopping list. | 10 | pass — `demo-seed-reset` |
| Works offline after your first visit; Recipes stay in this browser; Full cart free · Plus is US$12 once | 6; 5; 8 | pass — registered claims |
| Glass recipe sheets and ingredients converge into one illuminated tray. | 10 | pass — image alt |
| Several recipes. One shopping list. | 2; 3 | pass — product-specific figure caption |
| Live calculation; Add recipes and see one shopping list | 2; 7 | pass |
| Change any serving count. Matching amounts combine at once. | 4; 5 | pass — `scaled-aggregation` |
| Combined result; Shopping list; Combined ingredients will appear here. | 2; 2; 5 | pass |
| Add a recipe to start the calculation. | 7 | pass |
| Print list; Share list; Export data; Import data | 2; 2; 2; 2 | pass — result-naming actions |
| Recipes; Add recipe; Your recipes will stack here | 1; 2; 5 | pass |
| Add a recipe, then paste its ingredients one per line. | 10 | pass |
| Add your first recipe | 4 | pass |
| Batch Cart Plus; Keep plans for repeat events | 3; 5 | pass |
| Save named copies of this cart and restore them later. | 10 | pass — `plus-snapshots` |
| View Plus plans | 3 | pass |
| Three clear steps; How the list comes together | 3; 5 | pass |
| Paste each recipe; Enter one ingredient per line with its quantity. | 3; 8 | pass |
| Set every serving count; Batch Cart scales each recipe from its original yield. | 4; 9 | pass |
| Check one combined list; Matching weights and volumes merge. Uncertain conversions stay visible. | 4; 8 | pass — conversion claims |
| You stay in charge; A calculator, not a recipe service | 4; 6 | pass |
| Batch Cart does not scrape recipe sites. | 7 | pass — `no-recipe-scraping` |
| Your recipes stay in this browser. Export a copy whenever you want. | 6; 6 | pass — privacy/export claims |
| It converts units using fixed standard measures. Mixed units are marked for your review. | 8; 8 | pass — conversion claims |
| Optional one-time license; Save repeat plans with Plus; US$12 once | 3; 5; 2 | pass |
| Keep named event plans and restore them for the next gathering. The full calculator, print, share, and export tools remain free. | 11; 10 | pass — `plus-snapshots`/`free-core` |
| Buy Batch Cart Plus; Sociobot opens its hosted checkout. | 4; 5 | pass — `hosted-checkout` |
| Have a license?; License token; Restore purchase; The free cart has no time limit. | 3; 2; 2; 7 | pass |
| One list from every recipe.; Privacy; Terms; Built by Param Factory (opens in a new tab); v1.0.6 · Generated artwork | 5; 1; 1; 5; 4 | pass |

The direct demo adds `Ready-to-use sample`, `Plan dinner with sample recipes`, `Change a serving count and watch the shared ingredients combine.`, `Safe to change`, and `This sample uses a separate browser database. Reset it or start your real cart at any time.` These are 3, 5, 10, 3, and 17 words respectively; they are plain, supported descriptions of the sandbox.

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
| Adds amounts when their units can be converted. | 8 | pass — aggregation/conversion claims |
| Keeps incompatible units separate and marks them for review. | 9 | pass — `uncertain-conversions` |
| Moves checked pantry items out of the shopping list. | 9 | pass — `pantry-exclusion` |
| Prints, shares, imports, and exports the active cart. | 8 | pass — action claims |
| Works offline after the first connected visit. | 7 | pass — `offline-reload` |
| Keeps recipe data in this browser. It is not sent to a server. | 6; 7 | pass — `local-privacy` |
| The demo opens three recipes with a ready shopping list. Use Reset demo to restore them. Use Start for real to discard the sample and open an empty cart. | 10; 6; 13 | pass — demo claims |
| Free cart and Batch Cart Plus | 6 | pass |
| The active cart, serving controls, pantry checks, print, share, import, and export stay free. | 14 | pass — `free-core` |
| Batch Cart Plus is US$12 once and adds named plan snapshots for repeat events. | 14 | pass — `plus-snapshots`/`hosted-checkout` |
| Payment uses the Sociobot hosted checkout. Batch Cart stores a returned license in this browser and verifies a stored license at most once per day. | 6; 19 | pass — license claims |
| Develop; Requires Node.js 20 or newer. | 1; 6 | pass — developer documentation |
| Open `http://localhost:5173`. The demo is at `http://localhost:5173/?demo=1`. | 2; 5 | pass |
| Test and build; `npm test` runs parser unit tests and Chromium browser tests. | 3; 10 | pass |
| Browser tests cover every claim in `.factory/claims.json`, offline reload, demo isolation, mobile layout, and serious accessibility findings. | 17 | pass — developer documentation |
| `npm run build` writes the static site to `dist/`. Run one claim by its ID. | 9; 6 | pass |
| Privacy and data ownership | 4 | pass |
| The real cart and the sample cart are kept apart. Export JSON before clearing browser storage or moving devices. See `/privacy` and `/terms` in the app. | 10; 9; 7 | pass — demo/privacy claims |
| Batch Cart uses no analytics, trackers, third-party runtime scripts, or CDN fonts. | 12 | pass — `private-runtime` |
| Deploy; Deploy the contents of `dist/` to a static host. | 1; 9 | pass — developer documentation |
| License; MIT. See LICENSE. | 1; 1; 2 | pass |

## Demo, sandbox, privacy, and claims

- The first-screen action opened `/?demo=1` in one click. The direct mobile demo displayed its persistent `Demo — sample data, nothing is saved` banner, one **Reset demo**, one **Start for real**, three named recipes (Lemony tomato pasta, Herb market salad, Garlic bread), and the first two populated cart rows at y=521–755 without scrolling.
- A direct fresh demo context contained only IndexedDB `demo:batch-cart`. The claim flow edits the sample, confirms Reset restores it, and confirms Start for real deletes that database before showing the separate empty real cart.
- The demo request log contained only `https://batch-cart.sociobot.in`. After service-worker control, an offline reload returned 200 with the banner, three recipes, and 12 cart rows; no error was recorded.
- `.factory/claims.json` has 24 unique IDs. The test source has exactly 24 unique `@claim:` tags: no missing, extra, or duplicate IDs.
- From fresh clone `/tmp/batch-cart-review4-maBZga`, after `npm ci`, I ran every exact registry `test` command independently. All 24 passed. The final Playwright record reports `status: passed` and no failed tests.
- The clean-clone `npm test` passed: 12 unit tests and 49 Chromium tests. `npm run build` produced `dist/index.html`; built app JavaScript is 30,536 bytes (10,351 bytes gzip) and CSS is 20,296 bytes (5,344 bytes gzip).

There is no unlisted claim finding. The remaining live visitor claims map to the declared aggregation, conversion, privacy, offline, data-transfer, demo, license, free-core, snapshot, and checkout claim tests.

## Earlier findings and structure checks

I read every prior review, polish record, and handoff. Fresh live/code verification confirms F-1-1 through F-1-5, F-2-2 through F-2-13, and F-3-1 remain fixed: direct mobile demo rows are visible; the desktop cart and recipes share a row; claims and copy remain registered/plain; static 404 metadata and shared chrome are present; the demo/reset/deletion and free-core checks work; and SPA navigation focuses the h1 and announces the new title.

F-2-1 is the exception and is reopened above. It is not merely marked fixed: the current live keyboard run demonstrates the remaining race.

- `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `robots.txt`, `sitemap.xml`, and `manifest.webmanifest` returned 200. `/missing-page` returned the designed HTTP 404.
- Product routes have the required per-route title, one h1, main landmark, description, canonical URL, Open Graph/Twitter title, favicon, and Apple-touch asset. SPA navigation `/` → `/privacy` focused `Your recipes stay with you` and announced `Privacy — Batch Cart`; Back focused the home h1 and announced the home title.
- Crawled internal/legal links returned 200, mail links were explicit, and the Plus checkout followed to the hosted checkout. Header/footer content is consistent; the temporary empty footer text observed before scrolling is CSS `content-visibility`, not an omitted footer.
- The live accessibility suite found no serious/critical axe violations in the 24 passing checks. The one failing keyboard assertion is F-2-1. Reduced-motion, 390px overflow, 200% text, touch targets, and product route metadata checks passed.
- The aubergine field, lime calculation plane, clipped glass recipe panes, self-hosted Fraunces/Atkinson pairing, and original generated culinary artwork match `.factory/design.md` and are distinct from a generic SaaS template.
- No extra AI step is implied by this deterministic local recipe calculator. Import/export, offline use, pantry exclusions, print/share, and saved plans provide the useful leverage from the brief. No provider key, remote recipe processing, or decorative AI feature was found.

## What would make this perfect

Make the keyboard shell available synchronously, prove immediate Tab reaches the skip link on repeated local and live runs, then rerun all 24 claim commands, the full suite/build, the public accessibility suite, and the cold mobile/desktop demo checks. No other product change was identified in this round.
