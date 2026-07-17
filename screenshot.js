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
{ name: 'v11-response-sequence', file: 'carousel-v11-response-sequence.html', slides: 7 },
{ name: 'v12-imprinting',        file: 'carousel-v12-imprinting.html',        slides: 8 },
{ name: 'v13-compound-loop', file: 'carousel-v13-compound-loop.html', slides: 7 },
{ name: 'v14-imprinting',  file: 'carousel-v14-imprinting.html', slides: 9 },
{ name: 'v15-effort',      file: 'carousel-v15-effort.html',     slides: 9 },
{ name: 'v16-protocol',    file: 'carousel-v16-protocol.html',   slides: 9 },
{ name: 'v17-stack',             file: 'carousel-v17-stack.html',             slides: 9 },
{ name: 'v18-therapy',           file: 'carousel-v18-therapy.html',           slides: 9 },
{ name: 'v19-frequency',         file: 'carousel-v19-frequency.html',         slides: 9 },
{ name: 'v20-hardware',          file: 'carousel-v20-hardware.html',          slides: 9 },
{ name: 'v21-identity-ceiling',  file: 'carousel-v21-identity-ceiling.html',  slides: 9 },
{ name: 'v22-frequency-era',       file: 'carousel-v22-frequency-era.html',       slides: 10 },
{ name: 'v23-frequency-era-white', file: 'carousel-v23-frequency-era-white.html', slides: 10 },
{ name: 'master-template',          file: 'carousel-master-template.html',          slides: 24 },
{ name: 'master-template-portrait',  file: 'carousel-master-template-portrait.html',  slides: 24, portrait: true },
{ name: 'product-templates', file: 'carousel-product-templates.html', slides: 3 },
{ name: 'product-templates', file: 'carousel-product-templates.html', slides: 3, portrait: true },
{ name: 'tweet-dark',  file: 'tweet-dark.html',  slides: 1, portrait: true },
{ name: 'tweet-light', file: 'tweet-light.html',  slides: 1, portrait: true },
{ name: 'tweet-courtney-dark',  file: 'tweet-courtney-dark.html',  slides: 1, portrait: true },
{ name: 'tweet-courtney-light', file: 'tweet-courtney-light.html', slides: 1, portrait: true },
{ name: 'tweet-chris-v1-dark',  file: 'tweet-chris-v1-dark.html',  slides: 1, portrait: true },
{ name: 'tweet-chris-v1-light', file: 'tweet-chris-v1-light.html', slides: 1, portrait: true },
{ name: 'tweet-chris-v2-dark',  file: 'tweet-chris-v2-dark.html',  slides: 1, portrait: true },
{ name: 'tweet-chris-v2-light', file: 'tweet-chris-v2-light.html', slides: 1, portrait: true },
{ name: 'tweet-chris-v3-dark',  file: 'tweet-chris-v3-dark.html',  slides: 1, portrait: true },
{ name: 'tweet-chris-v3-light', file: 'tweet-chris-v3-light.html', slides: 1, portrait: true },
{ name: 'product-templates', file: 'carousel-product-templates.html', slides: 4, portrait: true },
{ name: 'single-post-circles', file: 'single-post-circles.html', slides: 4, portrait: true },
{ name: 'single-post-new-designs', file: 'single-post-new-designs.html', slides: 5, portrait: true },
{ name: 'asset-slides', file: 'asset-slides.html', slides: 3, portrait: true },
{ name: 'sp-d1-hook-bold',         file: 'sp-d1-hook-bold.html',         slides: 1, portrait: true },
{ name: 'sp-d2-aphorism-minimal',  file: 'sp-d2-aphorism-minimal.html',  slides: 1, portrait: true },
{ name: 'sp-d3-mechanism-minimal', file: 'sp-d3-mechanism-minimal.html', slides: 1, portrait: true },
{ name: 'sp-d4-proof-tweet',       file: 'sp-d4-proof-tweet.html',       slides: 1, portrait: true },
{ name: 'sp-d5-hook-tweet',        file: 'sp-d5-hook-tweet.html',        slides: 1, portrait: true },
{ name: 'sp-d6-aphorism-bold',     file: 'sp-d6-aphorism-bold.html',     slides: 1, portrait: true },
{ name: 'sp-d7-aphorism-minimal',  file: 'sp-d7-aphorism-minimal.html',  slides: 1, portrait: true },
{ name: 'sp-b2-01-anxiety-tweet',    file: 'sp-b2-01-anxiety-tweet.html',    slides: 1, portrait: true },
{ name: 'sp-b2-02-selftrust-tweet',  file: 'sp-b2-02-selftrust-tweet.html',  slides: 1, portrait: true },
{ name: 'sp-b2-03-identity-bold',    file: 'sp-b2-03-identity-bold.html',    slides: 1, portrait: true },
{ name: 'sp-b2-04-philosophy-bold',  file: 'sp-b2-04-philosophy-bold.html',  slides: 1, portrait: true },
{ name: 'sp-b2-05-addiction-photo',  file: 'sp-b2-05-addiction-photo.html',  slides: 1, portrait: true },
{ name: 'sp-b2-06-fear-photo',       file: 'sp-b2-06-fear-photo.html',       slides: 1, portrait: true },
{ name: 'sp-b2-07-anxiety-split',    file: 'sp-b2-07-anxiety-split.html',    slides: 1, portrait: true },
{ name: 'sp-b2-08-fear-split',       file: 'sp-b2-08-fear-split.html',       slides: 1, portrait: true },
{ name: 'sp-b2-09-selftrust-minimal',file: 'sp-b2-09-selftrust-minimal.html',slides: 1, portrait: true },
{ name: 'sp-b2-10-alive-minimal',    file: 'sp-b2-10-alive-minimal.html',    slides: 1, portrait: true },
{ name: 'carousel-sc01-identity', file: 'carousel-sc01-identity.html', slides: 5, portrait: true },
{ name: 'carousel-sc01-identity-v1', file: 'carousel-sc01-identity-v1.html', slides: 5, portrait: true },
{ name: 'carousel-sc01-identity-v2', file: 'carousel-sc01-identity-v2.html', slides: 5, portrait: true },
{ name: 'carousel-sc02-anxiety-v1', file: 'carousel-sc02-anxiety-v1.html', slides: 5, portrait: true },
{ name: 'carousel-sc02-anxiety-v2', file: 'carousel-sc02-anxiety-v2.html', slides: 5, portrait: true },
{ name: 'sp-r01-anxiety-tweet',     file: 'sp-r01-anxiety-tweet.html',     slides: 1, portrait: true },
{ name: 'sp-r02-selftrust-tweet',   file: 'sp-r02-selftrust-tweet.html',   slides: 1, portrait: true },
{ name: 'sp-r03-identity-bold',     file: 'sp-r03-identity-bold.html',     slides: 1, portrait: true },
{ name: 'sp-r04-sleep-bold',        file: 'sp-r04-sleep-bold.html',        slides: 1, portrait: true },
{ name: 'sp-r05-addiction-photo',   file: 'sp-r05-addiction-photo.html',   slides: 1, portrait: true },
{ name: 'sp-r06-fear-photo',        file: 'sp-r06-fear-photo.html',        slides: 1, portrait: true },
{ name: 'sp-r07-anxiety-split',     file: 'sp-r07-anxiety-split.html',     slides: 1, portrait: true },
{ name: 'sp-r08-fear-split',        file: 'sp-r08-fear-split.html',        slides: 1, portrait: true },
{ name: 'sp-r09-selftrust-minimal', file: 'sp-r09-selftrust-minimal.html', slides: 1, portrait: true },
{ name: 'sp-r10-clarity-minimal',   file: 'sp-r10-clarity-minimal.html',   slides: 1, portrait: true },
{ name: 'sp-f01-anxiety-tweet',     file: 'sp-f01-anxiety-tweet.html',     slides: 1, portrait: true },
{ name: 'sp-f02-selftrust-tweet',   file: 'sp-f02-selftrust-tweet.html',   slides: 1, portrait: true },
{ name: 'sp-f03-identity-bold',     file: 'sp-f03-identity-bold.html',     slides: 1, portrait: true },
{ name: 'sp-f04-sleep-bold',        file: 'sp-f04-sleep-bold.html',        slides: 1, portrait: true },
{ name: 'sp-f05-addiction-photo',   file: 'sp-f05-addiction-photo.html',   slides: 1, portrait: true },
{ name: 'sp-f06-fear-photo',        file: 'sp-f06-fear-photo.html',        slides: 1, portrait: true },
{ name: 'sp-f07-anxiety-split',     file: 'sp-f07-anxiety-split.html',     slides: 1, portrait: true },
{ name: 'sp-f08-fear-split',        file: 'sp-f08-fear-split.html',        slides: 1, portrait: true },
{ name: 'sp-f09-selftrust-minimal', file: 'sp-f09-selftrust-minimal.html', slides: 1, portrait: true },
{ name: 'sp-f10-clarity-minimal',   file: 'sp-f10-clarity-minimal.html',   slides: 1, portrait: true },
{ name: 'sp-n01-drew-tweet',   file: 'sp-n01-drew-tweet.html',   slides: 1, portrait: true },
{ name: 'sp-n02-blake-bold',   file: 'sp-n02-blake-bold.html',   slides: 1, portrait: true },
{ name: 'sp-n03-jake-photo',   file: 'sp-n03-jake-photo.html',   slides: 1, portrait: true },
{ name: 'sp-n04-tj-split',     file: 'sp-n04-tj-split.html',     slides: 1, portrait: true },
{ name: 'sp-n05-omar-minimal', file: 'sp-n05-omar-minimal.html', slides: 1, portrait: true },
{ name: 'carousel-sc03-willpower-v1', file: 'carousel-sc03-willpower-v1.html', slides: 5, portrait: true },
{ name: 'carousel-sc03-willpower-v2', file: 'carousel-sc03-willpower-v2.html', slides: 5, portrait: true },
{ name: 'carousel-sc04-stress-v1', file: 'carousel-sc04-stress-v1.html', slides: 5, portrait: true },
{ name: 'carousel-sc05-rewire-v1', file: 'carousel-sc05-rewire-v1.html', slides: 5, portrait: true },
  // ── ADD NEW CAROUSELS HERE ──
  // {
  //   name:   'v4-your-topic',
  //   file:   'carousel-v4-your-topic.html',
  //   slides: 10,
  // },
];

// ─── SETTINGS ────────────────────────────────────────────────────────────────
const OUTPUT_DIR    = path.resolve(__dirname, 'output');
const SLIDE_WIDTH   = 1080;
const SLIDE_HEIGHT  = 1080;   // square
const PORTRAIT_HEIGHT = 1350; // portrait (1080×1350)

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

  const slideHeight = carousel.portrait ? PORTRAIT_HEIGHT : SLIDE_HEIGHT;
  const page = await browser.newPage();
  await page.setViewportSize({ width: SLIDE_WIDTH, height: slideHeight });
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
      clip: { x: 0, y: 0, width: SLIDE_WIDTH, height: slideHeight },
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
