# Encoded Carousel System

Instagram carousel generation system for Encoded.Ai.
HTML files are screenshotted into PNGs via Playwright and scheduled in Buffer.

---

## How It Works

1. Each carousel is a single HTML file — multiple `.slide` divs, one per Instagram frame
2. `node screenshot.js [name]` renders each slide to a 1080×1080 PNG
3. PNGs go to `output/[name]/` — upload to Buffer and schedule

---

## File Structure

```
encoded-carousels/
├── styles.css                    ← Single design system — all carousels link to this
├── screenshot.js                 ← Playwright renderer
├── carousel-master-template.html ← All 14 slide types in one reference file
├── TEMPLATES.md                  ← Technical docs for every slide type
├── CLAUDE.md                     ← Full system prompt for Claude AI generation
├── carousel-v1-capacity.html     ← Individual carousels
├── carousel-v2-prediction.html
│   ... (all carousel HTML files)
├── matt-wagner.jpg               ← Member photo (experience carousels)
└── output/                       ← PNGs, gitignored, local only
```

---

## Running Screenshots

```bash
# Single carousel
node screenshot.js v22-frequency-era

# All carousels
node screenshot.js
```

PNGs saved to `output/[name]/slide-01.png`, `slide-02.png`, etc.

---

## Design System

All design tokens, typography, layout classes, and component styles live in `styles.css`.
Never embed CSS inline in HTML files — always use classes from `styles.css`.

### Key Tokens
```css
--base:  #141414   /* slide background */
--gold:  #CCB085   /* brand accent — used once per slide */
--t1:    #FFFFFF   /* headlines */
--t2:    #D0D0D0   /* subheads */
--t3:    #C4C4C4   /* body */
--t4:    #898989   /* muted / eyebrows */
```

### Fonts
- **Switzer** — headlines (Fontshare)
- **Manrope** — body, eyebrows, UI (Google Fonts)
- **Space Mono** — numbers, labels, counters (Google Fonts)

Every HTML file must include this import block:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://api.fontshare.com">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500&family=Space+Mono:wght@400&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
```

---

## Standard Treatments

Every carousel includes these three elements on content slides:

### Gold Accent Word
```html
<span class="g">key word</span>
```
One key word per headline, headlines only — never body text.

### SWIPE Indicator
Bottom right on all slides except Closing and CTA.
```html
<div class="swipe">SWIPE <div class="swipe-circle"><svg viewBox="0 0 12 12" ...></svg></div></div>
```

### ENCODED.AI Tag
Top right on content slides where it fits.
```html
<div class="tag-tr">Encoded.Ai</div>
```
Never on: cover, closing, CTA, hero-ring slides, loop diagram slides.

---

## Slide Types

14 distinct slide types. See `TEMPLATES.md` for full specs and HTML snippets.

| # | Type | When to use |
|---|------|-------------|
| 01 | Cover | Always slide 1 |
| 02 | Statement | Core content — one idea |
| 03 | Numbered List | 2–4 parallel items |
| 04 | Single Point | One striking point, no body |
| 05 | Quote | Pull quote |
| 06 | Vertical Flow | Sequential process steps |
| 07 | 3-Column Grid | Three parallel stats or categories |
| 08 | Split Stat | Two contrasting numbers or ideas |
| 09 | Big Number Hero | One number tells the whole story |
| 10 | Concentric Circles | Nested scale or hierarchy |
| 11 | Circular Loop | Repeating cycle or system |
| 12 | Closing | Always second-to-last slide |
| 13 | CTA | Always final slide |
| 14 | Experience Cover | Member story carousels only |

---

## Carousel Structure

Every carousel follows this structure:

```
Slide 1:   Cover (TYPE 01)
Slides 2–N: Content slides (any mix of TYPES 02–11)
Slide N-1: Closing (TYPE 12)
Slide N:   CTA (TYPE 13)
```

Rules:
- Prefer 6–10 slides. Max 20.
- One idea per slide — never crowd two points onto one slide
- All dark backgrounds — no light/white slides ever
- Gold used once per slide maximum

---

## Adding a New Carousel

1. Create `carousel-[name].html` using slide types from `carousel-master-template.html`
2. Add entry to `screenshot.js` CAROUSELS array:
```js
{ name: 'your-name', file: 'carousel-your-name.html', slides: 8 },
```
3. Run: `node screenshot.js your-name`
4. Commit and push to GitHub
5. Upload PNGs to Buffer

---

## Generating Carousels with Claude

Upload `CLAUDE.md` to a Claude.ai project as project knowledge.
Then in any new chat within that project:

```
Make a carousel about [topic] using the Encoded content
```

Claude will output the HTML file ready to drop into the repo.

---

## Experience Carousels

Member story carousels use a special photo-split layout (TYPE 14).

Requirements:
- Member photo: `[member-name].jpg` in repo root
- Photo specs: portrait, high res, good face visibility
- Consent confirmed before publishing

Reference: `carousel-v4-matt-wagner.html`

---

## GitHub Pages Preview

Live preview URL: `https://majajecar.github.io/encoded-carousels`

Used by `screenshot.js` to render carousels — files must be pushed to GitHub before screenshots work.
