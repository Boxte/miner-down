// This version of chromium works wil Node 14.x on AWS Lambda
const chromium = require('chrome-aws-lambda');
require('dotenv').config();

const url = `https://hiveon.net/eth/overview?miner=${process.env.MINER_ADDRESS}`;
const activeWorkersSelector = `#next-focus-wrapper > div.Page-module-root-1YEf0 > div > div > section:nth-child(4) > div > div.Overview_widgets__yUK6Y > div:nth-child(3) > div.Overview_widgetContent__31FBw > div.Overview_activeCounter__1fj9O > span:nth-child(1)`;

exports.handler = async (event) => {
    const utcRequestTimestamp = new Date().getTime();
    const browser = await chromium.puppeteer
        .launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless
        });
    const page = await browser.newPage();

    await page.goto(url);

    const element = await page.waitForSelector(activeWorkersSelector);
    const numberOfActiveWorkers = await page.evaluate(element => element.textContent, element);

    if (browser !== null) {
        await browser.close();
    }

    const utcResponseTimestamp = new Date().getTime();
    const utcReqResDifference = utcResponseTimestamp - utcRequestTimestamp;
    let jsonData = { utcRequestTimestamp, numberOfActiveWorkers, utcResponseTimestamp, utcReqResDifference };

    return jsonData;
}