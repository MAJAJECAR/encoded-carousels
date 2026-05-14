# TEMPLATES.md — Encoded Carousel Slide Types
# Technical reference for every layout in the system.
# See carousel-master-template.html for live examples of each.

---

## Standard Treatments — Applied to Every Carousel

These three elements are required on every carousel. Add them to every content slide.

### 1. Gold Accent Word
```html
<span class="g">word</span>
```
- Use on 1 key word in headline text only
- Never on body, muted, or sub text
- CSS: `.g { color: var(--gold); }`

### 2. SWIPE Indicator
```html
<div class="swipe">SWIPE <div class="swipe-circle"><svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 6H11M11 6L6.5 1.5M11 6L6.5 10.5" stroke="#141414" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>
```
- Present on all slides except Closing and CTA
- Cover slide: present, but remove the `<div class="rule"></div>` at bottom of cover

### 3. ENCODED.AI Tag
```html
<div class="tag-tr">Encoded.Ai</div>
```
- Only on content slides where it fits without crowding
- NEVER on: cover, closing, CTA, hero-ring slides, loop diagram slides
- NEVER if brand mark is already on the slide

---

## Slide Types

---

### TYPE 01 — COVER
**Use:** Always slide 1 of every carousel.

**Key rules:**
- Brand mark top left
- `.corner` decoration top right
- No slide counter
- Swipe indicator present
- Rule at bottom REMOVED (cover has no rule)

```html
<div class="slide active" id="slide-1">
  <div class="corner"></div>
  <div class="brand" style="margin-bottom:auto;">Encoded.Ai</div>
  <div class="spacer"></div>
  <div class="ew" style="margin-bottom:36px;">EYEBROW TEXT</div>
  <h1 class="hxl">Headline with<br><span class="g">accent word</span><br>here.</h1>
  <div class="g20"></div>
  <p class="sub">Subhead — one sentence, sets up the carousel.</p>
  <div class="g24"></div>
  <div class="swipe">SWIPE <div class="swipe-circle"><!-- SVG arrow --></div></div>
</div>
```

---

### TYPE 02 — STATEMENT
**Use:** Core content slides. One idea, one short supporting line.

**Key rules:**
- `spacer` above and below content pushes it to vertical center
- Gold on max 1 word in `.hl` only
- Muted body text — never gold

```html
<div class="slide" id="slide-n">
  <div class="tag-tr">Encoded.Ai</div>
  <div class="swipe"><!-- swipe indicator --></div>
  <div class="spacer"></div>
  <div class="ew" style="margin-bottom:36px;">EYEBROW</div>
  <h2 class="hl">Headline with one<br><span class="g">key word</span> in gold.</h2>
  <div class="g16"></div>
  <p class="body muted">Supporting body text. One or two sentences max.</p>
  <div class="spacer"></div>
</div>
```

---

### TYPE 03 — NUMBERED LIST
**Use:** 2–4 parallel items. Each item is a short noun phrase.

**Key rules:**
- Max 4 items
- Wrap in a flex container with `justify-content:center; flex:1` for vertical centering
- Gold on key word in `.ntext` only

```html
<div class="slide" id="slide-n">
  <div class="tag-tr">Encoded.Ai</div>
  <div class="swipe"><!-- swipe indicator --></div>
  <div class="ew" style="margin-bottom:40px;">EYEBROW</div>
  <div style="display:flex; flex-direction:column; flex:1; justify-content:center; gap:0;">
    <div class="nrow" style="padding:28px 0;">
      <div class="nnum">01</div>
      <div class="ntext">Item one with <span class="g">accent</span></div>
    </div>
    <div class="nrule"></div>
    <div class="nrow" style="padding:28px 0;">
      <div class="nnum">02</div>
      <div class="ntext">Item two</div>
    </div>
    <div class="nrule"></div>
    <div class="nrow" style="padding:28px 0;">
      <div class="nnum">03</div>
      <div class="ntext">Item three</div>
    </div>
  </div>
</div>
```

---

### TYPE 04 — SINGLE POINT
**Use:** One striking point. Large mono number + headline. No body text.

```html
<div class="slide" id="slide-n">
  <div class="tag-tr">Encoded.Ai</div>
  <div class="swipe"><!-- swipe indicator --></div>
  <div class="spacer"></div>
  <div class="ew" style="margin-bottom:36px;">EYEBROW</div>
  <div style="font-family:var(--fmono); font-size:120px; font-weight:400; color:var(--t4); letter-spacing:-0.02em; line-height:1;">01</div>
  <h2 class="hl" style="margin-top:16px;">The point in one<br><span class="g">clear line.</span></h2>
  <div class="spacer"></div>
</div>
```

---

### TYPE 05 — QUOTE
**Use:** Strong single quote. Pull out a key idea as a statement.

```html
<div class="slide" id="slide-n">
  <div class="tag-tr">Encoded.Ai</div>
  <div class="swipe"><!-- swipe indicator --></div>
  <div class="spacer"></div>
  <div class="qmark">"</div>
  <div class="g16"></div>
  <p class="qtext">The quote text with one<br><span class="g">accented word.</span></p>
  <div class="spacer"></div>
</div>
```

---

### TYPE 06 — VERTICAL FLOW
**Use:** Sequential process. 2–3 steps with dot + line connector.

**Key rules:**
- Wrap in `justify-content:center; flex:1` container
- Set `margin-bottom` on wrapper to offset from true center (approx 280–350px)
- Set `flex:0` on `.vflow` itself
- Gold on `.vflow-title` only, never on `.vflow-sub`

```html
<div class="slide" id="slide-n">
  <div class="swipe"><!-- swipe indicator --></div>
  <div style="display:flex; flex-direction:column; justify-content:center; flex:1; margin-bottom:280px;">
    <div class="ew" style="margin-bottom:40px;">EYEBROW</div>
    <div class="vflow" style="flex:0;">
      <div class="vflow-step">
        <div class="vflow-left">
          <div class="vflow-dot active"></div>
          <div class="vflow-line"></div>
        </div>
        <div class="vflow-content">
          <div class="vflow-label">01 — LABEL</div>
          <div class="vflow-title">Step title <span class="g">here</span></div>
          <div class="vflow-sub">Supporting description.</div>
        </div>
      </div>
      <!-- repeat vflow-step for each step -->
      <!-- last step: omit vflow-line, set vflow-content padding-bottom:0 -->
    </div>
  </div>
</div>
```

---

### TYPE 07 — 3-COLUMN STAT GRID
**Use:** Three parallel data points or categories side by side.

**Key rules:**
- Wrap in `justify-content:center; flex:1` container
- Set `flex:0` on `.col-grid`
- All col-labels gold
- Numbers white (`--t1`)

```html
<div class="slide" id="slide-n">
  <div class="swipe"><!-- swipe indicator --></div>
  <div style="display:flex; flex-direction:column; justify-content:center; flex:1;">
    <div class="ew" style="margin-bottom:40px;">EYEBROW</div>
    <div class="col-grid" style="flex:0;">
      <div class="col-item">
        <div class="col-num">01</div>
        <div class="rule"></div>
        <div class="col-label gold">Label</div>
        <p class="col-body">Body text for this column.</p>
      </div>
      <div class="col-item">
        <div class="col-num">02</div>
        <div class="rule"></div>
        <div class="col-label gold">Label</div>
        <p class="col-body">Body text for this column.</p>
      </div>
      <div class="col-item">
        <div class="col-num">03</div>
        <div class="rule"></div>
        <div class="col-label gold">Label</div>
        <p class="col-body">Body text for this column.</p>
      </div>
    </div>
  </div>
</div>
```

---

### TYPE 08 — SPLIT STAT
**Use:** Two contrasting ideas or numbers side by side, divided by a vertical rule.

```html
<div class="slide" id="slide-n">
  <div class="tag-tr">Encoded.Ai</div>
  <div class="swipe"><!-- swipe indicator --></div>
  <div class="ew" style="margin-bottom:40px;">EYEBROW</div>
  <div class="split-wrap">
    <div class="split-left">
      <div class="split-label">Left label</div>
      <div class="split-num">5%</div>
      <p class="split-body">Context for the left stat.</p>
    </div>
    <div class="split-rule"></div>
    <div class="split-right">
      <div class="split-label gold">Right label</div>
      <div class="split-num"><span class="g">95%</span></div>
      <p class="split-body">Context for the right stat.</p>
    </div>
  </div>
</div>
```

---

### TYPE 08b — SPLIT NUMBER + CONTEXT
**Use:** Giant number dominates left, context text right. Cleaner and more visual than 08. Use when the number IS the story and the right side is explanation only.

**Key rules:**
- Number: Switzer 800, 180px+, `--t1`
- Label below number: Manrope 300, uppercase, `--t4`
- Full-height vertical rule between halves: `margin:0 56px`
- Right side: gold label + body paragraph only — no number
- Content vertically centered via `align-items:center` on the flex row

```html
<div class="slide" id="slide-n">
  <div class="tag-tr">Encoded.Ai</div>
  <div class="swipe"><!-- swipe indicator --></div>
  <div class="ew" style="margin-bottom:40px;">EYEBROW</div>
  <div style="display:flex; align-items:center; flex:1; gap:0;">
    <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
      <div style="font-family:var(--fs); font-size:180px; font-weight:800; letter-spacing:-0.04em; line-height:0.88; color:var(--t1);">25</div>
      <div style="font-family:var(--fm); font-size:16px; font-weight:300; letter-spacing:0.12em; text-transform:uppercase; color:var(--t4);">label</div>
    </div>
    <div style="width:1px; background:rgba(255,255,255,0.08); align-self:stretch; margin:0 56px;"></div>
    <div style="flex:1; display:flex; flex-direction:column; gap:24px; justify-content:center;">
      <div class="split-label gold">Context label</div>
      <p class="split-body">Explanation of what the number means.</p>
    </div>
  </div>
</div>
```

---

### TYPE 08c — EXPERIENCE STAT POSTER
**Use:** Member story result slides. Giant number tells the outcome, bold context right, two protocol stats at bottom.

**Key rules:**
- Giant number: Switzer 800, 280px, `--t1`, `letter-spacing:-0.06em`
- Word label below number: Manrope 300, uppercase, `--t4`, `letter-spacing:0.28em`
- Context text: Switzer 700, 32px, white, right-aligned, max-width 360px
- Rule divides top/bottom sections
- Bottom row: two stat cells, `height:180px`, divided by `border-left:1px solid var(--b-sub)`
- Stat cell numbers: Switzer 700, 110px
- Stat cell labels: Space Mono, uppercase, gold
- swipe only — no tag-tr

---

### TYPE 09 — BIG NUMBER HERO
**Use:** One number tells the whole story. Full-slide stat with decorative rings.

**Key rules:**
- Two `.hero-ring` divs for depth (outer: default, inner: `.bright`)
- Content absolutely positioned: `top:50%; left:50%; transform:translate(-50%,-52%)`
- Width of content div: ~720px
- No `tag-tr` — rings conflict visually

```html
<div class="slide" id="slide-n">
  <div class="swipe"><!-- swipe indicator --></div>
  <div class="hero-ring" style="width:780px; height:780px;"></div>
  <div class="hero-ring bright" style="width:560px; height:560px;"></div>
  <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-52%); width:720px;">
    <div class="ew" style="margin-bottom:32px;">EYEBROW</div>
    <div style="font-family:var(--fs); font-size:240px; font-weight:800; letter-spacing:-0.04em; line-height:0.88; color:var(--t1);"><span class="g">95</span>%</div>
    <div style="font-family:var(--fm); font-size:20px; font-weight:300; letter-spacing:0.12em; text-transform:uppercase; color:var(--t4); margin-top:8px;">label below number</div>
    <div class="rule" style="margin:32px 0 24px;"></div>
    <p style="font-family:var(--fm); font-size:24px; font-weight:300; color:var(--t3); line-height:1.5; margin:0;">
      Supporting context sentence.
    </p>
  </div>
</div>
```

---

### TYPE 10 — CONCENTRIC CIRCLES
**Use:** Nested scale or hierarchy. Text labels left, circles right.

```html
<div class="slide" id="slide-n">
  <div class="tag-tr">Encoded.Ai</div>
  <div class="swipe"><!-- swipe indicator --></div>
  <div class="ew" style="margin-bottom:40px;">EYEBROW</div>
  <div style="display:flex; align-items:center; flex:1; gap:64px;">
    <div style="flex:1; display:flex; flex-direction:column; gap:28px;">
      <!-- label rows -->
    </div>
    <div class="cc-wrap" style="width:440px; height:440px; position:relative; flex-shrink:0;">
      <div class="cc-circle" style="width:440px; height:440px; background:var(--s2);">
        <div class="cc-label" style="position:absolute; top:36px;">Outer</div>
      </div>
      <div class="cc-circle" style="width:300px; height:300px; background:var(--s3);">
        <div class="cc-label" style="position:absolute; top:28px;">Mid</div>
      </div>
      <div class="cc-circle" style="width:160px; height:160px; background:var(--s4);">
        <div class="cc-label gold">Core</div>
      </div>
    </div>
  </div>
</div>
```

---

### TYPE 11 — CIRCULAR LOOP DIAGRAM
**Use:** Repeating cycle or system. 4 nodes connected by directional arrows.

**Key rules:**
- ONLY approved exception to left-align rule
- Diagram centered via: `position:absolute; top:42%; left:50%; transform:translate(-50%,-50%)`
- Caption pinned at `bottom:120px`
- Node dot colors: top = gold, others = `--t3`

```html
<div class="slide" id="slide-n">
  <div class="swipe"><!-- swipe indicator --></div>
  <div class="ew" style="margin-bottom:0;">EYEBROW</div>
  <div class="loop-wrap" style="position:absolute; top:42%; left:50%; transform:translate(-50%,-50%);">
    <!-- SVG circle track + arrows -->
    <!-- loop-node divs for top/right/bottom/left -->
  </div>
  <div style="position:absolute; bottom:120px; left:86px; right:86px;">
    <p class="body muted">Caption text below diagram.</p>
  </div>
</div>
```

---

### TYPE 12 — CLOSING
**Use:** Always second-to-last slide. Thematic resolution.

**Key rules:**
- `.corner` decoration
- No swipe, no tag-tr, no slide counter
- Brand mark at bottom

```html
<div class="slide" id="slide-n">
  <div class="corner"></div>
  <div class="spacer"></div>
  <h2 class="hl">Closing headline<br>thematic resolution<br>with <span class="g">one accent.</span></h2>
  <div class="spacer"></div>
  <div class="rule"></div>
  <div class="g20"></div>
  <div class="brand">Encoded.Ai</div>
</div>
```

---

### TYPE 13 — CTA
**Use:** Always final slide of every carousel.

**Key rules:**
- No swipe, no tag-tr, no slide counter
- `encoded.ai` in gold as `.cta-url`
- "Link in bio" + `@encoded.ai` at bottom
- Brand mark at top left

```html
<div class="slide" id="slide-n">
  <div class="brand" style="margin-bottom:auto;">Encoded.Ai</div>
  <div style="flex:1; display:flex; flex-direction:column; justify-content:center; gap:0;">
    <div class="ew" style="margin-bottom:28px;">Start Here</div>
    <h2 class="hl" style="margin:0;">Train what AI<br>can't replace.</h2>
    <div class="cta-url" style="margin-top:4px;">encoded.ai</div>
  </div>
  <div style="display:flex; flex-direction:column; gap:16px;">
    <div class="rule"></div>
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div class="cta-action">Link in bio</div>
      <div class="cta-follow" style="color:var(--t4); font-size:14px;">@encoded.ai</div>
    </div>
  </div>
</div>
```

---

### TYPE 14 — EXPERIENCE COVER (Photo Split)
**Use:** Member story carousels only. Cover slide with full-bleed portrait photo.

**Key rules:**
- Photo: `width:630px`, `object-position: center top`, anchored `right:0`
- Two gradients combined: bottom-to-top fade + left-to-right fade (5 stops, no hard line)
- Replace `matt-wagner.jpg` with actual member photo filename
- Text and brand mark sit on top via `position:relative; z-index:2`

```html
<div class="slide" id="slide-1">
  <div class="photo-split">
    <img src="[member-name].jpg" alt="Member photo">
  </div>
  <div class="corner"></div>
  <div class="brand" style="margin-bottom:auto; position:relative; z-index:2;">Encoded.Ai</div>
  <div style="position:relative; z-index:2; flex:1; display:flex; flex-direction:column; justify-content:flex-end;">
    <div class="ew" style="margin-bottom:32px;">Encoded Experiences</div>
    <h2 class="hl" style="margin-bottom:32px;">Member quote<br>or key result.</h2>
    <div class="rule" style="margin-bottom:24px;"></div>
    <div style="font-family:var(--fs); font-size:28px; font-weight:700; color:var(--t1);">Member Name</div>
    <div style="font-family:var(--fm); font-size:18px; font-weight:300; color:var(--t4); margin-top:6px;">Role, Company</div>
    <div style="font-family:var(--fmono); font-size:13px; letter-spacing:0.14em; text-transform:uppercase; color:var(--gold); margin-top:8px;">X Weeks Into Encoded</div>
  </div>
</div>
```

---

## Quick Reference

| Type | Classes | Swipe | Tag-TR | Corner |
|------|---------|-------|--------|--------|
| 01 Cover | `.hxl` `.sub` `.brand` `.corner` | ✅ | ❌ | ✅ |
| 02 Statement | `.hl` `.body.muted` | ✅ | ✅ | ❌ |
| 03 Numbered List | `.nrow` `.nnum` `.ntext` `.nrule` | ✅ | ✅ | ❌ |
| 04 Single Point | mono number + `.hl` | ✅ | ✅ | ❌ |
| 05 Quote | `.qmark` `.qtext` | ✅ | ✅ | ❌ |
| 06 Vertical Flow | `.vflow` `.vflow-step` `.vflow-title` | ✅ | ❌ | ❌ |
| 07 3-Column Grid | `.col-grid` `.col-item` `.col-num` `.col-label` | ✅ | ❌ | ❌ |
| 08 Split Stat | `.split-wrap` `.split-rule` `.split-num` | ✅ | ✅ | ❌ |
| 08b Split Number + Context | giant number left + rule + context right | ✅ | ✅ | ❌ |
| 08c Experience Stat Poster | giant number + context top, two stat cells bottom | ✅ | ❌ | ❌ |
| 09 Big Number Hero | `.hero-ring` + absolute content | ✅ | ❌ | ❌ |
| 10 Concentric Circles | `.cc-wrap` `.cc-circle` `.cc-label` | ✅ | ✅ | ❌ |
| 11 Circular Loop | `.loop-wrap` `.loop-node` | ✅ | ❌ | ❌ |
| 12 Closing | `.hl` `.rule` `.brand` `.corner` | ❌ | ❌ | ✅ |
| 13 CTA | `.cta-url` `.cta-action` `.cta-follow` | ❌ | ❌ | ❌ |
| 14 Experience Cover | `.photo-split` | ❌ | ❌ | ✅ |
