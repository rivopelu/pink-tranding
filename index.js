const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false}); // launch the browse
  const page = await browser.newPage(); // create a new page
  await page.setDefaultNavigationTimeout(0);// r
  page.waitForNavigation({waitUntil: 'networkidle0'}).then()
  await page.goto('https://www.pinksale.finance/launchpad/0xc2C3d11Eb759d2C0d16E77C275503dF5C49Eb2BF?chain=BSC', {timeout: 0}); // navigate to the website


  await page.evaluate(() => {
    let num = 1;
    setTimeout(() => {

        document.querySelectorAll(".ant-typography.has-text-primary")[0].click()
        document.querySelectorAll(".ant-typography.has-text-primary")[1].click()
        document.querySelectorAll(".ant-typography.has-text-primary")[1].click()
        document.querySelectorAll(".media-content a")[num - 1].dispatchEvent(new MouseEvent('click', {ctrlKey: true}))
        num = (num % 3) + 1;
    }, 500)
  });

  setInterval(async () => {
    const pages = await browser.pages();
    for (let i = 1; i < pages.length; i++) {
      if (i >=2) {
        await pages[i].close();
      }
    }
  }, 4000);
  await page.waitForNavigation();
  const newPage = await browser.newPage();
  await newPage.goto(await newPage.evaluate(() => document.querySelector('a').href));
  await browser.close();
})();