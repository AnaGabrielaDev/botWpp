import { join, dirname} from 'path';
import { readFileSync } from 'fs';
import puppeteer from 'puppeteer';

async function main(name: string) {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disabled-setupid-sandbox"],
        headless: false,
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    await page.goto('https://web.whatsapp.com', {
        waitUntil: 'load',
    });

    const path = join(__dirname, "qr.png");
    const qr = await page.waitForSelector("canvas");
    await qr?.screenshot({path});
    console.log(
        `Scan Qr Code to login on WhatsApp and Continue.
        access: file://${path}
    `);

    await page.waitForNavigation({
        timeout: 500000 //5 seconds
    });

    await page.waitForTimeout(2000); //2 seconds

    const contact = await page.waitForSelector(`span[title="${name}"]`);
    contact?.click();

    const chat = await page.waitForSelector("div[class='fd365im1 to2l77zo bbv8nyr4 mwp4sxku gfz4du6o ag5g9lrv']");
    await chat?.click();

    const script = readFileSync(join(__dirname, 'talks', 'hulkvsthor.txt'), 'utf8')
    const talks = script.split('\n')

    const total = talks.length;

    for (const [index, talk] of talks.entries()) {
        await chat!.type(talk);
        await page.waitForTimeout(1000);
        await chat!.press('Enter');
    
        console.log(`${index} / ${total} messages sent`);
    }

    for (const [index, talk] of talks.entries()) {
        await chat!.type(talk);
        await page.waitForTimeout(100);
        await chat!.press('Enter');
    
        console.log(`${index} / ${total} messages sent`);
    }

    console.log("finish");
    await browser.close();
}

export { main };