const puppeteer = require('puppeteer-lambda');

exports.handler = async () => {
  const browser = await puppeteer.getBrowser({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto('https://randomvin.com');
  await page.waitForFunction(
    'document.querySelector("#Result").innerText.length === 17'
  );
  const vin = await page.$eval('#Result', (result) => {
    return result.querySelector('h2').textContent;
  });
  return {
    statusCode: 200,
    body: JSON.stringify(vin),
  };
};
