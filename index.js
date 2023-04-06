const puppeteer = require("puppeteer");
const input = require("input");
const proxyList = [
  "89.179.244.233:20000",
  "185.143.42.54:8080",
  "5.78.82.94:8080",
  "114.231.46.188:8089",
];

function bot({ pr }) {
  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        `--proxy-server=http://${pr}`,
        "--no-sandbox",
        "--ignore-certificate-errors",
        "--ignore-certificate-errors-spki-list",
      ],
    }); // launch the browse
    const page = await browser.newPage(); // create a new page
    await page.setDefaultNavigationTimeout(0); // r
    page.waitForNavigation({ waitUntil: "networkidle0" }).then();
    await page.goto(
      "https://www.pinksale.finance/launchpad/0xD9f3C050465f118E0BE854697008D71a412b3e1d?chain=BSC",
      { timeout: 260000 }
    ); // navigate to the website
    // await page.goto("https://rivopelu.my.id/", { timeout: 0 }); // navigate to the website

    await page.evaluate((e) => {
      alert("RUNNING");
      setTimeout(() => {
        document
          .querySelectorAll(".ant-typography.has-text-primary")[0]
          .click();
        document
          .querySelectorAll(".ant-typography.has-text-primary")[1]
          .click();
        for (let i = 0; i < 10; i++) {
          document.querySelectorAll(".media-content a")[i].click();
        }
      }, 1000);
    });

    // setInterval(async () => {
    //   const pages = await browser.pages();
    //   for (let i = 1; i < pages.length; i++) {
    //     if (i >= 2) {
    //       await pages[i].close();
    //     }
    //   }
    // }, 30000);
    // await page.waitForNavigation();
    // const newPage = await browser.newPage();
    // await newPage.goto(await newPage.evaluate(() => document.querySelector('a').href));
  })();
}

let i = 0;

function myLoop(linkAmount) {
  setTimeout(function () {
    const ip = proxyList[i];
    bot({
      pr: ip,
    });
    console.log(`STARTING WITH  NETWORK -- [${i}] ::::`, ip);
    if (i < proxyList.length) {
      i++;
      myLoop();
    } else {
      i = 0;
    }
  }, 20000);
}

function main() {
  myLoop();
}

main();
