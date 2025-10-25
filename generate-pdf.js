const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Load the HTML file
  const htmlPath = path.join(__dirname, 'index.html');
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0'
  });

  // Wait for Tailwind CSS to fully load and apply
  await page.waitForTimeout(1000);

  // Emulate print media to hide no-print elements
  await page.emulateMediaType('print');

  // Wait a bit more to ensure print styles are applied
  await page.waitForTimeout(500);

  // Generate PDF with proper settings
  await page.pdf({
    path: 'CV_Franck_Ratier_2025.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '8mm',
      right: '8mm',
      bottom: '8mm',
      left: '8mm'
    }
  });

  await browser.close();
  console.log('PDF generated successfully!');
})();
