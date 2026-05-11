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
├── CLAUDE.md
├── styles.css                              ← shared design system, all carousels link to this
├── generator.html                          ← web form for manual carousel creation
├── screenshot.js                           ← Playwright: node screenshot.js [name]
├── README.md
├── .gitignore                              ← excludes output/ and node_modules/
├── carousel-v1-capacity.html
├── carousel-v1-capacity.json
├── carousel-v2-prediction.html
├── carousel-v2-prediction.json
│   ... (all carousel HTML + JSON pairs)
└── output/                                 ← PNGs, gitignored, local only
```

---

## Output Rule — Always Deliver Both Files

**Every time Claude generates or updates a carousel, it delivers:**
1. The `.html` file
2. The matching `.json` file

No exceptions. HTML and JSON are always delivered as a pair.

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
```

---

## Slide Types

| Type | Key classes | Use when |
|------|-------------|----------|
| Cover | `.hxl` + `.sub` + `.brand` + `.corner` + `.rule` | Always slide 1 |
| Statement | `.ew` + `.hl` + optional `.body.muted` | Single bold idea |
| Numbered list | `.hm` + `.nrow`/`.nnum`/`.ntext`/`.nrule` | 2–4 short items |
| Single point | `.ew` + mono number + `.hl` | One point = one slide |
| Left sequence | Vertical line + bullets + label + title | Flow/process slides |
| Quote | `.qmark` + `.qtext` | Strong single quote |
| Stat | large number + caption | Data-led slide |
| Closing | `.hl` + `.rule` + `.brand` | Always last slide |

---

## Visual Layer — Modular Elements

This is the second layer of the design system, added on top of the existing typography and layout system.
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
Never on body text, never on multiple elements on the same slide.

**Encoded.Ai appears once per slide.** Never repeated on the same slide.
On closing slides: brand mark only. On cover: brand mark at top only.
No "— The Frequency Era" suffix. No "Comment [WORD]" lines anywhere.

**Slide counter stays clear.** Must never overlap text, decorations, or lists.
Counter format: `02 / 08` (zero-padded, space around slash).

**No repeated closing.** If slide N-1 and slide N say the same thing, delete slide N-1.

**Instagram carousel max: 20 slides.** Prefer 6–10. Keep it light.
When content is dense, split into multiple shorter carousels rather than one long one.

**Never delete or change content unless explicitly asked.** If a slide has text, keep it exactly as-is. Only change what is specifically requested. Do not rewrite, trim, or reorder slides on your own judgment.

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

---

## screenshot.js Usage

```bash
node screenshot.js                  # all carousels
node screenshot.js v4c-matt-wagner-circle2   # one carousel by name
```

**GitHub Pages URL** (line ~18 in screenshot.js):
```js
const GITHUB_PAGES_URL = 'https://majajecar.github.io/encoded-carousels';
```

---

## Current Carousel Library

| File | Topic | Slides | Status |
|------|-------|--------|--------|
| carousel-v1-capacity | Nervous System Capacity | 8 | ✅ |
| carousel-v2-prediction | The Prediction Model | 9 | ✅ |
| carousel-v2b-compound-loop | The Compound Loop (split) | 10 | ✅ |
| carousel-v3-identity | Identity, Beliefs, Intentions | 7 | ✅ |
| carousel-v3b-identity-symptoms | When Identity Is Fragmented | 7 | ✅ |
| carousel-v4-matt-wagner | Matt Wagner (old layout) | 8 | ⚠️ old design |
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

---

## screenshot.js CAROUSELS Array (current)

```js
{ name: 'v1-capacity',              file: 'carousel-v1-capacity.html',             slides: 8  },
{ name: 'v2-prediction',            file: 'carousel-v2-prediction.html',           slides: 9  },
{ name: 'v2b-compound-loop',        file: 'carousel-v2b-compound-loop.html',       slides: 10 },
{ name: 'v3-identity',              file: 'carousel-v3-identity.html',             slides: 7  },
{ name: 'v3b-identity-symptoms',    file: 'carousel-v3b-identity-symptoms.html',   slides: 7  },
{ name: 'v4-matt-wagner',           file: 'carousel-v4-matt-wagner.html',          slides: 8  },
{ name: 'v4b-matt-wagner-circle',   file: 'carousel-v4b-matt-wagner-circle.html',  slides: 8  },
{ name: 'v4c-matt-wagner-circle2',  file: 'carousel-v4c-matt-wagner-circle2.html', slides: 9  },
{ name: 'v5-compound-loop',         file: 'carousel-v5-compound-loop.html',        slides: 6  },
{ name: 'v6-three-exits',           file: 'carousel-v6-three-exits.html',          slides: 6  },
{ name: 'v7-encoding-equation',     file: 'carousel-v7-encoding-equation.html',    slides: 7  },
{ name: 'v8-intentions-vs-goals',   file: 'carousel-v8-intentions-vs-goals.html',  slides: 6  },
{ name: 'v8b-extrinsic-symptoms',   file: 'carousel-v8b-extrinsic-symptoms.html',  slides: 5  },
{ name: 'v9-signs-belief-running',  file: 'carousel-v9-signs-belief-running.html', slides: 7  },
{ name: 'v9b-four-signals',         file: 'carousel-v9b-four-signals.html',        slides: 6  },
{ name: 'v10-foundation',           file: 'carousel-v10-foundation.html',          slides: 7  },
{ name: 'v10b-what-changes',        file: 'carousel-v10b-what-changes.html',       slides: 5  },
{ name: 'v11-response-sequence',    file: 'carousel-v11-response-sequence.html',   slides: 7  },
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
- Follow all design rules above
- Output HTML + JSON as a pair
- Never repeat text across slides
- Never use boxes or centered layouts
- Never change content that wasn't asked to be changed
- Suggest the screenshot.js entry to add

---

## Future Improvements

- [ ] Generate JSON files for all existing carousels (v2–v11)
- [ ] Portrait format (1080×1350) — CSS canvas variable system
- [ ] Content calendar — Notion linked to repo
- [ ] Caption copy — Claude writes Instagram caption alongside HTML
- [ ] Proper series naming convention replacing v1, v2... numbering
- [ ] Pipeline automation (see PIPELINE_TICKET.md)
- [ ] YouTube thumbnail system (see THUMBNAIL_TICKET.md)
