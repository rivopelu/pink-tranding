const puppeteer = require('puppeteer');
let count = 1;

const proxyList = [
    "5.78.70.253:8080",
    "66.94.108.138:3128",
    undefined,
    undefined,
];

let num = 0

async function bot(prx) {
    const pr = prx
    console.log(`${num}. RUNNING ON  ::: [ ${pr ?? "LOCAL"} ]`)
    const proxyServer = `http://${pr}`;
    if (pr) {
        await puppeteer.launch({
            args: [
                `--proxy-server=${proxyServer}`,
                "--no-sandbox",
                "--ignore-certificate-errors",
                "--ignore-certificate-errors-spki-list",
            ],
            headless: false,
            ignoreHTTPSErrors: true,
            defaultViewport: null,
            slowMo: 0,
            ignoreDefaultArgs: ['--enable-automation'],
            timeout: 0
        }).then((r) => {
            run(r).then()
        });


    } else {
        await puppeteer.launch({headless: false}).then((r) => {
            run(r).then()
        });


    }


    async function run(bw) {
        const page = await bw.newPage(); // create a new page
        await page.setDefaultNavigationTimeout(0);// r
        page.waitForNavigation({waitUntil: 'networkidle2', timeout: 0}).then()
        await page.goto('https://www.pinksale.finance/launchpad/0x22F69A8960b823147bCD055E2E2598Aa0BC82F1C?chain=BSC', {timeout: 0}); // navigate to the website
        if (bw && page) {
            setInterval(async () => {

                const pgs = await bw.pages();
                for (let i = 1; i < pgs.length; i++) {
                    if (i >= 2) {
                        await pgs[i].close().then(() => {
                            console.log("CLOSED TAB")
                        });
                    }
                }
            }, 20000);
            await page.evaluate(() => {
                let num = 1;
                setTimeout(() => {
                    running()

                    function running() {
                        console.log("------------------ RUNNING ----------------")

                        for (let i = 0; i < 10; i++) {
                            document.querySelectorAll(".media-content a")[i].dispatchEvent(new MouseEvent('click', {ctrlKey: true}))

                        }
                        document.querySelectorAll(".ant-typography.has-text-primary")[0].click()
                        document.querySelectorAll(".ant-typography.has-text-primary")[1].click()
                        document.querySelectorAll(".ant-typography.has-text-primary")[2].click()
                    }

                    setInterval(() => {
                        running()
                    }, 70000)
                }, 500)


            });
        } else {
            console.log("CLOSED")
        }
    }
}

function main() {
    proxyList.map((r) => {
        bot(r).then()
    })
}

main()