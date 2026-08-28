# Batch Cart visual thesis

## Direction

**Luminous glass data landscape.** Batch Cart turns several messy recipe lists into one trustworthy calculation. The interface treats each recipe as a translucent glass pane and the combined list as a crisp, illuminated work surface below it. Thin measurement lines, spectral edge highlights, and soft depth make conversions visible without making the utility feel like a dashboard template.

This is a dark-first, single-mode product. A deep aubergine background resembles an evening kitchen window. Acid-lime totals and apricot warnings echo produce labels and market pen. The mode is deliberate: luminous layers need a dark field to remain legible and recognisable.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| `--ink-950` | `#120D18` | page background |
| `--ink-900` | `#1B1424` | raised work surface |
| `--glass` | `rgba(255,255,255,.075)` | recipe panes |
| `--line` | `#5C5269` | borders and measurement rules |
| `--paper` | `#FFF9EE` | primary text |
| `--muted` | `#C8BED1` | supporting text |
| `--lime` | `#CFF58A` | primary action and totals |
| `--lime-ink` | `#172006` | text on lime |
| `--apricot` | `#FFB38A` | uncertainty and warning |
| `--rose` | `#FF9EB5` | destructive states |
| `--mint` | `#8EF0CC` | saved and complete states |

All body text combinations meet 4.5:1 contrast. Color is paired with labels, icons, or patterns.

## Type and spacing

- Display: `Fraunces` variable, self-hosted subset, used sparingly for the job headline and numeric totals. Its soft, culinary forms contrast with exact calculations.
- Body: `Atkinson Hyperlegible`, self-hosted, chosen for ingredient names and quantities at phone sizes.
- Fallbacks remain readable if the files do not load.
- Type scale: 14, 16, 18, 24, 36, and clamp(44–76) px.
- Spacing follows an 8 px rhythm with 4 px only inside dense quantity controls.
- Body measure stays below 68 characters.

## Shape and interaction grammar

Recipe panes use clipped diagonal corners, like stacked deli labels seen through glass. Ingredient rows use horizontal measurement rules instead of boxed cards. The primary action is a filled lime lozenge. Secondary actions are glass buttons. The combined cart is the brightest plane because it is the output people take to the shop.

Changing servings sends a brief light sweep through affected totals. New rows rise 8 px from the recipe pane that created them. All feedback also includes text in a polite live region.

## Motion policy

- Interface changes use 180–240 ms opacity and transform transitions.
- One slow, non-looping parallax shift on the hero art establishes depth.
- No decorative element loops.
- With `prefers-reduced-motion: reduce`, transforms, scroll effects, and smooth scrolling are removed; state changes are instant or opacity-only.

## Responsive policy

At 390 px, the artwork crops into a shallow atmospheric band, controls stack, and the cart becomes the first full-width work surface after the hero. At wide sizes, recipe panes and cart form an asymmetric 7/5 column workspace. Sticky behavior is avoided on small screens so the keyboard never hides inputs.

## Original asset plan and provenance

The hero is an original generated still: floating translucent recipe panes, measured produce forms, and ingredient lines converging into a luminous shopping tray. It contains no UI text, people, brands, logos, or copyrighted characters. UI icons and the wordmark are hand-authored SVG.

### Hero prompt sheet

- Use case: stylized-concept
- Asset type: wide landing hero atmosphere
- Subject: an abstract top-down culinary calculation landscape; translucent glass recipe sheets with engraved measurement ticks; small sculptural forms suggesting lemon, tomato, flour, herbs; ingredient streams converging into one illuminated market tray
- World/materials: smoked glass, frosted acrylic, brushed dark metal, subtle paper fibers, refracted edges
- Light/lens: cinematic macro product photography, deep focus at the central tray, soft aubergine darkness, lime and apricot edge lighting
- Palette words: deep aubergine, warm ivory, acid lime, soft apricot, restrained mint
- Composition: 3:2 wide; active detail on the right two-thirds; calm dark negative space at upper left; no readable text
- Negative list: people, hands, brands, logos, letters, numbers, watermarks, grocery store aisle, generic gradient blobs, neon cyberpunk city, clutter

Generated with the factory image model (`factory-image`) on 2026-08-28 using `/opt/fleet/lib/gen-image.sh`. Source prompt is stored beside the source PNG. The optimized WebP is shipped as product artwork. Generated imagery is original to Batch Cart.

## Paid tier

The free product includes the full active cart, local recipe storage, pantry exclusions, print/share, and export. **Batch Cart Plus is US$12 once** and adds named plan snapshots that can be restored for recurring events. The tier uses the Sociobot license flow; accessibility and data ownership are never gated.
