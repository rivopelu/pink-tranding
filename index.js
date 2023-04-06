const puppeteer = require("puppeteer");
const input = require("input");
const proxyList = [
  undefined,
  "5.78.70.253:8080",
  "66.94.108.138:3128",
  undefined,
];

function bot({ pr }) {
  (async () => {
    const dataPr = {
      args: [
        `--proxy-server=http://${pr}`,
        "--no-sandbox",
        "--ignore-certificate-errors",
        "--ignore-certificate-errors-spki-list",
      ],
    };
    const dataSetting = pr
      ? {
          headless: false,
          ...dataPr,
        }
      : {
          headless: false,
        };
    const browser = await puppeteer.launch(dataSetting); // launch the browse
    const page = await browser.newPage(); // create a new page
    await page.setDefaultNavigationTimeout(0); // r
    page.waitForNavigation({ waitUntil: "networkidle0" }).then();
    await page.goto(
      "https://www.pinksale.finance/launchpad/0x22F69A8960b823147bCD055E2E2598Aa0BC82F1C?chain=BSC",
      { timeout: 260000 }
    ); // navigate to the website
    // await page.goto("https://rivopelu.my.id/", { timeout: 0 }); // navigate to the website
    setInterval(() => {
      browser.close();
    }, 60000);
    await page.evaluate(() => {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          document.querySelectorAll(".media-content a")[i].click();
        }
        document
          .querySelectorAll(".ant-typography.has-text-primary")[0]
          .click();
        document
          .querySelectorAll(".ant-typography.has-text-primary")[1]
          .click();
        document
          .querySelectorAll(".ant-typography.has-text-primary")[2]
          .click();
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
  }, 30000);
}

function main() {
  myLoop();
}

main();
