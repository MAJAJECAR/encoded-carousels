// screenshot.js
// Run with: node screenshot.js
// Requires: npm install playwright && npx playwright install chromium
//
// HOW IT WORKS:
//   Opens each carousel HTML file in a headless browser
//   Switches through every slide and captures a 1080x1080 PNG
//   Saves them into an "output" folder, organised by carousel
//
// TO USE WITH GITHUB PAGES:
//   Replace the file:// paths below with your GitHub Pages URLs
//   e.g. 'https://yourusername.github.io/encoded-carousels/carousel-v1-capacity.html'

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// ─── CONFIG ────────────────────────────────────────────────────────────────
// Edit these paths to point to your HTML files.
// Use absolute paths for local files, or full URLs for hosted files.

const CAROUSELS = [
  {
    name: 'v1-capacity',
    // Local file path (update this to match where you saved the files):
    src: 'file://' + path.resolve(__dirname, 'carousel-v1-capacity.html'),
    // Or use GitHub Pages URL instead:
    // src: 'https://yourusername.github.io/encoded-carousels/carousel-v1-capacity.html',
    slides: 10,
  },
  {
    name: 'v2-prediction',
    src: 'file://' + path.resolve(__dirname, 'carousel-v2-prediction.html'),
    // src: 'https://yourusername.github.io/encoded-carousels/carousel-v2-prediction.html',
    slides: 10,
  },
  {
    name: 'v3-identity',
    src: 'file://' + path.resolve(__dirname, 'carousel-v3-identity.html'),
    // src: 'https://yourusername.github.io/encoded-carousels/carousel-v3-identity.html',
    slides: 10,
  },
];

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const SLIDE_WIDTH  = 1080;
const SLIDE_HEIGHT = 1080;
// ───────────────────────────────────────────────────────────────────────────


async function screenshotCarousel(browser, carousel) {
  const carouselDir = path.join(OUTPUT_DIR, carousel.name);
  fs.mkdirSync(carouselDir, { recursive: true });

  console.log(`\n📂  ${carousel.name}`);
  console.log(`    Source: ${carousel.src}`);

  const page = await browser.newPage();

  // Set viewport to exact slide size
  await page.setViewportSize({ width: SLIDE_WIDTH, height: SLIDE_HEIGHT });

  // Load the page and wait for fonts
  await page.goto(carousel.src, { waitUntil: 'networkidle' });

  // Extra wait to ensure Google Fonts have rendered
  await page.waitForTimeout(1500);

  for (let i = 0; i < carousel.slides; i++) {
    const slideNum = String(i + 1).padStart(2, '0');
    const filename = `slide-${slideNum}.png`;
    const filepath = path.join(carouselDir, filename);

    // Switch to this slide using the exposed function in each HTML file
    await page.evaluate((index) => {
      window.goToSlide(index);
    }, i);

    // Small pause for the opacity transition to complete (300ms in CSS)
    await page.waitForTimeout(400);

    // Take the screenshot
    await page.screenshot({
      path: filepath,
      type: 'png',
      clip: { x: 0, y: 0, width: SLIDE_WIDTH, height: SLIDE_HEIGHT },
    });

    console.log(`    ✓  slide ${slideNum} → ${filename}`);
  }

  await page.close();
  console.log(`    Done. ${carousel.slides} PNGs saved to output/${carousel.name}/`);
}


async function main() {
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Encoded Carousel Screenshot Tool');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Output directory: ${OUTPUT_DIR}`);
  console.log(`  Carousels to process: ${CAROUSELS.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    // If fonts look wrong, try adding: args: ['--font-render-hinting=none']
  });

  for (const carousel of CAROUSELS) {
    try {
      await screenshotCarousel(browser, carousel);
    } catch (err) {
      console.error(`\n  ✗  Error on ${carousel.name}:`, err.message);
    }
  }

  await browser.close();

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  All done.');
  console.log(`  Open the "output" folder to find your PNGs.`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
