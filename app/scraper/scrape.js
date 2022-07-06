const puppeteer = require('puppeteer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const url = `https://hiveon.net/eth/overview?miner=${process.env.MINER_ADDRESS}`;
const activeWorkersSelector = `#next-focus-wrapper > div.Page-module-root-1YEf0 > div > div > section:nth-child(4) > div > div.Overview_widgets__yUK6Y > div:nth-child(3) > div.Overview_widgetContent__31FBw > div.Overview_activeCounter__1fj9O > span:nth-child(1)`;

async function scrape() {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();

    await page.goto(url);

    var element = await page.waitForSelector(activeWorkersSelector);
    var text = await page.evaluate(element => element.textContent, element);
    console.log(text);
    browser.close();
}

scrape();