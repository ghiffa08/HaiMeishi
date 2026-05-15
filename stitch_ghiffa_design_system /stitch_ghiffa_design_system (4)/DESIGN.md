---
name: Digital Washi Emakimono
colors:
  surface: '#fef9f1'
  surface-dim: '#ded9d2'
  surface-bright: '#fef9f1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3eb'
  surface-container: '#f2ede5'
  surface-container-high: '#ece8e0'
  surface-container-highest: '#e7e2da'
  on-surface: '#1d1c17'
  on-surface-variant: '#4c463f'
  inverse-surface: '#32302b'
  inverse-on-surface: '#f5f0e8'
  outline: '#7e766e'
  outline-variant: '#cfc5bc'
  surface-tint: '#655d56'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#201b15'
  on-primary-container: '#8b827b'
  inverse-primary: '#cfc5bc'
  secondary: '#b02d21'
  on-secondary: '#ffffff'
  secondary-container: '#fc6451'
  on-secondary-container: '#650001'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001944'
  on-tertiary-container: '#447ff2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ece0d8'
  primary-fixed-dim: '#cfc5bc'
  on-primary-fixed: '#201b15'
  on-primary-fixed-variant: '#4c463f'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4a9'
  on-secondary-fixed: '#410000'
  on-secondary-fixed-variant: '#8e130c'
  tertiary-fixed: '#d9e2ff'
  tertiary-fixed-dim: '#b0c6ff'
  on-tertiary-fixed: '#001944'
  on-tertiary-fixed-variant: '#00429a'
  background: '#fef9f1'
  on-background: '#1d1c17'
  surface-variant: '#e7e2da'
  washi-paper: '#F5F0E8'
  sumi-ink: '#1A1510'
  hanko-red: '#C0392B'
  circuit-blue: '#1A62D4'
  ancient-tan: '#9A8D7A'
typography:
  headline-xl:
    fontFamily: Shippori Mincho
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Shippori Mincho
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Shippori Mincho
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Shippori Mincho
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Shippori Mincho
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  accent-italic:
    fontFamily: ebGaramond
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
  data-label:
    fontFamily: DM Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  data-value:
    fontFamily: DM Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.2'
spacing:
  grid-unit: 80px
  gutter: 24px
  margin-page: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is a synthesis of **Ancient Japanese Emakimono (horizontal scroll)** aesthetics and **Modern Engineering precision**. It targets an audience that appreciates high-craftsmanship, bridging the gap between ancestral tradition and digital innovation. 

The design style is a hybrid of **Minimalism** and **Tactile Skeuomorphism**. It leverages heavy whitespace and clean layouts but grounds them in physical reality through paper textures, 3D card interactions, and stipple-dithered shadows. The emotional response is one of calm, intellectual depth, and meticulous technical rigor.

**Key Stylistic Pillars:**
- **Material Authenticity:** Every digital element should feel like it was printed or stamped onto fibrous paper.
- **Technical Contrast:** Traditional serif typography is punctured by raw monospaced data to signify engineering expertise.
- **Deliberate Imperfection:** Use of 5% noise overlays and tilted hanko stamps to avoid the "sterile" feel of standard vector UI.

## Colors

The palette is derived from the "Three Pillars of the Scroll":
- **Washi Paper (Background):** A warm, off-white neutral that serves as the canvas.
- **Sumi Ink (Primary):** A deep, near-black charcoal used for all core content and structural elements.
- **Hanko Red (Accent):** A bold cinnabar red reserved for identity, signatures, and critical highlights.

**Functional Accents:**
- **Circuit Blue** is used exclusively for interactive states and "live" technical data, signaling the transition from historical aesthetic to modern functionality.
- **Ancient Tan** provides the framework, used for guide lines, borders, and secondary metadata.

## Typography

This design system employs a specialized tri-font hierarchy to communicate different "layers" of information:

1.  **Display & Body (Shippori Mincho):** The primary narrative voice. Use for all headlines and long-form prose. 
2.  **Literary Accent (EB Garamond Italic):** Used for pull-quotes, translations, or poetic interludes. *Note: EB Garamond is selected as the available equivalent to Cormorant Garamond for its graceful, calligraphic italic.*
3.  **Technical Layer (DM Mono):** Used for timestamps, coordinates, technical specs, and interface labels. This represents the "modern engineering" side of the brand.

**Formatting Rules:**
- **Vertical Orientation:** Sub-headers or "Chapter" markers should use `writing-mode: vertical-rl` to mimic traditional scroll annotation.
- **Chapter Numbering:** Use Kanji formats (e.g., 其の一) for major section transitions, paired with a DM Mono "01" for technical clarity.

## Layout & Spacing

The layout utilizes a **Vertical Guide Grid** system. Thin lines in **Ancient Tan** are placed every **80px** horizontally across the page. All primary content blocks and 3D objects should align their vertical edges to these lines.

**Emakimono Flow:**
- On Desktop, section transitions should feel like an unfolding scroll. While the primary scroll is vertical for web standard, visual elements (like line extensions) should suggest horizontal continuity.
- **Margins:** High-margin layouts are preferred to evoke the spaciousness of traditional manuscript scrolls.
- **Breakpoints:** On mobile, the 80px grid scales down to 40px. Content shifts to a single column while maintaining the vertical text elements on the right-hand side of the viewport.

## Elevation & Depth

This design system rejects standard blurred CSS shadows. Depth is created through **Tactile Layering**:

1.  **Stipple Shadows:** Instead of `box-shadow` with blur, use a SVG filter or a repeating noise-texture mask to create dithered, grainy shadows. This mimics the look of ink-transfer or low-fidelity printing.
2.  **Tonal Layers:** The background is the `washi-paper` (#F5F0E8). Cards and interactive surfaces use the same color but are defined by thin `ancient-tan` (#9A8D7A) borders or subtle 3D transforms.
3.  **Physical Thickness:** The "Meishi" (Business Card) component must maintain a visible **6px** edge when rotated, establishing its presence as a physical object in 3D space.
4.  **Z-Axis Hierarchy:** Global noise (5% opacity grain) is the highest layer, unifying all elements under a "printed" feel.

## Shapes

The shape language is strictly **Sharp (0px)** for structural UI elements, emphasizing technical precision and the clean cut of paper. 

**Exceptions:**
- **The Hanko Stamp:** This is the only element allowed to be a square or circle, and it must be tilted at exactly **-8 degrees** to simulate the natural imperfection of a hand-pressed seal.
- **Borders:** Use 1px solid lines for structural separation, utilizing the `ancient-tan` color to keep the contrast soft against the paper background.

## Components

**Buttons:**
- Rectangular, sharp corners.
- **Default State:** Sumi Ink border (1px), Shippori Mincho text.
- **Hover/Active State:** Background fills with a 5% Sumi Ink tint, or text color shifts to Circuit Blue for tech-heavy actions.

**Hanko Stamp:**
- A signature element containing a stylized monogram. Placed at the bottom-right of cards or section endings. 
- Always uses Hanko Red (#C0392B).

**Meishi (3D Cards):**
- Must support hover-based tilting and click-to-flip functionality.
- The back of the card should use the DM Mono font for a "technical data" reveal, contrasting the "calligraphic" front.

**Input Fields:**
- Minimalist design. A single bottom border in Ancient Tan. 
- Labels use DM Mono (data-label style) and sit vertically to the left of the input when space permits.

**Lists:**
- Bullet points are replaced by small Hanko-red squares or Japanese punctuation marks (・).
- Spacing is generous, following the 80px grid rhythm.

**Chips/Tags:**
- Small, sharp-edged boxes with 1px Ancient Tan borders.
- Typography: DM Mono (all caps), reinforcing the technical spec aesthetic.