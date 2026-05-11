// screenshot.js
// ─────────────────────────────────────────────────────────────────────────────
// Encoded Carousel Screenshot Tool
// Run with: node screenshot.js
//
// HOW TO ADD A NEW CAROUSEL:
//   1. Drop the new HTML file into this folder
//   2. Add an entry to the CAROUSELS array below
//   3. Run: node screenshot.js
//   4. Find your PNGs in the output/ folder
// ─────────────────────────────────────────────────────────────────────────────

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// ─── YOUR GITHUB PAGES URL ───────────────────────────────────────────────────
// Once GitHub Pages is live, paste your URL here:
// e.g. 'https://yourusername.github.io/encoded-carousels'
//
// While it's empty, the script uses local file paths instead.
const GITHUB_PAGES_URL = 'https://majajecar.github.io/encoded-carousels';

// ─── CAROUSELS ───────────────────────────────────────────────────────────────
// Add a new entry here every time you add a new carousel.
//
// name:   used as the output folder name — keep it short, no spaces
// file:   the HTML filename in this folder
// slides: number of slides (always 10 unless you change it)

const CAROUSELS = [
  { name: 'v1-capacity',             file: 'carousel-v1-capacity.html',             slides: 8 },
{ name: 'v2-prediction',           file: 'carousel-v2-prediction.html',           slides: 9 },
{ name: 'v2b-compound-loop',       file: 'carousel-v2b-compound-loop.html',       slides: 10 },
{ name: 'v3-identity',             file: 'carousel-v3-identity.html',             slides: 7 },
{ name: 'v3b-identity-symptoms',   file: 'carousel-v3b-identity-symptoms.html',   slides: 7 },
{ name: 'v4-matt-wagner', file: 'carousel-v4-matt-wagner.html', slides: 8 },
{ name: 'v4b-matt-wagner-circle', file: 'carousel-v4b-matt-wagner-circle.html', slides: 8 },
{ name: 'v4c-matt-wagner-circle2', file: 'carousel-v4c-matt-wagner-circle2.html', slides: 9 },
{ name: 'v5-compound-loop',        file: 'carousel-v5-compound-loop.html',        slides: 6 },
{ name: 'v6-three-exits',          file: 'carousel-v6-three-exits.html',          slides: 6 },
{ name: 'v7-encoding-equation',    file: 'carousel-v7-encoding-equation.html',    slides: 7 },
{ name: 'v8-intentions-vs-goals',  file: 'carousel-v8-intentions-vs-goals.html',  slides: 6 },
{ name: 'v8b-extrinsic-symptoms',  file: 'carousel-v8b-extrinsic-symptoms.html',  slides: 5 },
{ name: 'v9-signs-belief-running', file: 'carousel-v9-signs-belief-running.html', slides: 7 },
{ name: 'v9b-four-signals',        file: 'carousel-v9b-four-signals.html',        slides: 6 },
{ name: 'v10-foundation',          file: 'carousel-v10-foundation.html',          slides: 7 },
{ name: 'v10b-what-changes',       file: 'carousel-v10b-what-changes.html',       slides: 5 },
{ name: 'cta-variations', file: 'cta-variations.html', slides: 8 },
{ name: 'v13-compound-loop', file: 'carousel-v13-compound-loop.html', slides: 7 },
{ name: 'v14-imprinting',  file: 'carousel-v14-imprinting.html', slides: 9 },
{ name: 'v15-effort',      file: 'carousel-v15-effort.html',     slides: 9 },
{ name: 'v16-protocol',    file: 'carousel-v16-protocol.html',   slides: 9 },
  // ── ADD NEW CAROUSELS HERE ──
  // {
  //   name:   'v4-your-topic',
  //   file:   'carousel-v4-your-topic.html',
  //   slides: 10,
  // },
];

// ─── SETTINGS ────────────────────────────────────────────────────────────────
const OUTPUT_DIR   = path.resolve(__dirname, 'output');
const SLIDE_WIDTH  = 1080;
const SLIDE_HEIGHT = 1080;

// ─── RESOLVE URL ─────────────────────────────────────────────────────────────
function resolveUrl(filename) {
  if (GITHUB_PAGES_URL) {
    return `${GITHUB_PAGES_URL.replace(/\/$/, '')}/${filename}`;
  }
  return 'file://' + path.resolve(__dirname, filename);
}

// ─── SCREENSHOT ONE CAROUSEL ─────────────────────────────────────────────────
async function screenshotCarousel(browser, carousel) {
  const outDir = path.join(OUTPUT_DIR, carousel.name);
  fs.mkdirSync(outDir, { recursive: true });

  const url = resolveUrl(carousel.file);
  console.log(`\n  📂  ${carousel.name}`);
  console.log(`      ${url}`);

  const page = await browser.newPage();
  await page.setViewportSize({ width: SLIDE_WIDTH, height: SLIDE_HEIGHT });
  await page.goto(url, { waitUntil: 'networkidle' });

  // Wait for Google Fonts to fully render
  await page.waitForTimeout(1800);

  for (let i = 0; i < carousel.slides; i++) {
    const num  = String(i + 1).padStart(2, '0');
    const file = path.join(outDir, `slide-${num}.png`);

    // Switch slide using the function exposed in each HTML file
    await page.evaluate((index) => window.goToSlide(index), i);

    // Wait for the opacity transition (300ms in CSS + buffer)
    await page.waitForTimeout(420);

    await page.screenshot({
      path: file,
      type: 'png',
      clip: { x: 0, y: 0, width: SLIDE_WIDTH, height: SLIDE_HEIGHT },
    });

    console.log(`      ✓  slide-${num}.png`);
  }

  await page.close();
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
async function main() {
  // If a name is passed as an argument, only run that one
  // Usage: node screenshot.js v1-capacity
  const arg = process.argv[2];
  let queue = CAROUSELS;

  if (arg) {
    queue = CAROUSELS.filter(c => c.name === arg);
    if (queue.length === 0) {
      console.error(`\n  ✗  No carousel found with name "${arg}"`);
      console.error(`     Available names: ${CAROUSELS.map(c => c.name).join(', ')}\n`);
      process.exit(1);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Encoded — Carousel Screenshot Tool');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Mode:   ${GITHUB_PAGES_URL ? 'GitHub Pages' : 'Local files'}`);
  console.log(`  Output: ${OUTPUT_DIR}`);
  console.log(`  Queued: ${queue.length} of ${CAROUSELS.length} carousel(s)${arg ? ` (filtered: ${arg})` : ''}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();

  for (const carousel of queue) {
    try {
      await screenshotCarousel(browser, carousel);
    } catch (err) {
      console.error(`\n  ✗  Error on ${carousel.name}:`, err.message);
    }
  }

  await browser.close();

  const total = queue.reduce((sum, c) => sum + c.slides, 0);
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Done — ${total} PNGs saved to output/`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main().catch(err => {
  console.error('\nFatal error:', err);
  process.exit(1);
});
