# Primary Navigation — Transparent Variant

Source: [Figma — PHYX Website Design](https://www.figma.com/design/7biT12cuYhYxDckJ5Rargr/PHYX-Website-Design?node-id=10178-9636), node `10178:9636`.

This is the transparent state of the primary navigation — no background fill, designed to sit on top of a dark hero image with light/white content so it stays legible.

## Design tokens (CSS custom properties)

```css
:root {
  /* Color */
  --nav-surface-primary: #ffffff;
  --nav-surface-accent-light: #a5e9ec;
  --nav-surface-accent-dark: #122e30;
  --nav-cta-text-secondary: #122e30;
  --nav-text-primary-invert: #ffffff;

  /* Typography */
  --nav-font-body: 'DM Sans', sans-serif;
  --nav-font-button: 'DM Mono', monospace;

  --nav-text-body-sm: 16px;
  --nav-line-height-body-sm: 24px;
  --nav-font-weight-body-strong: 500;

  --nav-text-button-sm: 14px;
  --nav-line-height-button-sm: 24px;
  --nav-letter-spacing-button-sm: 0.28px;
  --nav-font-weight-button: 500;

  /* Spacing */
  --nav-spacing-150: 12px;   /* gap between CTA buttons */
  --nav-spacing-300: 24px;   /* gap between nav links */
  --nav-spacing-400: 32px;   /* gap between menu group and utilities */
  --nav-spacing-menu-logo: 48px; /* gap between logo and menu links */

  /* Layout */
  --nav-max-width: 1440px;
  --nav-padding-x: 80px;
  --nav-height: 72px;
  --nav-inner-padding-y: 12px;

  /* Radius */
  --nav-radius-rounded: 1000px; /* pill shape */

  /* Button padding */
  --nav-button-padding-x: 16px;
  --nav-button-padding-y: 10px;
  --nav-button-gap: 4px;
}
```

## Structure

- `.nav` — full-width bar, `background: transparent`, horizontal padding `var(--nav-padding-x)`, height `var(--nav-height)`.
  - `.nav__container` — flex row, `justify-content: space-between`, `align-items: center`, fills the nav bar, `border-radius: var(--nav-radius-rounded)`.
    - `.nav__menu-group` — flex row, `gap: var(--nav-spacing-menu-logo)`, contains logo + links.
      - `.nav__logo` — `144.31px × 27.11px`, PHYX logo SVG (white fill), see `assets/phyx-logo.svg`.
      - `.nav__links` — flex row, `gap: var(--nav-spacing-300)`.
        - `.nav__link` — `font: var(--nav-font-weight-body-strong) var(--nav-text-body-sm)/var(--nav-line-height-body-sm) var(--nav-font-body)`, `color: var(--nav-text-primary-invert)`.
    - `.nav__utilities` — flex row, `gap: var(--nav-spacing-400)`.
      - `.nav__ctas` — flex row, `gap: var(--nav-spacing-150)`.
        - `.nav__button` — pill button, `padding: var(--nav-button-padding-y) var(--nav-button-padding-x)`, `border-radius: var(--nav-radius-rounded)`, label font: `var(--nav-font-weight-button) var(--nav-text-button-sm)/var(--nav-line-height-button-sm) var(--nav-font-button)`, `letter-spacing: var(--nav-letter-spacing-button-sm)`, `text-transform: uppercase`.
          - `.nav__button--primary` — `background: var(--nav-surface-accent-light)`, `color: var(--nav-cta-text-secondary)`. Label: "Patient login".
          - `.nav__button--secondary` — `background: var(--nav-surface-primary)`, `color: var(--nav-cta-text-secondary)`. Label: "Start assessment".

## Nav links (in order)

1. How it works
2. Explore
3. Labs
4. Academy
5. About

## Files

- `index.html` — markup
- `styles.css` — implementation using the tokens above
- `assets/phyx-logo.svg` — logo asset (white fill), exported from Figma
