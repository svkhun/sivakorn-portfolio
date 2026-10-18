const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

async function main() {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {})
  });
  try {
    for (const kind of ['cv', 'resume']) {
      const page = await browser.newPage();
      const html = path.join(__dirname, `${kind}.html`);
      const pdf = path.join(__dirname, `Sivakorn_Khundilokrattaya_${kind === 'cv' ? 'CV' : 'Resume'}.pdf`);
      await page.goto(pathToFileURL(html).href, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.pdf({ path: pdf, format: 'A4', printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false });
      await page.close();
      process.stdout.write(`Printed ${pdf}\n`);
    }
  } finally {
    await browser.close();
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
