# Adversarial first-read review 5 — FAIL

Reviewed 2026-08-29 against <https://batch-cart.sociobot.in> and repository
commit `1b5fe3669e11aa49ae7a3234b7566d9a27a994f6`.

## Verdict

**FAIL.** The first read, one-click demo, all 24 declared claims, clean build,
privacy and offline behavior, prior repairs, routing, links, metadata, and
accessibility checks pass. Two pieces of interface copy still violate the
required plain-words rule: the landing page contains a generic mood label, and
the 404 page uses a metaphor in place of a plain heading. PASS requires zero
findings.

## Findings

### F-5-1 — MEDIUM — the 404 uses metaphor instead of naming the error

**Location/quote:** live `/missing-page`: eyebrow `This pane slipped away`; h1
`That page is not in the cart`.

**Why this fails:** Neither line plainly says that the page was not found. The
phrasing depends on the product's pane/cart metaphor, so the h1 does not make
sense as an isolated heading. The site-structure rule requires one plain-words
h1 per route, and the plain-words rule prohibits metaphor and brand-lore copy.
The HTTP status, title, explanatory sentence, and return action otherwise work.

**Concrete fix:** Delete the eyebrow and change the h1 to `Page not found`.
Keep `The address may be old or mistyped.` and `Return to Batch Cart`.

### F-5-2 — MINOR — the landing privacy section starts with a generic mood line

**Location/quote:** live home, immediately before `A calculator, not a recipe
service`: `You stay in charge` (`src/main.ts`, the `boundaries` section).

**Why this fails:** The line names neither the section nor a product fact and
would fit almost any product. It is a slogan, not information a visitor can
use. The following h2 and sentences already explain the section.

**Concrete fix:** Delete `You stay in charge`, or replace it with the factual
label `Recipe and privacy limits`.

## Cold first read before scrolling

I opened `/` in separate fresh Chromium contexts at 390 × 844 and 1440 × 900,
with `scrollY = 0`, before interacting with or scrolling the page.

| Question | Answer after the first screen | Exact live evidence |
| --- | --- | --- |
| What does this do? | It combines recipes into one shopping list. | `Combine recipes into one shopping list` |
| Who is it for? | Home cooks planning several dishes whose serving counts change. | `For home cooks planning several dishes who want correct amounts after every serving change.` |
| What should I click first? | **Try it with sample data**. | The named action is followed by `The demo opens three recipes with a ready shopping list.` |

The mandatory gate passes. At 390 px, the primary action occupied y=407–457,
the explanation ended at y=525, and the three facts ended at y=591. At 1440
px, the explanation and facts ended at y=835. Both cold loads returned 200 and
had no console or page errors in a normal service-worker-enabled context.

## Copy audit

Counts use whitespace-separated tokens; decorative separators are not words.
Hyphenated terms, prices, version numbers, and URLs each count as one token.
Headings, controls, navigation labels, and image text alternatives are included
because visitors encounter them independently. No item exceeds 22 words and no
banned marketing adjective appears. F-5-2 is the only landing-copy flag.

### Live landing page

| Exact copy | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | pass |
| Batch Cart | 2 | pass |
| Demo | 1 | pass |
| Cart | 1 | pass |
| Privacy | 1 | pass |
| Loading Batch Cart… | 3 | pass |
| Scale recipes for a dinner or event | 7 | pass |
| Combine recipes into one shopping list | 6 | pass |
| For home cooks planning several dishes who want correct amounts after every serving change. | 14 | pass |
| Try it with sample data | 5 | pass — result-naming action |
| Start with an empty cart | 5 | pass — result-naming action |
| The demo opens three recipes with a ready shopping list. | 10 | pass — `demo-seed-reset` |
| Works offline after your first visit | 6 | pass — `offline-reload` |
| Recipes stay in this browser | 5 | pass — `local-privacy` |
| Full cart free · Plus is US$12 once | 7 | pass — `free-core`, `hosted-checkout` |
| Glass recipe sheets and ingredients converge into one illuminated tray. | 10 | pass — image alternative text |
| Several recipes. | 2 | pass |
| One shopping list. | 3 | pass |
| Live calculation | 2 | pass |
| Add recipes and see one shopping list | 7 | pass |
| Change any serving count. | 4 | pass — `scaled-aggregation` |
| Matching amounts combine at once. | 5 | pass — `scaled-aggregation` |
| Combined result | 2 | pass |
| Shopping list 0 | 3 | pass — dynamic count included |
| Combined ingredients will appear here. | 5 | pass |
| Add a recipe to start the calculation. | 7 | pass |
| Print list | 2 | pass — result-naming action |
| Share list | 2 | pass — result-naming action |
| Export data | 2 | pass — result-naming action |
| Import data | 2 | pass — result-naming action |
| Recipes 0 | 2 | pass — dynamic count included |
| Add recipe | 2 | pass — result-naming action |
| Your recipes will stack here | 5 | pass — empty-state outcome |
| Add a recipe, then paste its ingredients one per line. | 10 | pass |
| Add your first recipe | 4 | pass — result-naming action |
| Batch Cart Plus | 3 | pass |
| Keep plans for repeat events | 5 | pass |
| Save named copies of this cart and restore them later. | 10 | pass — `plus-snapshots` |
| View Plus plans | 3 | pass — result-naming action |
| Three clear steps | 3 | pass |
| How the list comes together | 5 | pass |
| Paste each recipe | 3 | pass |
| Enter one ingredient per line with its quantity. | 8 | pass |
| Set every serving count | 4 | pass |
| Batch Cart scales each recipe from its original yield. | 9 | pass — `scaled-aggregation` |
| Check one combined list | 4 | pass |
| Matching weights and volumes merge. | 5 | pass — aggregation/conversion claims |
| Uncertain conversions stay visible. | 4 | pass — `uncertain-conversions` |
| You stay in charge | 4 | **flag — F-5-2: generic mood line** |
| A calculator, not a recipe service | 6 | pass |
| Batch Cart does not scrape recipe sites. | 7 | pass — `no-recipe-scraping` |
| Your recipes stay in this browser. | 6 | pass — `local-privacy` |
| Export a copy whenever you want. | 6 | pass — `data-export` |
| It converts units using fixed standard measures. | 8 | pass — `fixed-measures` |
| Mixed units are marked for your review. | 7 | pass — `uncertain-conversions` |
| Optional one-time license | 3 | pass |
| Save repeat plans with Plus | 5 | pass |
| US$12 once | 2 | pass — `hosted-checkout` |
| Keep named event plans and restore them for the next gathering. | 11 | pass — `plus-snapshots` |
| The full calculator, print, share, and export tools remain free. | 10 | pass — `free-core` |
| Buy Batch Cart Plus | 4 | pass — result-naming action |
| Sociobot opens its hosted checkout. | 5 | pass — `hosted-checkout` |
| Have a license? | 3 | pass |
| License token | 2 | pass |
| Restore purchase | 2 | pass — result-naming action |
| The free cart has no time limit. | 7 | pass — `free-core` |
| One list from every recipe. | 5 | pass |
| Terms | 1 | pass |
| Built by Param Factory (opens in a new tab) | 9 | pass |
| v1.0.7 · Generated artwork | 3 | pass |

### README

| Exact copy | Words | Result |
| --- | ---: | --- |
| Batch Cart | 2 | pass |
| Combine scaled recipes into one shopping list. | 7 | pass |
| Batch Cart is for households and event cooks planning several dishes at once. | 13 | pass |
| Paste ingredients, set the original and target servings for each recipe, and use one combined cart at the store. | 18 | pass |
| Live product | 2 | pass |
| One-click demo | 2 | pass |
| What Batch Cart does | 4 | pass |
| Scales each recipe from its original serving count. | 8 | pass — `scaled-aggregation` |
| Adds amounts when their units can be converted. | 8 | pass — aggregation/conversion claims |
| Keeps incompatible units separate and marks them for review. | 9 | pass — `uncertain-conversions` |
| Moves checked pantry items out of the shopping list. | 9 | pass — `pantry-exclusion` |
| Prints, shares, imports, and exports the active cart. | 8 | pass — action claims |
| Works offline after the first connected visit. | 7 | pass — `offline-reload` |
| Keeps recipe data in this browser. | 6 | pass — `local-privacy` |
| It is not sent to a server. | 7 | pass — `local-privacy` |
| The demo opens three recipes with a ready shopping list. | 10 | pass — `demo-seed-reset` |
| Use Reset demo to restore them. | 6 | pass — `demo-seed-reset` |
| Use Start for real to discard the sample and open an empty cart. | 13 | pass — demo isolation/deletion |
| Free cart and Batch Cart Plus | 6 | pass |
| The active cart, serving controls, pantry checks, print, share, import, and export stay free. | 14 | pass — `free-core` |
| Batch Cart Plus is US$12 once and adds named plan snapshots for repeat events. | 14 | pass — snapshot/checkout claims |
| Payment uses the Sociobot hosted checkout. | 6 | pass — `hosted-checkout` |
| Batch Cart stores a returned license in this browser and verifies a stored license at most once per day. | 19 | pass — returned-license/daily claims |
| Develop | 1 | pass |
| Requires Node.js 20 or newer. | 5 | pass — developer prerequisite |
| Open `http://localhost:5173`. | 2 | pass — developer instruction |
| The demo is at `http://localhost:5173/?demo=1`. | 5 | pass — developer instruction |
| Test and build | 3 | pass |
| `npm test` runs parser unit tests and Chromium browser tests. | 10 | pass — developer instruction verified below |
| Browser tests cover every claim in `.factory/claims.json`, offline reload, demo isolation, mobile layout, and serious accessibility findings. | 17 | pass — registry parity and suite verified below |
| `npm run build` writes the static site to `dist/`. | 9 | pass — verified below |
| Run one claim by its ID. | 6 | pass |
| Privacy and data ownership | 4 | pass |
| The real cart and the sample cart are kept apart. | 10 | pass — `demo-isolation` |
| Export JSON before clearing browser storage or moving devices. | 9 | pass |
| See `/privacy` and `/terms` in the app. | 7 | pass |
| Batch Cart uses no analytics, trackers, third-party runtime scripts, or CDN fonts. | 12 | pass — `private-runtime` |
| Deploy | 1 | pass |
| Deploy the contents of `dist/` to a static host. | 9 | pass — developer instruction |
| License | 1 | pass |
| MIT. | 1 | pass |
| See LICENSE. | 2 | pass |

Terminology is consistent: `recipe`, `shopping list`, `cart`, `pantry item`,
`Recipe serves`, `Cook for`, `saved plan`, `Batch Cart Plus`, `demo`, and
`license`. All controls use verbs that name their result.

## Demo, sandbox, privacy, and offline behavior

- The first-screen action opened `/?demo=1` in one click.
- The first demo viewport at 390 × 844 showed the persistent
  `Demo — sample data, nothing is saved` banner, **Reset demo**, **Start for
  real**, 12 calculated rows, and two complete rows at y=521–755.
- The three named recipes were Lemony tomato pasta, Herb market salad, and
  Garlic bread. Editing the first name and choosing **Reset demo** restored the
  original sample.
- **Start for real** removed `demo:batch-cart`, removed the banner, and opened
  an empty real cart. The clean isolation test separately seeded real data and
  confirmed demo edits never changed it.
- The manual demo flow contacted only `https://batch-cart.sociobot.in`. The
  clean `local-privacy`, `private-runtime`, and `no-recipe-scraping` tests also
  passed from fresh contexts with request recording.
- `offline-reload` passed from the clean clone and against the public origin:
  after service-worker control, the sample remained usable after offline
  reload.

The demo and sandbox requirements pass.

## Claims

From fresh clone `/tmp/batch-cart-review5-v6GRKz/repo`, I ran every exact `test`
command from `.factory/claims.json` separately after `npm ci`. The registry has
24 unique IDs and the browser sources have exactly one matching `@claim:` test
for each ID.

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
| `demo-seed-reset` | PASS |
| `editable-totals` | PASS |
| `local-privacy` | PASS |
| `private-runtime` | PASS |
| `license-verification-daily` | PASS |
| `license-token-only` | PASS |
| `license-revocation` | PASS |
| `returned-license-storage` | PASS |
| `no-recipe-scraping` | PASS |
| `offline-reload` | PASS |
| `plus-snapshots` | PASS |
| `free-core` | PASS |
| `local-data-deletion` | PASS |
| `hosted-checkout` | PASS |

No listed claim failed. A fresh cross-check of the landing page, populated demo,
privacy page, terms page, and README found no unlisted product claim.

## Earlier findings rechecked live and in code

I read every earlier `.factory/review-*.md`, `.factory/polish-*.md`, and the
handoff. Every earlier finding remains fixed; none is reopened.

| Earlier ID | Result | Fresh live and code evidence |
| --- | --- | --- |
| F-1-1 | fixed | Direct sample mode shows two populated rows in the phone viewport; the mobile regression passed live. |
| F-1-2 | fixed | Cart and recipe panes remain in one desktop grid row; CSS pins both columns to grid row 1 and the layout regression passed live. |
| F-1-3 | fixed | Returned-license storage remains registered with one matching passing test; unsupported repository/build claims remain absent. |
| F-1-4 | fixed | Every route and static 404 has route-specific title, description, canonical, Open Graph, and Twitter metadata; the metadata regression passed live. |
| F-1-5 | fixed | The five previously flagged jargon/ambiguous phrases remain absent. F-5-2 is a different generic slogan. |
| F-2-1 | fixed | The skip link and main landmark are in `index.html` before JavaScript; the public full suite and 20 immediate-Tab repeats passed. |
| F-2-2 | fixed | The unbounded word `accurate` remains absent from product and README copy. |
| F-2-3 | fixed | `demo-seed-reset` still checks all three recipes and Reset behavior; it passed independently and live. |
| F-2-4 | fixed | `editable-totals` still checks saved name, unit, quantity, reload, and export behavior; it passed independently. |
| F-2-5 | fixed | Unsupported receipt wording remains absent; the bounded hosted-checkout claim passed. |
| F-2-6 | fixed | `license-revocation` passed and keeps the free cart available after Plus removal. |
| F-2-7 | fixed | Unsupported checkout-terms/refund wording remains absent; the terms route and its links work. |
| F-2-8 | fixed | `free-core` still exercises pantry checks after the future-clock change and passed. |
| F-2-9 | fixed | The confirmed Delete local data control remains in `/privacy`; its claim removed both databases, plans, and license keys. |
| F-2-10 | fixed | The action explanation and all three facts end above y=591 on phone and y=835 on desktop; the viewport regression passed live. |
| F-2-11 | fixed | The static 404 retains the shared header, complete footer, return action, metadata, and real 404 status. Its wording is the separate F-5-1. |
| F-2-12 | fixed | `It converts units using fixed standard measures.` remains in place and the conversion claim passed. |
| F-2-13 | fixed | README headings remain `What Batch Cart does` and `Free cart and Batch Cart Plus`. |
| F-3-1 | fixed | Live navigation focused the privacy h1 and announced `Privacy — Batch Cart`; Back focused the home h1 and announced its title. |

## Structure, accessibility, links, and visual identity

- `/`, `/?demo=1`, `/demo`, `/privacy`, and `/terms` returned 200;
  `/missing-page` returned 404. `robots.txt`, `sitemap.xml`, and the manifest
  returned 200 and list/support every public product route.
- Each route has the required title pattern, one h1, one main landmark,
  `lang=en`, a route-specific description and canonical, Open Graph/Twitter
  metadata with a 1200 × 630 image, SVG favicon, and Apple-touch icon.
- Header and footer structure is consistent, including the static 404. The
  internal routes and Param Factory link returned 200. The Plus link returned
  303 and reached the Dodo hosted checkout with a final 200. Mail links are
  explicit. No dead link was found.
- The public 49-test browser suite passed. Playwright axe checks found no
  serious or critical issue on home, demo, privacy, terms, or 404. The factory
  URL verifier passed home and demo with no console errors, one h1, one main,
  complete image alternatives, and labeled buttons.
- The live response sends CSP, `frame-ancestors`, referrer policy, permissions
  policy, and `nosniff` as headers. Reduced motion, 390 px overflow, 200% text,
  touch targets, keyboard use, and offline reload passed the browser suite.
- The dark aubergine field, acid-lime cart plane, clipped translucent recipe
  panes, self-hosted Fraunces/Atkinson pairing, and original culinary artwork
  match `.factory/design.md`. The product is visually distinct and is not a
  generic SaaS template.

The routing behavior is complete. F-5-1 concerns the 404's words, not a broken
route or missing error design.

## Quality gates

- Fresh `npm ci`: PASS, zero reported vulnerabilities.
- Every exact claims command: PASS, 24/24.
- Fresh `npm test`: PASS, 13 unit tests and 49 Chromium tests.
- Fresh `npm run build`: PASS; `dist/index.html` exists.
- Initial application JavaScript: 30.52 kB raw / 10.36 kB gzip; CSS: 20.35 kB
  raw / 5.35 kB gzip.
- Public-origin Playwright suite: PASS, 49/49 with one worker.
- Public immediate-Tab regression: PASS, 20/20 serial repeats.
- `git diff --check`: PASS.

## Missed leverage

No obvious missing AI feature is implied. Recipe scaling, aggregation, and unit
conversion are deterministic; sending recipe data to a model would add privacy
and reliability costs without helping the core calculation. The product has the
brief's expected import/export, print/share, offline, pantry, and saved-plan
features. No provider key, decorative AI feature, or unexplained remote model
call is present.

## What would make this perfect

Replace the 404 metaphor with `Page not found`, and remove or factualize `You
stay in charge`. Then rerun the landing/404 copy audit and route accessibility
checks. No functional, demo, claim, privacy, offline, structural, or visual
change was otherwise identified.
