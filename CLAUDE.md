# CLAUDE.md — Encoded Carousel System
# Paste this file at the start of any new conversation with Claude.
# Claude will instantly know the full system, conventions, and workflow.
# Update this file whenever the system evolves.

---

## What This System Is

An Instagram carousel generation system for **Encoded.ai — The Frequency Era**.
Claude generates HTML carousel files. A Playwright script screenshots them into PNGs.
PNGs are uploaded to Buffer or Later and scheduled for Instagram.

---

## GitHub Repo

**Repo:** `https://github.com/MAJAJECAR/encoded-carousels`
**GitHub Pages:** `https://majajecar.github.io/encoded-carousels`
**Owner:** Personal GitHub account (MAJAJECAR), team access to be added later.

---

## Folder Structure

```
encoded-carousels/
├── CLAUDE.md                              ← this file
├── styles.css                             ← shared design system, all carousels link to this
├── generator.html                         ← web form for manual carousel creation
├── screenshot.js                          ← Playwright script: node screenshot.js
├── README.md                              ← team-facing docs
├── .gitignore                             ← excludes output/ and node_modules/
├── carousel-v1-capacity.html             ← Nervous System Capacity
├── carousel-v2-prediction.html           ← The Prediction Model
├── carousel-v3-identity.html             ← Identity, Beliefs, Intentions
├── carousel-v4-matt-wagner.html          ← Encoded Experiences: Matt Wagner
└── output/                               ← PNGs land here (gitignored, local only)
```

---

## Design System — Color Tokens

All tokens live in `styles.css`. The carousel palette uses warm editorial tones, not the pure
neutral web app colors. **Do not change these without being asked.**

```css
--bg:     #111009;                   /* main slide background — warm near-black */
--bg2:    #181612;                   /* card background */
--bg3:    #1d1b12;                   /* emphasized card background */
--gold:   #C9A84C;                   /* primary accent — use sparingly */
--gdim:   #7a6530;                   /* muted gold for italics, pull quotes */
--white:  #EDE8DC;                   /* primary text — warm white, editorial */
--gray:   #68665e;                   /* body text */
--gray2:  #3a3930;                   /* subtle text, handles */
--border: rgba(201,168,76,0.12);     /* card and rule borders */
--fh:     'DM Serif Display', serif; /* headlines */
--fb:     'DM Sans', sans-serif;     /* body, UI */
```

### Brand Color System Alignment

The carousel colors are intentionally warmer than the web app (which uses pure neutrals).
The web app brand file (`color.md`) is available for reference but **carousel colors stay as above**.
Only pull from the brand file if explicitly asked to match the web app aesthetic.

Approximate mapping for reference only:
- `--bg #111009` ≈ `color/surface/base #141414` (warmer)
- `--bg2 #181612` ≈ `color/surface/primary #191919` (warmer)
- `--white #EDE8DC` ≈ `color/text/primary #FFFFFF` (warmer, editorial)
- `--gold #C9A84C` ≈ `color/brand/gold-light #CCB085` (richer)
- `--gdim #7a6530` ≈ `color/brand/gold-medium #998464`
- `--border` ≈ `color/border/subtle` (gold-tinted instead of white alpha)

---

## Design System — Type Scale

```
.hxl  — 88px  DM Serif Display — cover headlines only
.hl   — 66px  DM Serif Display — statement slides
.hm   — 46px  DM Serif Display — slide headlines with cards below
.body — 30px  DM Sans 300      — body copy, always --gray
.sub  — 32px  DM Sans 300      — cover subheads
.ew   — 22px  DM Sans 500      — eyebrow labels, all caps, gold, leading rule
.qt   — 52px  DM Serif italic  — pull quotes
.qm   — 140px DM Serif         — decorative opening quote mark
.qa   — 22px  DM Sans 500      — quote attribution, all caps, --gdim
.sn   — 160px DM Serif Display — large stat numbers
.su   — 60px  DM Sans 300      — stat units (%, ×, wks)
.brand— 22px  DM Sans 500      — brand mark, all caps, gold
.cew  — 18px  DM Sans 500      — card eyebrow labels
.ct   — 36px  DM Serif Display — card titles
.cb   — 26px  DM Sans 300      — card body copy
```

---

## Design System — Layout Classes

```
.g2      — 2-column card grid (1fr 1fr, gap 18px)
.g3h     — 3-column label grid
.seq     — vertical sequence column (stacked cards + down arrows)
.hflow   — horizontal flow (3 cards side by side + right arrows)
.nrow    — numbered list row (gold number + body text)
.vbar    — vertical gold bar + italic pullout text
.card    — standard card (bg2, gold-tinted border)
.card.em — emphasized card (bg3, gold border) — max ONE per slide
.spacer  — flex:1 spacer, pushes content to edges
.rule    — full-width 1px gold-tinted divider
.bgn     — large ghost slide number (bottom right, decorative)
.corner  — corner bracket decoration (cover slides only)
```

---

## Slide Types and When to Use Each

| Type | Structure | Use when |
|------|-----------|----------|
| Cover | `.hxl` + `.sub` + `.brand` + `.corner` | Always slide 1 |
| Statement | `.ew` + `.hl` only | Strong single idea, no clutter |
| Statement + sub | `.hl` + `.body` + `.vbar` | Headline needs supporting context |
| Numbered list | `.hm` + `.rule` + `.nrow` ×4 | Sequential points, symptoms, signs |
| Comparison | `.hm` + `.g2` (one `.card`, one `.card.em`) | Two opposing ideas |
| Sequence | `.hm` + `.seq` + down arrows | 3-step process with directional flow |
| Horizontal flow | `.hm` + `.hflow` + right arrows | 3 parallel items, no hierarchy |
| Quote | `.qm` + `.qt` + `.qa` + `.spacer` both sides | Powerful single quote, full slide |
| Stat | `.sn` + `.su` + caption + `.g3h` | Large number as the story |
| Grid | `.g2` 2×2 cards | 4 parallel items |
| Closing | `.hl` + `.brand` + CTA line | Always last slide |

---

## Emphasis Rules

- **Maximum ONE `.card.em`** per slide. Never two.
- Gold `var(--gold)` in headlines: ONE word or phrase per slide maximum.
- `.bgn` ghost numbers: always present slides 2–9, decorative only.
- `.corner` bracket: cover slides only.
- `.qm` quote mark: quote slides only, never decorative.
- `Encoded.Ai` brand mark: appears ONCE per slide, never repeated.

---

## Density Limits

- Maximum **4 cards** in a `.g2` grid (2×2)
- Maximum **3 steps** in a `.seq` sequence
- Maximum **3 columns** in `.hflow`
- Maximum **4 items** in a `.nrow` numbered list
- If content exceeds these limits — split across two slides

---

## HTML File Conventions

Every carousel HTML file must:
1. Link to `styles.css` — never embed CSS inline
2. Link to Google Fonts (DM Sans + DM Serif Display)
3. Set `html, body` to `width:1080px; height:1080px; overflow:hidden`
4. Set `.slide` to `position:absolute; width:1080px; height:1080px; padding:88px 86px`
5. Have first slide as `class="slide active"`
6. Expose `window.goToSlide(n)` for the screenshot script

```html
<link rel="stylesheet" href="styles.css">

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

## screenshot.js — How It Works

```bash
node screenshot.js                    # screenshots all carousels
node screenshot.js carousel-name      # screenshots one by name
```

**To add a new carousel:**
1. Drop the HTML file in the repo folder
2. Open `screenshot.js`, add to the CAROUSELS array:
```js
{
  name:   'your-carousel-name',
  file:   'carousel-your-file.html',
  slides: 10,
},
```
3. Push to GitHub, run `node screenshot.js your-carousel-name`

**GitHub Pages URL** (line ~18 in screenshot.js):
```js
const GITHUB_PAGES_URL = 'https://majajecar.github.io/encoded-carousels';
```

---

## Carousel Types We Make

### Type 1 — Series Carousels (Encoded book/content)

Topic-driven educational carousels. Always 10 slides:
- Slide 1: Cover
- Slides 2–9: Mix of statement, list, comparison, sequence, quote, stat
- Slide 10: Closing with CTA

**Tone:** Precise, calm, editorial. Premium neuroscience/performance content.
**CTA comment words used:** `CAPACITY`, `MODEL`, `IDENTITY`
**Next available:** `BELIEFS`, `LOOP`, `EXITS`, `EQUATION`, `INTENTIONS`, `SIGNALS`, `FOUNDATION`

### Type 2 — Experience Carousels (member stories)

Real member testimonials. Always 10 slides:
- Slide 1: Cover with member photo + hero quote
- Slide 2: The Before (what they were dealing with)
- Slides 3–4: Quote slides with small avatar
- Slides 5–6: What shifted (specific changes)
- Slide 7: Quote slide
- Slide 8: Stat slide (time, routine, number of shifts)
- Slide 9: Their advice / statement slide
- Slide 10: Closing with avatar + CTA

**CTA comment word:** `EXPERIENCE`
**Member photo:** embed as base64 in HTML (works local + GitHub Pages)
**Consent:** all members have given consent before publishing

---

## Content Sources — What We Have

All source material came from PDFs shared in the original conversation.

### Capacity Carousels PDF
Four series covering:
- **Nervous System Capacity** — what the ceiling is, the battery analogy ✅ Built (v1)
- **The Architecture** — vagal tone, HPA-axis, amygdala threshold (can build separately)
- **Regulation vs Capacity** — the critical distinction (can build separately)
- **The Battery Gets Bigger** — capacity is trainable, not fixed (can build separately)

### Social Carousels PDFs
Eight series covering:
- **The Prediction Model** — your belief arrives before your thought ✅ Built (v2)
- **The Compound Loop** — every confirming experience compounds ⬜ Not yet built
- **The Three Failed Exits** — think/learn/achieve your way out — none work ⬜ Not yet built
- **The Encoding Equation** — what actually changes a belief ⬜ Not yet built
- **Intentions vs Goals** — surface vs subconscious driving layer ⬜ Not yet built
- **Signs The Belief Is Running** — how to recognise the model in action ⬜ Not yet built
- **Identity, Beliefs, Intentions** — the Foundation series ✅ Built (v3)
- **Foundation Synthesis** — all three as one operating system ⬜ Not yet built

### Experience Stories
- **Matt Wagner** — President, Client Focus, 3 weeks in ✅ Built (v4)
- Future members: provided as text by team, consent confirmed before publishing

### Content Themes Available for New Carousels
When asked to create content, Claude can draw from these Encoded themes:
- Nervous system capacity and what limits performance
- Subconscious belief systems and how they drive behaviour
- The gap between effort and results — why discipline alone fails
- Identity as the source of every other program
- The difference between regulation and structural change
- What the encoding process actually looks like
- Extrinsic vs intrinsic motivation and what each costs
- Signs that a subconscious program is running
- Member transformation stories (when provided)

**What Claude should NOT do:**
- Invent claims not grounded in the Encoded source material
- Make medical or therapeutic promises
- Stray into generic self-help or motivational poster territory
- Use a casual or hype-driven tone — always precise and premium

---

## Branding Rules

- Brand name: **Encoded.Ai** (capital E, capital A — used exactly this way)
- Brand mark appears ONCE per slide, on closing slides and cover slides only
- Tagline: **The Frequency Era**
- Chapter reference: **Ch. 9** (used on Foundation series)
- Instagram handle: **@encoded** (used only in screenshot.js closing line — currently removed from slides)
- No Save/Share/Comment action blocks on closing slides (removed per team feedback)
- No repeated brand marks — if `.brand` and `.ew` would both say Encoded.Ai on the same slide, remove `.ew`

---

## Approval Workflow

1. Claude generates HTML
2. Download and screenshot locally: `node screenshot.js [name]`
3. Review PNGs
4. Share with team for design/content sign-off
5. Once approved: push HTML to GitHub, schedule PNGs in Buffer

Currently: approval is by the primary owner. A second reviewer may be added later.
**Design templates are approved as of v1–v4. Future carousels follow the same system.**

---

## Posting Workflow

1. Claude generates HTML → download → place in `encoded-carousels/` folder
2. Add entry to `screenshot.js` CAROUSELS array
3. Push to GitHub: stage → commit → sync in VS Code Source Control
4. Run: `node screenshot.js [carousel-name]`
5. PNGs appear in `output/[carousel-name]/`
6. Upload to **Buffer** → schedule for Instagram
7. Post frequency: high — content calendar to be built

---

## Carousels Built So Far

| File | Topic | CTA | Status |
|------|-------|-----|--------|
| carousel-v1-capacity.html | Nervous System Capacity | CAPACITY | ✅ Ready |
| carousel-v2-prediction.html | The Prediction Model | MODEL | ✅ Ready |
| carousel-v3-identity.html | Identity, Beliefs, Intentions | IDENTITY | ✅ Ready |
| carousel-v4-matt-wagner.html | Experience: Matt Wagner | EXPERIENCE | ✅ Ready |

**Next up (not yet built):**
- The Compound Loop
- The Three Failed Exits
- The Encoding Equation
- Intentions vs Goals
- Signs The Belief Is Running
- Foundation Synthesis
- Next experience member (when story provided)

---

## Git Workflow in VS Code

**Committing new or changed files:**
1. Source Control icon (left sidebar — branching tree)
2. Click `+` to stage files
3. Type commit message
4. Click Commit (✓)
5. Click Sync Changes

**Commit message conventions:**
```
Add carousel: compound-loop
Update styles: increase body text size
Fix: brand mark duplication on closing slide
Update CLAUDE.md: add content sources
Add assets: member-name profile photo
```

---

## Future Improvements (To Do)

- [ ] Establish proper naming convention — e.g. `capacity-01`, `experiences-matt-wagner`
- [ ] Move member photos to `assets/` folder once team is on GitHub Pages
- [ ] Add portrait format (1080×1350) for single statement posts
- [ ] Build content calendar — Notion or similar, linked to repo
- [ ] Caption copy generation — Claude to write Instagram caption alongside HTML
- [ ] Connect Buffer API for more automated scheduling (future)
- [ ] Add second approver to review workflow
- [ ] Plan series posting order — carousels build on each other week to week
