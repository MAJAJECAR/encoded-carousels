# CLAUDE.md — Encoded Carousel System
# Paste this file at the start of any new conversation with Claude.
# Claude will instantly know the full system, conventions, and workflow.
# Update this file whenever the system evolves.

---

## What This System Is

An Instagram carousel generation system for **Encoded.Ai**.
Claude generates HTML carousel files + matching JSON files.
A Playwright script screenshots them into PNGs.
PNGs are uploaded to Buffer and scheduled for Instagram.

---

## GitHub Repo

**Repo:** `https://github.com/MAJAJECAR/encoded-carousels`
**GitHub Pages:** `https://majajecar.github.io/encoded-carousels`

---

## Folder Structure

```
encoded-carousels/
├── CLAUDE.md                                  ← full system prompt for Claude
├── README.md                                  ← setup and usage guide
├── TEMPLATES.md                               ← technical reference for all 16 slide types
├── styles.css                                 ← shared design system, square (1080×1080)
├── styles-portrait.css                        ← portrait design system (1080×1350), mobile-optimised font sizes
├── screenshot.js                              ← Playwright: node screenshot.js [name]
├── carousel-master-template.html              ← all 16 slide types + 8 CTA variations (square)
├── carousel-master-template-portrait.html     ← same but portrait format (1080×1350)
├── carousel-v1-capacity.html
│   ... (all carousel HTML files)
├── matt-wagner.jpg                            ← member photo for experience carousels
├── .gitignore                                 ← excludes output/ and node_modules/
└── output/                                    ← PNGs, gitignored, local only
```

---

## Output Rule — Always Deliver the HTML File

**Every time Claude generates or updates a carousel, it delivers the `.html` file.**
Drop it into the repo folder, add to screenshot.js CAROUSELS array, and run.

---

## Design System — Color Tokens

All tokens live in `styles.css`. Do not change without being asked.

```css
/* Surfaces */
--base:   #141414;   /* main slide background */
--s1:     #191919;   /* card background */
--s2:     #1D1D1D;   /* emphasized card */
--s3:     #272727;   /* tertiary surface */
--s4:     #313131;   /* strong separation */

/* Text */
--t1:     #FFFFFF;   /* primary — headlines */
--t2:     #D0D0D0;   /* secondary — subheads */
--t3:     #C4C4C4;   /* tertiary — body */
--t4:     #898989;   /* muted — eyebrows, numbers, counters */

/* Borders */
--b-sub:  rgba(255,255,255,0.08);   /* subtle */
--b-def:  rgba(255,255,255,0.14);   /* default */

/* Gold — used ONCE per carousel max, closing brand mark + eyebrows only */
--gold:   #CCB085;
--gold-d: #998464;

/* Fonts */
--fs:    'Switzer', sans-serif;      /* headlines */
--fm:    'Manrope', sans-serif;      /* body, eyebrows, UI */
--fmono: 'Space Mono', monospace;   /* numbers, labels, counters */
```

### New Standard Classes (in styles.css)
```css
.g            — gold accent word inline: color: var(--gold)
.tag-tr       — ENCODED.AI top-right tag: Space Mono 11px, --t4, opacity 0.7
.swipe        — SWIPE → bottom-right indicator
.swipe-circle — gold circle with SVG arrow cutout (stroke: #141414)
```

---

## Design System — Font Import Block

Every HTML file must include this exact import block:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://api.fontshare.com">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500&family=Space+Mono:wght@400&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
```

Switzer is from Fontshare (not Google Fonts).
Manrope and Space Mono are from Google Fonts.

---

## Design System — Type Scale

```
.hxl   — Switzer 700,  96px,  lh 1.0,   ls -0.03em  — cover headlines only
.hl    — Switzer 700,  72px,  lh 1.02,  ls -0.025em — statement slides
.hm    — Switzer 600,  52px,  lh 1.08,  ls -0.02em  — slides with lists below
.body  — Manrope 300,  26px,  lh 1.6                — body copy, color --t3
.sub   — Manrope 300,  28px,  lh 1.55               — cover subheads, color --t2
.muted — color --t4                                  — modifier applied to .body
.ew    — Manrope 400,  18px,  ls 0.2em, uppercase    — eyebrow, color --gold, leading line
.brand — Manrope 500,  18px,  ls 0.28em, uppercase   — brand mark, color --gold
.qmark — Switzer 800, 140px,  lh 0.7                — decorative quote mark, color --s3
.qtext — Switzer 600,  52px,  lh 1.1,   ls -0.02em  — pull quote text
.qattr — Manrope 400,  18px,  ls 0.14em, uppercase   — quote attribution, color --t4
.nnum  — Space Mono,   16px,  ls 0.05em             — list numbers, color --t4
.ntext — Switzer 500,  36px,  lh 1.25,  ls -0.01em  — list item text, color --t1
.slide-n — Space Mono, 13px,  ls 0.15em             — slide counter, opacity 0.5
```

---

## Design System — Layout Classes

```
.spacer    — flex:1, pushes content to edges
.rule      — 1px divider, rgba(255,255,255,0.08)
.nrule     — 1px rule between list items
.corner    — corner bracket decoration, cover + closing slides only
.bg-word   — ghost background word, decorative, list/stat slides
.slide-n   — slide counter, bottom-right, slides 2 onward
.g8–.g32   — spacing divs (16px, 24px, 32px, 40px, 48px, 64px)
.g2        — 2-column grid, 1fr 1fr, gap 16px
.g3        — 3-column grid
.hflow     — horizontal flow container
.hcard     — horizontal flow card
.harr      — horizontal arrow connector
.seq       — vertical sequence container
.arr       — vertical arrow connector
.loop-wrap      — circular loop diagram container, 600×600px, position:relative
.loop-node      — label container for each node (top/right/bottom/left)
.loop-node-label — eyebrow above node text, Space Mono 11px, gold
.loop-node-text  — node headline, Switzer 700 26px
.step-pill      — horizontal pill with gold dot + label, used on step slides
.step-pill-dot  — 8×8px gold circle
.step-pill-text — Space Mono 13px uppercase gold
.cta-url        — encoded.ai display element, Switzer 700 52px, --gold
```

---

## Slide Types

| Type | Key classes | Use when |
|------|-------------|----------|
| Cover | `.hxl` + `.sub` + `.brand` + `.corner` | Always slide 1 |
| Statement | `.ew` + `.hl` + optional `.body.muted` | Single bold idea |
| Numbered list | `.nrow` + `.nnum` + `.ntext` + `.nrule` | 2–4 short items |
| Single point | `.ew` + mono number + `.hl` | One striking point, no body |
| Quote | `.qmark` + `.qtext` | Strong single quote |
| Vertical flow | `.vflow` + `.vflow-step` + `.vflow-title` | Sequential process steps |
| 3-column grid | `.col-grid` + `.col-item` + `.col-label.gold` | Three parallel stats or categories |
| Split stat | `.split-wrap` + `.split-rule` + `.split-num` | Two contrasting numbers or ideas |
| Split number + context | giant number left + full-height rule + label/body right | One number IS the story, context right |
| Experience stat poster | giant number + context top, two stat cells bottom | Member story result slides |
| Big number hero | `.hero-ring` + absolute centered content | One number tells the whole story |
| Concentric circles | `.cc-wrap` + `.cc-circle` + `.cc-label` | Nested scale or hierarchy |
| Circular loop diagram | `.loop-wrap` + `.loop-node` (top/right/bottom/left) | Repeating cycle or system |
| Closing | `.hl` + `.rule` + `.brand` + `.corner` | Always second-to-last slide |
| CTA | `.cta-url` + `.cta-action` + `.cta-follow` | Always final slide |
| Experience cover | `.photo-split` + photo-split gradient | Member story carousels only |

See `carousel-master-template.html` for a live example of every type.
See `TEMPLATES.md` for full HTML snippets and usage rules for each type.

---

## Visual Diagram — Circular Loop

Used when content is a repeating cycle (e.g. The Compound Loop).
Approved template: carousel-v13-compound-loop.html slide 6.

### Layout
- Slide uses standard padding (80px 86px)
- Eyebrow sits in normal flow at top left
- Diagram: `position:absolute; top:42%; left:50%; transform:translate(-50%,-50%)`
- This centers it on the full 1080×1080 canvas regardless of padding
- Caption: `position:absolute; bottom:120px; left:86px; right:86px`
- Caption gives breathing room above the slide counter

### CSS lives in styles.css (graduated from v13)
- `.loop-wrap`, `.loop-node`, `.loop-node-label`, `.loop-node-text`
- `.step-pill`, `.step-pill-dot`, `.step-pill-text`
- Do not re-declare these inline in new carousels

### Node positioning (all relative to 600×600 wrap, circle r=160 centered at 300,300)
- Top node: dot at 300,140 — label above via `bottom:calc(600px - 140px + 16px)`
- Right node: dot at 460,300 — label at `left:calc(460px + 24px)`
- Bottom node: dot at 300,460 — label at `top:calc(460px + 16px)`
- Left node: dot at 140,300 — label at `right:calc(600px - 140px + 24px)`

### Exception to left-align rule
The circular diagram is the ONE approved exception to the left-align rule.
Center alignment works here because the diagram is a self-contained visual system.
All other slides remain left-aligned.

---

## CTA Slide — Standard Closing

Every carousel ends with TWO closing slides:
1. The existing closing slide (`.hl` + `.rule` + `.brand`) — unchanged, thematic resolution
2. A new dedicated CTA slide — always the absolute final slide

### CTA Slide Design
- Headline: `"Train what AI can't replace."` — Switzer 700, `.hl` size
- Subhead: `"Science-backed training for the capacities that compound."` — `.body`, `--t2`
- URL: `encoded.ai` — Switzer 700 52px, `--gold`, class `.cta-url`
- Action line: `"Link in bio"` — Space Mono, `--t4`, uppercase, `ls 0.14em`
- Follow line: `"@encoded.ai"` — Manrope 400, `--t3`
- Rule + brand mark at bottom — same as closing slide
- Gold used on `.cta-url` only
- No slide counter on the CTA slide
- No `.corner` decoration

### Copy rule
The CTA headline never repeats the closing slide headline.
Closing slide = thematic resolution. CTA slide = action.

### Instagram linking
Instagram does not support clickable links in carousel posts.
Standard approach: "Link in bio" on CTA slide + keep `encoded.ai` in bio at all times.
Always include `encoded.ai` link in every caption when scheduling in Buffer.

### CTA Repetition Rule
`encoded.ai` appears MAX ONCE per CTA slide — either as the URL element OR as @handle, never both at full size.
Brand mark (`Encoded.Ai`) is optional on CTA slide — omit if URL already carries the brand.
Approved CTA variations are in `cta-variations.html` (slides A–H). Choose one per carousel.

---

## Visual Inspo — Approved Slide Patterns

These patterns were approved from reference images shared May 2026.
Use them for data-led or visually rich slides within carousels.
All adapted to Encoded design tokens — never copy the inspo layouts verbatim.

### Pattern 1 — Big Number Hero
Full-slide stat. Number dominates. Decorative ring behind it (optional).
- Number: Switzer 800, 200–280px, `--t1`
- Rule below number
- Label: Manrope 300, uppercase, `--t4`
- Optional: large ghost ring SVG centered behind content (`stroke: rgba(255,255,255,0.06)`)
- Reference: `Big_Number.png` inspo (72.5% with ring)
- Use when: one number tells the whole story

### Pattern 2 — Split Stat
Text/quote left, large number or visual right. Divided by a vertical rule.
- Left: eyebrow + headline or quote + attribution
- Right: big number (Switzer 700, 100–140px) + label below
- Vertical rule: `1px solid rgba(255,255,255,0.08)`, full height
- Reference: inspo slide with "1,000+ Five-star reviews"
- Use when: proof point needs context

### Pattern 3 — 3-Column Stat Grid
Three equal columns, each with a number + label + body line.
- Numbers: Switzer 700, 60–80px, `--t1`
- Labels: Manrope 300, uppercase, `--t4`
- Body: Manrope 300, 20px, `--t3`
- Thin top rule above each column
- Reference: inspo slide with 66% / 50% / 25% circles (use without circles — numbers only)
- Use when: three parallel data points need comparison

### Pattern 4 — Concentric Circles (Scale)
Text left, nested circles right showing scale/hierarchy.
- Circles: SVG, filled with `--s2`, `--s3`, `--s4` (darkest = smallest/inner)
- Labels float outside each ring, right-aligned
- Left: eyebrow + headline + body
- Reference: inspo slide with $1.5B / $10.5B / $105B
- Use when: showing nested scale — capacity levels, depth of encoding, system layers

### Pattern 5 — Traction / Image + Stat Grid
Three columns each with a dark image background + large number overlay + caption.
- Images: dark, desaturated, `object-fit:cover`
- Number: Switzer 700, 120px, white, overlaid on image
- Caption: Manrope 300, centered below
- Reference: inspo slide with 12.5 / 1,000 / 5.6M
- Use when: real member or program data becomes available

### General Rules for Visual Slides
- Real data preferred. Use conceptual numbers only when grounded in Encoded methodology.
- Never invent statistics — use process numbers (35 min, 25 min, 10 min) or methodology-based concepts.
- Icons can be added in future — placeholder with geometric shapes for now.
- Visual slides work best when surrounded by pure-text slides. Never stack two visual slides.

---

## Visual Layer — Modular Elements
The goal is visual depth WITHOUT increased cognitive load.

### Core Principle
Do NOT make slides more complex. Distribute complexity across more slides.
**More slides with less = better than fewer slides with more.**

### When to Use Visual Elements

Actively evaluate for every concept: *"Would this idea benefit from a visual structure?"*

| Element | Use when |
|---------|----------|
| **Flow nodes** | Cause → effect → outcome / trigger → belief → behavior |
| **Timeline** | Progression over time / before → during → after |
| **List structure** | Multiple outcomes or symptoms (max 3–5 items per slide) |
| **Minimal diagram** | Relationships between elements |

If YES → implement using rules below.
If NO → keep it pure text.

### Progressive Reveal Rule
Treat the carousel like a story. Each slide reveals one part of the system.
Never place a full chart on one slide if it becomes visually heavy.

Instead of one full flowchart → break into steps:
- Slide A: Step 1
- Slide B: Step 2
- Slide C: Step 3
- Slide D: Complete system overview (optional recap)

### Visual Element Design Rules
- All layouts stay consistent with existing design system
- Left-aligned always
- Use lines, nodes, dots, and minimal shapes — not complex diagrams
- Visual elements feel **embedded**, not added on top
- Connector lines: `1px solid var(--b-def)` or `rgba(255,255,255,0.14)`
- Node dots: small circles, `background: var(--t3)` or `var(--gold)` for emphasis
- Every slide must be instantly understandable in under 1 second

### Vertical Centering on Visual Slides
`col-grid` and `vflow` have `flex:1` by default — they stretch to fill the slide, which is correct for most layouts. When a visual slide needs content vertically centered instead of top-aligned, do NOT change the CSS class. Use a wrapper:

```html
<!-- Centered visual slide pattern -->
<div class="slide" id="slide-n">
  <div style="display:flex; flex-direction:column; justify-content:center; flex:1;">
    <div class="ew" ...>Eyebrow</div>
    <div class="col-grid" style="flex:0;">
      <!-- columns here -->
    </div>
  </div>
</div>
```

The `flex:0` on the inner element tells it to only take the space it needs, letting the wrapper center it. Works the same for `.vflow`. Never add `justify-content:center` to the slide div itself — it won't work when inner content has `flex:1`.

### CSS Implementation Rule
Visual element styles go in a **per-carousel `<style>` block**, NOT in `styles.css`.
Once a pattern is tested and approved across multiple carousels, graduate it into `styles.css`.
This keeps the core system stable while we iterate.

### Pre-Generation Questions
Before building any new carousel, ask:
1. **Goal** — awareness / explanation / conversion?
2. **Depth** — surface / moderate / deep?
3. **Tone** — emotional or structured?
4. **Audience** — cold or warm?

### Retention Rules
- Every slide must encourage the next swipe
- Avoid overwhelming the viewer
- Reduce friction to understanding
- Do not optimize for "smartness" — optimize for understanding and swipe-through rate

---

## Design Rules — Non-Negotiable

**No boxes or card designs.** Remove all `.card` layouts. Type does the visual work.

**Left-aligned always.** Nothing centered. Every element aligns to the left edge.

**One idea per slide.** Maximum one short supporting line of muted body text.

**No redundant slides.** Never repeat the same text twice in one carousel.
If the closing slide says it, no statement slide says it first.

**Numbered list → one point per slide.** Never put all 4 points on one slide.
Each point = its own slide. More slides with less text beats fewer slides with more.

**Left-aligned sequence slides.** Vertical line on the left, bullets align with
title text (not label), label above each item, compact spacing. Never centered.

**Gold used once per carousel.** Eyebrow labels and the closing brand mark only.
Exception: gold accent words mid-sentence (see Gold Accent Words below).

**Encoded.Ai appears once per slide.** Never repeated on the same slide.
On closing slides: brand mark only. On cover: brand mark at top only.
No "— The Frequency Era" suffix. No "Comment [WORD]" lines anywhere.

**Slide counter stays clear.** Must never overlap text, decorations, or lists.
Counter format: `02 / 08` (zero-padded, space around slash).

**No repeated closing.** If slide N-1 and slide N say the same thing, delete slide N-1.

**Instagram carousel max: 20 slides.** Prefer 6–10. Keep it light.
When content is dense, split into multiple shorter carousels rather than one long one.

**Never delete or change content unless explicitly asked.** If a slide has text, keep it exactly as-is. Only change what is specifically requested. Do not rewrite, trim, or reorder slides on your own judgment.

**All dark always.** No white or light background slides. Ever. The system is dark only.

---

## Standard Slide Treatments — Applied to Every Carousel

These three elements are now part of every carousel by default:

### 1. Gold Accent Words
Key words or phrases highlighted in `--gold` mid-sentence using `<span class="g">word</span>`.
- CSS: `.g { color: var(--gold); }`
- Use on 1–3 words per slide maximum — the most important word or phrase
- Never entire sentences, never headings, never body text blocks
- Works on `.hl`, `.hxl`, `.hm` headlines
- Gold is still used only once per slide — accent word counts as the gold usage
- Do NOT combine accent word + gold eyebrow on the same slide

### 2. SWIPE → Indicator
Replaces the slide counter on content slides. Small, bottom right.
```css
.swipe {
  position: absolute;
  bottom: 80px;
  right: 86px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--fmono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--t4);
  opacity: 0.6;
}
.swipe-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
```
HTML: `<div class="swipe">SWIPE <div class="swipe-circle"><svg viewBox="0 0 12 12" ...arrow path.../></svg></div></div>`
- Arrow SVG stroke: `#141414` (dark cutout on gold circle)
- Present on all slides except the final CTA slide
- Cover slide: swipe indicator present, rule removed from bottom

### 3. ENCODED.AI Top-Right Tag
Small Space Mono label, top right corner, on content slides only.
```css
.tag-tr {
  position: absolute;
  top: 80px;
  right: 86px;
  font-family: var(--fmono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--t4);
  opacity: 0.7;
}
```
HTML: `<div class="tag-tr">Encoded.Ai</div>`
- Only on slides where it fits without crowding other elements
- NEVER on cover slide (brand mark already there top left)
- NEVER on CTA slide
- NEVER on slides with top-right corner decoration (`.corner`)
- NEVER repeated — if brand mark is present, no tag-tr
- Max once per slide, anywhere on the slide

---

---

## HTML File Conventions

Every carousel HTML file must:
1. Use the font import block above
2. Link to `styles.css` — never embed CSS inline (exception: experience carousels with avatar/stat overrides may use a small `<style>` block for those specific components only)
3. Set `html, body` to `width:1080px; height:1080px; overflow:hidden`
4. Set `.slide` to `position:absolute; inset:0; width:1080px; height:1080px; padding:80px 86px`
5. Have first slide as `class="slide active"`
6. Expose `window.goToSlide(n)` and `window.totalSlides`

```html
<script>
  const allSlides = document.querySelectorAll('.slide');
  window.totalSlides = allSlides.length;
  window.goToSlide = function(n) {
    allSlides.forEach(s => s.classList.remove('active'));
    allSlides[n].classList.add('active');
  };
</script>
```

---

## JSON File Structure

Every carousel also has a matching `.json` file with three sections:

```json
{
  "meta": {
    "name": "carousel-v1-capacity",
    "title": "...",
    "totalSlides": 8,
    "canvas": { "width": 1080, "height": 1080, "unit": "px" },
    "fonts": { ... }
  },
  "tokens": {
    "colors": { ... },
    "typography": { ... },
    "layout": { ... }
  },
  "slides": [
    {
      "id": 1,
      "type": "cover",
      "elements": [ ... ]
    }
  ]
}
```

Element types used in slides array:
`brand`, `eyebrow`, `headline`, `subhead`, `body`, `quote`, `quoteMark`,
`quoteText`, `numberedList`, `slideCounter`, `rule`, `spacer`, `gap`, `decoration`

---

## Experience Carousel — Special Format (v4c template)

Experience carousels follow a distinct layout. The approved template is
**`carousel-v4c-matt-wagner-circle2.html`**. Use this as the reference for all future
member story carousels.

### Slide 1 — Cover layout
- `Encoded.Ai` brand mark at the **top left**
- Avatar (circular, 300×300, `object-position: center top`, gold ring border, fade-to-dark gradient at bottom) + member info block — **vertically centered together** in the slide
- Member info: name (Switzer 700 38px), role (Manrope 300 20px --t4), tag (Space Mono 13px uppercase --gold)
- `rule` + `g20` + cover headline (Switzer 700 72px) at the **bottom**
- `.corner` decoration top-right

### Slides 2–N — Story slides
- Same statement/quote/numbered layout as regular carousels
- Eyebrow: "The Before", "Three Weeks In", "What He'd Tell You", etc.

### Stat slide (slide 6 in Matt Wagner)
- Large stat number (Switzer 800 280px)
- Stat word label (Manrope 300 uppercase --t4)
- Context text: **Switzer 700, white (#ffffff), right-aligned**
- Bottom row: two stat cells divided by a rule

### Closing slide
- Standard: `.hl` + `.spacer` + `.rule` + `.g20` + `.brand`

### Member photo handling
- Photo referenced as `[member-name].jpg` in the same folder as the HTML
- Filename convention: `matt-wagner.jpg`, `jane-smith.jpg`, etc.
- Do not base64 embed — keep as external file reference

### Photo-split gradient — approved technique (v4-matt-wagner)
Full-bleed portrait photo on the right half of the slide, blending into the dark background.

**Key rules:**
- Photo width: `630px` — wide enough to overlap the text area, not so wide it crowds it
- Photo position: `right: 0; object-position: center top` — anchors to right edge, face at top
- Two gradients combined on the overlay (`::after`):
  1. **Bottom-to-top fade** — keeps face fully visible, darkens only below chin toward text
  2. **Left-to-right fade** — smooth dissolve from dark background into photo, 5 stops for no hard line
- Left gradient stops: `#141414 0% → 0.85 15% → 0.5 30% → 0.15 50% → 0 65%`
- **Never** use a single left-to-right gradient — it will cut across the face
- **Never** move the photo further right to create distance from text — widen the photo instead
- If blend looks too harsh: add more gradient stops between 0% and 30%
- If blend starts too close to text: reduce photo width by 10px increments

```css
.photo-split img {
  position: absolute;
  right: 0; top: 0;
  width: 630px; height: 1080px;
  object-fit: cover;
  object-position: center top;
}
.photo-split::after {
  content: '';
  position: absolute;
  right: 0; top: 0;
  width: 630px; height: 1080px;
  background:
    linear-gradient(to bottom,
      rgba(20,20,20,0) 0%,
      rgba(20,20,20,0) 50%,
      rgba(20,20,20,0.6) 75%,
      #141414 100%
    ),
    linear-gradient(to right,
      #141414 0%,
      rgba(20,20,20,0.85) 15%,
      rgba(20,20,20,0.5) 30%,
      rgba(20,20,20,0.15) 50%,
      rgba(20,20,20,0) 65%
    );
}
```

---

## screenshot.js Usage

```bash
node screenshot.js                        # all carousels
node screenshot.js v22-frequency-era      # one carousel by name
node screenshot.js master-template        # square master template (1080×1080)
node screenshot.js master-template-portrait  # portrait master template (1080×1350)
```

**GitHub Pages URL** (line ~18 in screenshot.js):
```js
const GITHUB_PAGES_URL = 'https://majajecar.github.io/encoded-carousels';
```

**Portrait format** — add `portrait: true` to any entry in the CAROUSELS array to render at 1080×1350:
```js
{ name: 'your-carousel', file: 'carousel-your-carousel.html', slides: 9, portrait: true }
```
Portrait carousels must link to `styles-portrait.css` instead of `styles.css`.

---

## Current Carousel Library

| File | Topic | Slides | Status |
|------|-------|--------|--------|
| carousel-v1-capacity | Nervous System Capacity | 8 | ✅ |
| carousel-v2-prediction | The Prediction Model | 9 | ✅ |
| carousel-v2b-compound-loop | The Compound Loop (split) | 10 | ✅ |
| carousel-v3-identity | Identity, Beliefs, Intentions | 7 | ✅ |
| carousel-v3b-identity-symptoms | When Identity Is Fragmented | 7 | ✅ |
| carousel-v4-matt-wagner | Matt Wagner split layout | 8 | ✅ gradient updated |
| carousel-v4b-matt-wagner-circle | Matt Wagner circle v1 | 8 | ⚠️ old design |
| carousel-v4c-matt-wagner-circle2 | Matt Wagner circle v2 ← **current approved** | 9 | ✅ |
| carousel-v5-compound-loop | The Compound Loop | 6 | ✅ |
| carousel-v6-three-exits | The Three Failed Exits | 6 | ✅ |
| carousel-v7-encoding-equation | The Encoding Equation | 7 | ✅ |
| carousel-v8-intentions-vs-goals | Intentions vs Goals | 6 | ✅ |
| carousel-v8b-extrinsic-symptoms | When The Motor Is Fear | 5 | ✅ |
| carousel-v9-signs-belief-running | Signs The Belief Is Running | 7 | ✅ |
| carousel-v9b-four-signals | Four Signals | 6 | ✅ |
| carousel-v10-foundation | The Foundation | 7 | ✅ |
| carousel-v10b-what-changes | What Changes When Foundation Shifts | 5 | ✅ |
| carousel-v11-response-sequence | The Response Sequence | 7 | ✅ |
| carousel-v12-imprinting | What Is Imprinting? | ? | ✅ |
| carousel-v13-compound-loop | The Compound Loop (visual) | 7 | ✅ |
| carousel-matt-v5 | Matt Wagner v5 | ? | ✅ |

---

## screenshot.js CAROUSELS Array (current)

```js
{ name: 'v1-capacity',             file: 'carousel-v1-capacity.html',             slides: 8  },
{ name: 'v2-prediction',           file: 'carousel-v2-prediction.html',           slides: 9  },
{ name: 'v2b-compound-loop',       file: 'carousel-v2b-compound-loop.html',       slides: 10 },
{ name: 'v3-identity',             file: 'carousel-v3-identity.html',             slides: 7  },
{ name: 'v3b-identity-symptoms',   file: 'carousel-v3b-identity-symptoms.html',   slides: 7  },
{ name: 'v4-matt-wagner',          file: 'carousel-v4-matt-wagner.html',          slides: 8  },
{ name: 'v5-compound-loop',        file: 'carousel-v5-compound-loop.html',        slides: 6  },
{ name: 'v6-three-exits',          file: 'carousel-v6-three-exits.html',          slides: 6  },
{ name: 'v7-encoding-equation',    file: 'carousel-v7-encoding-equation.html',    slides: 7  },
{ name: 'v8-intentions-vs-goals',  file: 'carousel-v8-intentions-vs-goals.html',  slides: 6  },
{ name: 'v8b-extrinsic-symptoms',  file: 'carousel-v8b-extrinsic-symptoms.html',  slides: 5  },
{ name: 'v9-signs-belief-running', file: 'carousel-v9-signs-belief-running.html', slides: 7  },
{ name: 'v9b-four-signals',        file: 'carousel-v9b-four-signals.html',        slides: 6  },
{ name: 'v10-foundation',          file: 'carousel-v10-foundation.html',          slides: 7  },
{ name: 'v10b-what-changes',       file: 'carousel-v10b-what-changes.html',       slides: 5  },
{ name: 'v11-response-sequence',   file: 'carousel-v11-response-sequence.html',   slides: 7  },
{ name: 'v12-imprinting',          file: 'carousel-v12-imprinting.html',          slides: 8  },
{ name: 'v13-compound-loop',       file: 'carousel-v13-compound-loop.html',       slides: 7  },
{ name: 'v14-imprinting',          file: 'carousel-v14-imprinting.html',          slides: 9  },
{ name: 'v15-effort',              file: 'carousel-v15-effort.html',              slides: 9  },
{ name: 'v16-protocol',            file: 'carousel-v16-protocol.html',            slides: 9  },
{ name: 'v17-stack',               file: 'carousel-v17-stack.html',               slides: 9  },
{ name: 'v18-therapy',             file: 'carousel-v18-therapy.html',             slides: 9  },
{ name: 'v19-frequency',           file: 'carousel-v19-frequency.html',           slides: 9  },
{ name: 'v20-hardware',            file: 'carousel-v20-hardware.html',            slides: 9  },
{ name: 'v21-identity-ceiling',    file: 'carousel-v21-identity-ceiling.html',    slides: 9  },
{ name: 'v22-frequency-era',       file: 'carousel-v22-frequency-era.html',       slides: 10 },
{ name: 'cta-variations',          file: 'cta-variations.html',                   slides: 8  },
{ name: 'master-template',         file: 'carousel-master-template.html',         slides: 24 },
{ name: 'master-template-portrait', file: 'carousel-master-template-portrait.html', slides: 24, portrait: true },
```

---

## Content Sources

### Capacity Carousels PDF
- Nervous System Capacity ✅ v1
- The Architecture — can expand
- Regulation vs Capacity — can expand
- The Battery Gets Bigger — can expand

### Social Carousels PDFs
- The Prediction Model ✅ v2
- The Compound Loop ✅ v2b, v5
- The Three Failed Exits ✅ v6
- The Encoding Equation ✅ v7
- Intentions vs Goals ✅ v8
- Signs The Belief Is Running ✅ v9
- Identity, Beliefs, Intentions ✅ v3
- Foundation Synthesis ✅ v10

### Experience Stories
- Matt Wagner ✅ v4c — **approved layout, photo: matt-wagner.jpg**
- Future members: text + photo provided by team, consent confirmed before publishing

### Original Content
- The Response Sequence ✅ v11

### Content Themes Available
- Nervous system capacity and what limits performance
- Subconscious belief systems and automatic responses
- The gap between effort and results
- Identity as the source of every other program
- Regulation vs structural change
- The encoding process
- Extrinsic vs intrinsic motivation
- Signs that a subconscious program is running
- Member transformation stories

**Claude must not:** invent claims not in Encoded source material,
make medical/therapeutic promises, use hype-driven or generic self-help tone.

---

## Content Strategy — Carousel Priority Queue

Based on the Encoded methodology, highest-engagement carousel topics to build next:

1. **"The Stack" explainer** — what "getting low enough in the stack" actually means
2. **"Why therapy didn't work"** — why top-down approaches don't resolve the source
3. **The 35-minute protocol** — 25 min morning + 10 min evening imprinting, made concrete
4. **"What is imprinting?"** — core mechanism explained simply
5. **Another member story** — rotate with a second person when story + consent available

---

## Approval Workflow

1. Claude generates HTML + JSON pair
2. Run: `node screenshot.js [name]`
3. Review PNGs
4. Share with team for sign-off
5. Push to GitHub → schedule in Buffer

Design templates approved as of v1–v11 + v4c experience format.

---

## Posting Workflow

1. Claude generates HTML + JSON → download both → place in repo folder
2. Add entry to `screenshot.js` CAROUSELS array
3. VS Code Source Control: stage → commit → sync
4. Run: `node screenshot.js [name]`
5. PNGs in `output/[name]/` → upload to Buffer → schedule

---

## Git Workflow in VS Code

Stage → type commit message → Commit (✓) → Sync Changes

Commit message conventions:
```
Add carousel: v12-topic-name
Update carousel: v2-prediction slide 3
Fix: slide counter overlap on v7
Update styles: eyebrow color to gold
Update CLAUDE.md: add new carousel to library
```

---

## How to Ask Claude to Generate a New Carousel

Paste this file, then say one of:

- **"Make a carousel about [topic] using the Encoded content"**
- **"Here is a member story: [paste]. Make an experience carousel."**
- **"Plan the next 4 carousels and make them all"**
- **"Come up with 3 new carousel topics"**

Claude will:
- Choose layouts per slide based on content type
- Follow all design rules above — dark only, no white slides ever
- Output HTML + JSON as a pair
- Apply standard treatments to every carousel: gold accent words, SWIPE → indicator, ENCODED.AI tag where appropriate
- Always include a CTA slide as the final slide
- Write an Instagram caption with encoded.ai link alongside every carousel
- Never repeat text across slides
- Never use boxes or centered layouts (exception: circular loop diagram)
- Never change content that wasn't asked to be changed
- Suggest the screenshot.js entry to add

---

## Future Improvements

- [ ] Generate JSON files for all existing carousels
- [ ] Content calendar — Notion linked to repo
- [ ] Caption copy — Claude writes Instagram caption + encoded.ai link alongside every HTML
- [ ] Proper series naming convention replacing v1, v2... numbering
- [ ] Pipeline automation
- [ ] YouTube thumbnail system
- [ ] CTA slide added to all older carousels (v1–v13)
- [ ] Full redesign pass — apply new standard treatments (gold accents, swipe, tag) to v1–v13
- [ ] Portrait versions of all existing carousels
