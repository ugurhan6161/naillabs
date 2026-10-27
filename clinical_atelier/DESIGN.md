---
name: Clinical Atelier
colors:
  surface: '#fff8f4'
  surface-dim: '#e0d9d4'
  surface-bright: '#fff8f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf2ed'
  surface-container: '#f4ece7'
  surface-container-high: '#eee7e2'
  surface-container-highest: '#e9e1dc'
  on-surface: '#1e1b18'
  on-surface-variant: '#4c4546'
  inverse-surface: '#33302d'
  inverse-on-surface: '#f7efea'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#765841'
  on-secondary: '#ffffff'
  secondary-container: '#fdd5b8'
  on-secondary-container: '#785b43'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#2c1605'
  on-tertiary-container: '#a07d64'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#e6bfa2'
  on-secondary-fixed: '#2b1705'
  on-secondary-fixed-variant: '#5c412b'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#e8bea3'
  on-tertiary-fixed: '#2c1605'
  on-tertiary-fixed-variant: '#5d402c'
  background: '#fff8f4'
  on-background: '#1e1b18'
  surface-variant: '#e9e1dc'
typography:
  display-hero:
    fontFamily: Outfit
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Outfit
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Outfit
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Outfit
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.14em
  label-md:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies a clinical luxury aesthetic tailored for high-end professional nail education and medical-grade aesthetic equipment. It fuses surgical precision with editorial cosmetics refinement. The brand speaks to master technicians, salon academy directors, and high-standard beauty specialists who demand surgical rigor wrapped in tactile sophistication.

The visual style blends **Radical Minimalism** with **Tactile / Editorial Luxury**:
- **Generous negative space:** Uncluttered layouts designed like gallery exhibit labels and high-end dermatological monographs.
- **Surgical discipline:** Restrained, hairline borders, ultra-fine circular rings referencing precision metallic instrumentation, and high-legibility typographic geometry.
- **Organic warm tactility:** Clinical whites and crisp pure blacks anchored by soft skin-inspired warm creams and muted rose gold metallics.
- **Mobile-first commerce rhythm:** Rapid thumb-zone scanning, high-value tactile purchasing touchpoints, and clear tactile product specification modules.

## Colors

The palette establishes an immediate tension between absolute black and soft warm skin-mimicking undertones, elevated with precise metallic accents.

- **Pure Black (`#000000`):** The absolute structural pillar. Used for primary typography, editorial display headlines, hero banners, and high-impact pill interactive triggers.
- **Cream 50 (`#F9F1EC`):** The ambient canvas background, providing warmth and eliminating the harsh fatigue of sterile pure white viewports.
- **Surface Cream 100 (`#EAE1D7`):** Neutral container fill used for subtle interactive states, inner module bays, and recessed technical specs.
- **Divider Cream 200 (`#DBCEC2`):** Structural hairline divider and border system token, establishing crisp separation without optical clutter.
- **Pure White (`#FFFFFF`):** High-priority card floating containers, elevated product focus staging areas, and active selection states.
- **Metallic Rose Gold Accent (`#A9876D`):** Decorative precision element token. Employed exclusively for delicate circular framing rings, active micro-indicators, and hairline metallic highlights.
- **Deep Rose Gold (`#60432E`):** Precision semantic text accent. Reserved for micro-eyebrows, technical callouts, badge labels, and sub-metric emphasis.

## Typography

The type hierarchy prioritizes geometric cleanliness, balanced proportions, and editorial tracking using geometric sans architecture.

- **Capitalization & Tracking Rules:** Section categorizations, sub-tier hardware grades, and technical spec labels (`label-caps`) must be set in uppercase with `0.14em` tracking to maintain the clinical instrumentation character evident in medical training brands.
- **Weight Contrast:** Headlines utilize light-to-medium weights (`300` to `500`), leaning into understated authority rather than dense aggression. Body copy uses a clean `400` weight on `#000000` or `#60432E` for effortless legibility across cream surfaces.
- **Mobile Readability:** Viewports under 768px swap large hero titles down to `display-hero-mobile` to maintain balanced white space without awkward line wraps.

## Layout & Spacing

This design system uses a flexible grid balanced between an ultra-clean mobile-first commerce experience and expansive editorial desktop views.

- **Mobile Viewport (<768px):** A 4-column fluid layout with a `1rem` outer margin and `1rem` gutter. Vertical cadence utilizes breathing room around single-column product hero imagery and spec cards.
- **Desktop Viewport (≥1024px):** A 12-column layout capped at a maximum container width of `1280px` to maintain focused visual scanning. Side margins scale out to `3rem` to accentuate the open, airy gallery aesthetic.
- **Component Breathing Room:** Components must never feel crowded. Product configuration options and training specs are spaced with a minimum gap of `space-md` (`1rem`) and section separation of `space-xl` (`2.5rem`).

## Elevation & Depth

This design system replaces traditional drop shadows with structural plane shifts, subtle tone contrasts, and metallic boundary lines:

- **Low-Contrast Hairlines:** Elevation is predominantly established via `1px solid #DBCEC2` borders. This delivers clinical structure while maintaining a clean look.
- **Pure White Float Cards:** Floating layers (e.g., product training modules, configuration cards) use `#FFFFFF` set against the `#F9F1EC` background, creating clean natural depth without heavy shadow rendering.
- **Subtle Ambient Grounding:** For floating persistent bars (such as mobile sticky "Add to Cart" checkout docks), apply an ultra-subtle, non-muddy ambient shadow: `0 8px 32px rgba(96, 67, 46, 0.06)`. This uses deep rose gold undertones instead of murky gray.
- **Metallic Circular Trims:** Accent borders feature a crisp `1px solid #A9876D` ring to replicate precision-milled gold hardware collars.

## Shapes

The design system establishes a high-contrast relationship between architectural containers and soft organic interactive touchpoints:

- **Containers & Framing:** Cards, specs grids, and modular bays maintain refined architectural rectangles with subtle softening: `rounded-sm` (4px) or `rounded-md` (8px), framed by hairline dividers.
- **Interactive Elements (Pill Architecture):** All interactive targets—primary and secondary buttons, option chips, filter selectors, and status badges—feature fully rounded pill geometries (`rounded-full` / `9999px`). This reflects the ergonomic, organic profiles of training equipment and fingertips.
- **Geometric Rings:** Icon frames, feature badges, and material indicator swatches use pure 1:1 circular shapes with hairline metallic outlines.

## Components

### Buttons
- **Primary Action:** Solid pill (`rounded-full`), `#000000` background, `#FFFFFF` text, `label-md` tracking. Padding: `14px 28px`. Hover: fades to `#222222` with a subtle scale transition (`1.01`).
- **Secondary Action:** Pill-shaped, transparent background with `1px solid #000000` or `1px solid #DBCEC2`, `#000000` text. Hover: `#EAE1D7` fill.
- **Metallic Accent Action:** Pill-shaped, `#A9876D` border with `#60432E` text for specialized education and certification enrollments.

### Chips & Selectors
- **Attribute / Grit Chips (e.g., Diamond, Ceramic, Fine, Coarse):** Pill-shaped with a `#FFFFFF` or `#EAE1D7` background, `1px solid #DBCEC2`, text in `label-sm` `#60432E`.
- **Selected State:** `#000000` background, `#FFFFFF` text, with `0 0 0 1px #000000`.

### Cards & Modules
- **Product & Course Module Cards:** `#FFFFFF` background, `1px solid #DBCEC2` hairline perimeter, `rounded-md` (8px). Generous interior padding of `1.5rem`.
- **Accent Ring Modules:** Special features and certifications display an inner `#A9876D` circular perimeter highlighting equipment macro details.

### Inputs & Quantity Adjusters
- **Text Fields:** Minimalist baseline or enclosed pill container. Background `#FFFFFF`, border `1px solid #DBCEC2`, text `#000000`. Focus state: border transitions directly to `#000000` with no heavy outline rings.
- **Quantity Adjuster:** Pill-shaped container with `#EAE1D7` fill, black vector increment/decrement icons, and centered mono/geometric quantity text.

### Badges & Technical Indicators
- **Specification Tags:** Uppercase `label-caps` in `#60432E` with a subtle `#EAE1D7` pill surface.
- **Status Rings:** 8px circular indicator with a `1px solid #A9876D` halo for medical-grade equipment certification states.