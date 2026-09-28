# PHYX Landing Page

Single-page site, in page order: primary navigation (overlaid on the hero), hero banner, services, how-it-works, and image-left-right. All markup lives in `index.html`, all styles in `styles.css` (grouped by section, with section-prefixed custom properties and class names to avoid collisions), and shared images/icons in `site-assets/`. Run locally with `node server.js` (port `4173`).

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

## Files

- `index.html` — all five sections' markup, in page order
- `styles.css` — shared button motion first, then all five sections' styles, grouped by section with prefixed tokens/classes (`nav-`/`.nav__…`, `hero-`/`.hero__…`, `how-`/`.how__…`, `services-`/`.services__…`, `split-`/`.split__…`) to avoid collisions
- `server.js` — static file server for local preview (port `4173`, override with `PORT` env var)
- `site-assets/` — all photos, icons, and logo exported from Figma across the five sections
