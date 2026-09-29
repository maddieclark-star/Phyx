# PHYX Landing Page

Single-page site, in page order: primary navigation (overlaid on the hero), hero banner, services, how-it-works, image-left-right, article section, FAQ/accordion, and footer. All markup lives in `index.html`, all styles in `styles.css` (grouped by section, with section-prefixed custom properties and class names to avoid collisions), and shared images/icons in `site-assets/`. Interaction JS is split by concern: `scroll-effects.js` (eyebrow reveal) and `accordion.js` (FAQ toggle). Run locally with `node server.js` (port `4173`).

The one deliberate exception to the per-section prefixing is the shared `.btn-label` button motion at the top of `styles.css` — see [Button Motion](#button-motion).

---

## Primary Navigation — Transparent Variant

Source: [Figma — PHYX Website Design](https://www.figma.com/design/7biT12cuYhYxDckJ5Rargr/PHYX-Website-Design?node-id=10178-9636), node `10178:9636`.

Transparent state of the primary nav — no background fill, designed to sit on top of the dark hero image with light/white content so it stays legible. Implemented as `.nav`, absolutely positioned over the top of `.hero` (`position: absolute; top: 0`) so it overlays the hero's dark gradient rather than adding page height.

Nav links (in order): How it works, Explore, Labs, Academy, About.

- `.nav__menu-group` — logo (`site-assets/phyx-logo.svg`, white fill, 144.31×27.11px) + links, `gap: var(--nav-spacing-menu-logo)`.
- `.nav__utilities` → `.nav__ctas` — "Patient login" (light-teal pill) and "Start assessment" (white pill).

## Hero Banner

Source: [Figma — PHYX Website Design](https://www.figma.com/design/7biT12cuYhYxDckJ5Rargr/PHYX-Website-Design?node-id=10283-17232), node `10283:17232`.

Full-bleed hero section: dark-teal headline block fading into a pale rounded photo card, with four floating "USP" badges connected by an arc line.

**Known deviations from the Figma source:**
- **Background aurora blobs**: Figma drives the glow behind the headline with a WebGPU shader effect, impractical for a static page. Replaced with two blurred `radial-gradient` pseudo-elements (`.hero__glow--a`, `.hero__glow--b`).
- **Display heading font**: Figma specifies `P22 Mackinac Pro` (licensed, unavailable via Google Fonts). Falls back to `Fraunces` then `Georgia`. Add `P22 Mackinac Pro` as `@font-face` later and it'll take over automatically (`--hero-font-heading` lists it first).

Structure: `.hero__header` (glows + `.hero__row` with heading/subtext + CTAs) above `.hero__media` (cropped photo, sky overlays, arc line, four positioned `.hero__badge` pills — doctors, care plan, clinical review, pharmacy).

Copy: eyebrow "Doctor-led health, personalised" → heading "The strongest version of you." → subtext "Diagnostic testing, personalised care pathways and ongoing clinical support, tailored to you." → CTAs "Start your free assessment" / "Talk to a phyx nurse".

## How It Works

Source: [Figma — PHYX Website Design](https://www.figma.com/design/7biT12cuYhYxDckJ5Rargr/PHYX-Website-Design?node-id=10283-17304), node `10283:17304` ("Page cards").

"How PHYX works" eyebrow + headline + CTA above a 3-up grid of step cards. Each card is a tall photo with a cream content panel overlapping the photo's bottom edge by 48px.

**Known deviations from the Figma source:**
- **"01/02/03" watermark numerals**: in Figma these sit outside each card's clipped bounds and never render statically. Implemented here as a hover-reveal instead — each numeral sits above the card's clipped frame and slides down into view on hover, using the same position/typography Figma defines for card 1's numeral (the one instance that does render in the static design).
- Per-card **background glow ellipse** still omitted — same off-bounds issue, no hover behaviour defined for it in Figma to base a treatment on.
- **Step marker icon**: Figma's dot contains a ~2.7px arrow glyph, imperceptible at that size — implemented as a plain dot (`dot-step.svg`).
- **Card 2 background**: Figma composites two full-bleed image fills where the top layer fully hides the bottom one — only the visible top crop was kept.
- **Card hover state**: image zoom (`scale(1.1)`) and the numeral slide-in are implemented consistently across all three cards; Figma's hover component/timing wasn't available via the API, so this reuses the Services section's shared `500ms cubic-bezier(0.22, 1, 0.36, 1)` transition.
- Same `P22 Mackinac Pro` → `Fraunces` → `Georgia` font fallback as the hero.

Copy: eyebrow "How PHYX works" → heading "Simple, considered, doctor-led." → button "Start your free assessment" → Step 1 "Tell us your focus", Step 2 "Free 15-min clinical review", Step 3 "Your personalised care" (each with supporting body copy, see `index.html`).

## Services Section

Source: [Figma — PHYX Website Design](https://www.figma.com/design/7biT12cuYhYxDckJ5Rargr/PHYX-Website-Design?node-id=10283-17288), node `10283:17288` ("Explore"). Hover reference: node `10209:11729` ("USP").

"Where would you like to start?" headline over a 4+3 grid of seven photo service cards. On hover, each card's corner dot grows into a white arrow badge, the photo zooms slightly, and a caption slides up from beneath the card's bottom edge.

**Known deviations from the Figma source:**
- **Caption copy**: Figma's hover component only carries authored copy for one example (Metabolism). Captions for the other six cards were authored here to match tone/format — swap in real copy if/when added to Figma.
- **Longevity / Vitality background layers**: Figma composites a second, near-nonsensically-scaled image fill on these two cards (an authoring artifact) — only the correctly-scaled photo was kept.
- **Hover motion timing**: no Smart Animate keyframe data was available via the API; implemented as a single shared `500ms cubic-bezier(0.22, 1, 0.36, 1)` transition across zoom/scrim/icon/caption.
- Same `P22 Mackinac Pro` → `Fraunces` → `Georgia` font fallback as the other sections.

Copy: eyebrow "Explore" → heading "Where would you like to start?" → subtext "Choose the area that matters most. Every consult is tailored to what you want to work on." → cards: Metabolism, Longevity, Performance, Recovery, Mood & Sleep, Vitality, Gut & Immunity (see `index.html` for captions).

## Image Left Right

Source: [Figma — PHYX Website Design](https://www.figma.com/design/7biT12cuYhYxDckJ5Rargr/PHYX-Website-Design?node-id=10283-17316), node `10283:17316` ("Image Left Right"). Implemented as `.split` / `.split__…`, sitting directly under the How It Works section.

Two equal columns: a rounded photo on the left, and an eyebrow → headline → body → check-bullet list on the right. Verified against Figma at 1440: section 1440×744.5, each column 640×552.5, headline block 576×348.

**Sizing notes:**
- **Beyond 1440px**: the section itself is full-bleed; `.split__container` caps at Figma's `max-width: 1920px` and centres, so at 2560 the columns grow to 960 each and then stop. Note the adjacent `.how__card` is *unbounded* — if the two should agree at very wide viewports, drop `--split-max-width`.
- **Column basis**: both columns use `flex: 1 1 50%`, not `1 0 0`. With the global `box-sizing: border-box`, a `0` basis makes the content column's 64px `padding-left` its effective floor, which skews the split to 608/672 instead of 640/640.

**Known deviations from the Figma source:**
- **Photo crop**: Figma stacks five copies of the same photo in the image frame (an authoring artifact); only the topmost, opaque one renders. Reproduced with the same transform it carries — scaled to `173.66%` of the frame height and offset `-8.96%` — against the existing high-res `split-made-properly.jpg` rather than re-exporting the flattened 1x frame.
- **Aqua glow**: the blurred `#79DDE2` blob over the photo's lower left is a Figma layer with a baked-in Gaussian blur. Exported as-is to `site-assets/split-glow.svg` and positioned by the centre point / 90° rotation Figma gives it, expressed in percentages so it scales with the frame.
- **CTA button**: the `CTA Container` frame is `hidden` in Figma, so no button was implemented here.
- Same `P22 Mackinac Pro` → `Fraunces` → `Georgia` font fallback as the other sections.

Copy: eyebrow "Made properly, in Australia" → heading "The difference is in how it's made." → body → bullets "Australian owned and operated", "Sterile compounding pharmacy", "Doctor-led at every step".

## Article Section

Source: [Figma — PHYX Website Design](https://www.figma.com/design/7biT12cuYhYxDckJ5Rargr/PHYX-Website-Design?node-id=10283-17346), node `10283:17346` (named "FAQs" in Figma, but its content — "From the Academy" eyebrow, "Learn more" heading, 3-up article/photo cards — is an article/content-preview grid, not FAQs). Implemented as `.article` / `.article__…`, sitting directly under the Image Left Right section.

"From the Academy" eyebrow + "Learn more" heading + "View all" button above a 3-up grid of article cards, each a photo with a category pill, hover-reveal arrow badge, and title/description pinned to the bottom behind a progressive blur + colour scrim. Verified against Figma at 1440: inset `1408×756` (16px outer margin), content wrap `1200×516` (104px grid margin), each card `392×384`, image wrap `-39/-168.53, 431(–432)×566` relative to its card.

**Sizing notes:**
- **Inset container**: `.article__inset` is unbounded (grows edge-to-edge with the viewport, like `.how__card`), background `#FBF8F1` (Figma's own `#EAEEEF` was swapped for this per design direction). `.article__container` caps at Figma's `max-width: 1920px` and centres inside it, so the header/grid stop growing past 1920 while the inset backdrop keeps filling the viewport — same pattern as `.split__container`.
- **Card aspect ratio**: `392 / 384` (from the 1440 reference), so cards scale fluidly with the grid rather than clipping at fixed pixel dimensions.

**Progressive blur (bottom scrim):** Figma draws this as a single uniform `backdrop-blur(39.5px)` box with a colour gradient (`rgba(18,46,48,0)` → `rgba(18,46,48,0.8)`) over the bottom `208px` of the `384px` card (54.17%). Implemented instead with the Services section's proven 5-layer masked-blur technique (`.article-card__blur-layer--1..5`, blur 2→28px, masked to progressively taller bands) *plus* a `.article-card__scrim` colour overlay reaching the requested 80% max opacity of `#122E30` — this reads as genuinely graduated blur rather than a single hard-edged blur box, while still hitting Figma's colour/height numbers.

**Known deviations from the Figma source:**
- **Photo layering**: each card's "Image" frame stacks 2–3 copies of a photo in Figma (an authoring artifact seen elsewhere in this file — see Image Left Right, How It Works); only the topmost, fully-covering layer was kept per card (`article-card-1.jpg`, `article-card-2.jpg`, `article-card-3.jpg`).
- **Arrow badge hover**: the corner icon is Figma's `Icon/Arrow/Upward` component at `6px` containing a `~2.7px` arrow glyph — imperceptible at rest, same issue as the How It Works step marker. Rather than flattening it to a plain dot, it reuses the Services card's grow-into-arrow-badge hover treatment (same component, same `500ms cubic-bezier(0.22, 1, 0.36, 1)` timing), since these are clickable article cards with the same interaction need.
- **Category pill copy / card title+body**: Figma only has placeholder copy ("category", "Title Text Goes Here...", lorem ipsum) — kept verbatim, swap in real copy if/when added to Figma.
- Same `P22 Mackinac Pro` → `Fraunces` → `Georgia` font fallback as the other sections.

Copy: eyebrow "From the Academy" → heading "Learn more" → button "View all" → 3 cards (placeholder category/title/body, see `index.html`).

## FAQ / Accordion Section

Source: [Figma — PHYX Website Design](https://www.figma.com/design/7biT12cuYhYxDckJ5Rargr/PHYX-Website-Design?node-id=10304-2318), node `10304:2318` ("Section 1", containing frames "Accordion default" `10304:1968` and "Accordion open" `10304:2130`). Implemented as `.faq` / `.faq__…` / `.faq-item__…`, sitting directly under the Article section.

Dark glass-panel card: "Common questions" eyebrow + "Straight answers" heading above six accordion items sitting over an aurora-glow gradient background, with a "Ready when you are." CTA banner below. First item is open by default; each item toggles independently on click (plus icon crossfades to minus). Because the panel animates real height, the items below it genuinely cascade down/up as it opens and closes.

**Accordion open/close motion** is driven by `accordion.js` measuring `scrollHeight` and transitioning between two explicit pixel heights, settling to `height: auto` on `transitionend` so the panel stays reflow-safe afterwards. Two CSS-only alternatives were tried first and rejected:
- **CSS grid `0fr → 1fr`** — the initial implementation. Safari doesn't reliably interpolate the `fr` unit, so it snapped open instead of animating; this was the "jolting" behaviour.
- **`max-height`** — animates a value the content never actually reaches, so the easing curve reads wrong and the close is front-loaded.

Closing needs the height frozen to an explicit px value (plus a forced reflow) *before* collapsing to `0`, since a transition can't interpolate away from `auto`. Under `prefers-reduced-motion` the height snaps with no transition.

**Aurora background:** Figma renders this as a WebGPU shader; `get_design_context` instead returned three pre-blurred SVG exports (`faq-glow-a/b/c.svg` — one shape reused/rotated twice for b/c) at fixed positions/rotations. Reproduced pixel-for-pixel: each blob's Figma-given left/top/width/height was converted to a percentage of the card's own 1408px reference width (its width at the 1440px design viewport), then placed inside a `.faq__aurora` wrapper (`width: 100%; aspect-ratio: 1/1`) so the art scales fluidly with the card's width — exactly like `.split__glow` — but stays anchored near the top regardless of how tall the accordion list grows as items open (a direct percentage-of-height wrapper would have made the glows balloon or shrink with content height, which Figma's own two states show does *not* happen — both frames position the three blobs identically despite the open frame being ~1.9× taller).

**CTA banner (`.faq-banner`):** "Ready when you are." — full-bleed photo, directional gradient scrim for text legibility, and two pill CTAs reusing the shared `.btn-label` motion. Its eyebrow uses the shared `.eyebrow-reveal` fade/lift like every other section.

Two layout details worth keeping in mind if this is edited:
- **The 24px gutter.** The banner sits 24px inside the card on the left, right and bottom. The card's horizontal padding is wider than that, so the banner is pulled back out with a negative margin — which requires `align-self: stretch`, **not** `width: 100%`. On a centered flex item with a definite width the two negative margins just cancel out and nothing widens (this silently failed in the first pass). `--faq-banner-bleed` is re-declared per breakpoint as `card padding-x − 24px`, and the *bottom* gutter is the card's own `padding-bottom: 24px` — so don't override that in a media query.
- **The photo uses `object-fit: cover`,** not Figma's explicit `width`/`height` percentages. Those scale the two axes independently, so the photo visibly warped as the banner's aspect ratio drifted from the 1368×494 reference (very noticeable on wide screens). `object-position: 85% 28%` keeps the subject framed as in Figma.

**Known deviations from the Figma source:**
- **Banner content alignment**: Figma positions the banner's "Hero" content block with a centering transform *and* renders it looking bottom-pinned in the static export. Implemented as vertically centered / left-aligned per design direction.
- **Answer copy normalization**: Figma's own first accordion instance (open by default) styles its answer text with an explicit 70%-opacity layer; the other five (only visible once expanded) omit that opacity class but read identically in the rendered screenshots. Applied uniformly (`color: #e9e9e9; opacity: 0.7`) across all six for consistency.
- **No `backdrop-filter` on the accordion list**: Figma puts `blur(50px)` on the list frame. Over the aurora art that reads as a flat, visibly darker rectangle sitting on top of the glow rather than frosted glass, so it was dropped — the items keep their translucency from their own `rgba(255,255,255,0.14)` fill.
- Same `P22 Mackinac Pro` → `Fraunces` → `Georgia` heading font fallback as the other sections.

Copy: eyebrow "Common questions" → heading "Straight answers" → 6 Q&As (placeholder Lorem ipsum answers, see `index.html`) — "Is the 15-minute consult really free", "Who will I be speaking with?", "Do I have to buy anything after the consult?", "What happens if the doctor says PHYX isn't right for me?", "Is PHYX available across Australia?", "How is PHYX different from what I can buy online?". Banner: eyebrow "Doctor-led health, personalised" → heading "Ready when you are." → "Book a free 15-minute consult with an Australian-registered nurse. No obligation." → CTAs "Start your free assessment" / "Talk to a phyx nurse".

## Footer

Source: [Figma — PHYX Website Design](https://www.figma.com/design/7biT12cuYhYxDckJ5Rargr/PHYX-Website-Design?node-id=10283-17478), node `10283:17478` ("Footer"). Implemented as `.footer` / `.footer__…`, sitting directly under the FAQ CTA banner — outside `<section class="faq">`, as a real `<footer>` element.

Brandmark + blurb on the left, three link columns (Explore / Company / Legal) on the right, then a gradient hairline divider, the full-width PHYX wordmark, and a bottom row of accreditations and copyright. Verified against Figma at 1440: section `1441×769.7` (Figma `1440×768.507`), wordmark `1281×240.7` (Figma `1280×240.507`), brandmark artwork `71.05px` inside its `74px` frame.

**Brandmark rotation:** the circle device turns a full 360° about its vertical axis, on a loop, with a hold at each end — `@keyframes footer-brandmark-spin` over a `5s` cycle: hold at `0deg` for `0→1.1s` (0–22%), one full revolution `1.1→2.8s` (22–56%), hold at `360deg` for `2.8→5s` (56–100%). The doubled keyframe stops (`0%, 22%` and `56%, 100%`) are what create the pauses. Eased with `cubic-bezier(0.65, 0, 0.35, 1)` so the turn starts and settles softly rather than running at constant speed.

- The frame carries `perspective: 600px` so the turn reads as a coin flip with depth instead of a flat horizontal squash.
- The animation is on the `<img>`, not the frame: the artwork is inset inside its 74px frame in Figma (2.71% left, 2.6% top), so animating the image keeps the circle's own centre as the rotation origin rather than the frame's.
- No Figma motion data existed for this (`get_motion_context` returned no animated nodes) — the timing was authored to the brief.
- Suppressed under `prefers-reduced-motion`.

**Known deviations from the Figma source:**
- **Wordmark dot colour**: the vector asset `get_design_context` returned fills the dot above the X with `#E9F9FA`, but Figma's own render of the node — and the node-level SVG export — both give `#79DDE2` (the file's `surface-colour/surface-tertiary` token, which *is* in the footer's variable set; `#E9F9FA` is not). The one fill value in `footer-wordmark.svg` was corrected to `#79DDE2` to match the design.
- **Divider**: Figma draws a 1px line with a `#1FC7CF` → white gradient at 64% stroke opacity. Implemented as a CSS gradient rather than an SVG so it scales with the container; the white end simply fades out against the footer's own background.
- **Column headings use the shared `.eyebrow-reveal`**: they're the same `Eyebrow C2` component every section eyebrow uses, so they get the same scroll-in fade/lift. All three reveal together.
- **Link hover**: Figma defines a `Body/Sm Body - Link` text style but no hover state. Links shift from `--footer-text-secondary` to `--footer-text-primary` on hover/focus, reusing the shared button colour timing.
- **Menu items are real `<a href="#">` links** in three `<nav>` landmarks, rather than the plain text frames Figma has — swap in real destinations when routes exist.

**Sizing notes:** the brand column is `flex: 0 0 auto` with a fixed `320px` right gutter (Figma's own `pr-[320px]`), which is what pushes the three link columns into the right half; they split the remainder as `flex: 1 1 0` with a `160px` floor. At ≤1200 the gutter drops to `120px` and padding to `48px`; at ≤1024 the menu wraps, the brand column goes full width, and the bottom row stacks.

Copy: blurb "Doctor-led health, made in Australia. / AHPRA-registered doctors and a sterile compounding pharmacy." → Explore (Metabolism, Performance, Recovery, Mood & Sleep, Vitality, Gut & Immunity), Company (How it works, Labs, Academy, About, Contact), Legal (Privacy, Terms, TGA compliance) → bottom "AHPRA-registered · Sterile compounding pharmacy" / "© PHYX 2026. Australian owned."

## Button Motion

Source: [Primary](https://www.figma.com/design/7biT12cuYhYxDckJ5Rargr/PHYX-Website-Design?node-id=10297-1185) (node `10297:1185`) and [Secondary](https://www.figma.com/design/7biT12cuYhYxDckJ5Rargr/PHYX-Website-Design?node-id=10297-1186) (node `10297:1186`).

Every button on the page shares one hover treatment. The Figma `Button / C2` component stacks **two identical label layers** inside a one-line, `overflow: clip` frame — so on hover the stack scrolls up exactly one line-height and the second copy lands where the first was, slot-machine style.

Implemented as the unprefixed `.btn-label` / `.btn-label__track` pair at the top of `styles.css`:

```html
<span class="btn-label"><span class="btn-label__track">
  <span>Label</span><span aria-hidden="true">Label</span>
</span></span>
```

- Each button sets `--btn-line` to its own `line-height`, so the clip height and the travel distance always equal one line of that button's type (all three sizes currently resolve to 24px).
- The second copy is `aria-hidden` so screen readers don't announce the label twice.
- Motion: `transform 460ms cubic-bezier(0.34, 1.56, 0.64, 1)` — a back-out curve for the subtle bounce. Colour crossfades separately on `320ms cubic-bezier(0.22, 1, 0.36, 1)` so the bounce doesn't drag the fill with it. Suppressed under `prefers-reduced-motion`.
- Hover fills: primary `#A5E9EC` → `#79DDE2`, secondary `#FFFFFF` → `#79DDE2` (shared `--btn-hover-accent`). Also applied on `:focus-visible` for keyboard parity.

The curve overshoots roughly 2px past the line, briefly exposing a sliver below the second copy. That sliver lands in the line box's descender space, so nothing legible is clipped.

## Eyebrow Scroll Reveal

Each section's eyebrow (hero, services, how, split, article, faq, and the FAQ CTA banner — not the per-card `step-card__eyebrow`, which already has its own hover treatment) fades and lifts 16px the first time it scrolls into view, via `scroll-effects.js`.

- Markup: the shared, unprefixed `eyebrow-reveal` class sits alongside each section's own `*__eyebrow` class.
- `scroll-effects.js` adds `js-reveal-ready` (the actual hidden/transition state) at runtime, then uses one `IntersectionObserver` (40% visible threshold) to add `is-visible` and unobserve once triggered — a one-shot reveal, not a repeating scroll effect.
- Starting from a plain, visible `.eyebrow-reveal` and only opting into the hidden state once JS confirms it can run (and un-hides it entirely if `prefers-reduced-motion: reduce`) means content never gets stuck hidden if the script fails to load.
- Motion: `700ms cubic-bezier(0.22, 1, 0.36, 1)` — the same ease-out curve used for hover transitions elsewhere on the page, reused here for consistency (no reveal-specific timing was available from Figma).

## Files

- `index.html` — all sections' markup, in page order
- `styles.css` — shared button motion and eyebrow scroll reveal first, then every section's styles, grouped by section with prefixed tokens/classes (`nav-`/`.nav__…`, `hero-`/`.hero__…`, `how-`/`.how__…`, `services-`/`.services__…`, `split-`/`.split__…`, `article-`/`.article__…`, `faq-`/`.faq__…`, `footer-`/`.footer__…`) to avoid collisions
- `scroll-effects.js` — IntersectionObserver-driven eyebrow reveal (see above)
- `accordion.js` — FAQ open/close height animation (see above)
- `server.js` — static file server for local preview (port `4173`, override with `PORT` env var)
- `site-assets/` — all photos, icons, and logos exported from Figma across every section
