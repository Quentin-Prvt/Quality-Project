import {Page} from "@playwright/test";

export async function acceptCookies(page:Page) {
    try {
        await page.click('#sp-cc-accept'); //this accepts cookies
    } catch (error) {
        console.log('Cookie acceptance button not found or already accepted.');
    }
}