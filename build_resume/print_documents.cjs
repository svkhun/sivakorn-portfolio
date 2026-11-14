const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

async function main() {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {})
  });
  try {
    const docs = [
      { html: 'cv.html', pdf: 'Sivakorn_Khundilokrattaya_CV.pdf' },
      { html: 'resume.html', pdf: 'Sivakorn_Khundilokrattaya_Resume.pdf' },
      { html: 'cover_letter.html', pdf: 'Sivakorn_Khundilokrattaya_Cover_Letter.pdf' }
    ];
    for (const doc of docs) {
      const page = await browser.newPage();
      const htmlPath = path.join(__dirname, doc.html);
      const pdfPath = path.join(__dirname, doc.pdf);
      await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false });
      await page.close();
      process.stdout.write(`Printed ${pdfPath}\n`);
    }
  } finally {
    await browser.close();
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
