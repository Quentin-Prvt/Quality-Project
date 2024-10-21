import { test, expect, Page } from '@playwright/test';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
// Add the plugin to playwright (any number of plugins can be added)
chromium.use(stealth())

async function acceptCookies(page:Page) {
    try {
        await page.click('#sp-cc-accept'); //this accepts cookies
    } catch (error) {
        console.log('Cookie acceptance button not found or already accepted.');
    }
}

test('addItemToCart', async ({ page }) => {

    await page.goto('https://www.amazon.fr/');
    acceptCookies(page); //function used many times
    await page.fill('input[name="field-keywords"]', 'laptop');
    await page.click('input#nav-search-submit-button');
    await page.waitForSelector('.s-main-slot');
    const firstItem = await page.$('.s-main-slot .s-result-item');
    if (firstItem) {
        await firstItem.click();
        await page.waitForSelector('#add-to-cart-button');
        await page.click('#add-to-cart-button');
    }

    acceptCookies(page); //function used many times
    // Check if the item is in the cart //nav-cart-count
    await page.evaluate(() => window.scrollTo(0, 0)); // Scrolls to the top of the page (just in case)
    await page.waitForSelector('#nav-cart-count');
    const cartCount = await page.$eval('#nav-cart-count', el => el.textContent);
    const parsedCartCount = parseInt(cartCount || '0'); //cartCount if exist, else 0
    expect(parsedCartCount).toBeGreaterThan(0);
});
  
test('removeItemFromCart', async ({ page }) => {
    //FIRST STEP : ADD SOMETHING TO THE CART (what we do in addItemToCart)
    await page.goto('https://www.amazon.fr/');
    acceptCookies(page); //synthetic function used many times
    await page.fill('input[name="field-keywords"]', 'laptop');
    await page.click('input#nav-search-submit-button');
    await page.waitForSelector('.s-main-slot');
    const firstItem = await page.$('.s-main-slot .s-result-item');
    if (firstItem) {
        await firstItem.click();
        await page.waitForSelector('#add-to-cart-button');
        await page.click('#add-to-cart-button');
    }

    //SECOND STEP : REMOVE THE ITEM FROM THE CART
    await page.goto('https://www.amazon.fr/gp/cart/view.html');
    acceptCookies(page); //synthetic function used many times
    const cartCount = await page.$eval('#nav-cart-count', el => el.textContent || '0');
    if (parseInt(cartCount) > 0) {
        await page.click('.sc-action-delete input');
    
        const confirmationMessage = await page.locator('body').textContent(); // Check the entire page's content
        expect(confirmationMessage).toContain('a été supprimé de Votre panier.');
    }
});
  
test('searchForItem', async ({ page }) => {
    await page.goto('https://www.amazon.fr/');
    acceptCookies(page); // Use the acceptCookies function
    await page.fill('input[name="field-keywords"]', 'smartphone');
    await page.click('input#nav-search-submit-button');
    await page.waitForSelector('.s-main-slot');
    const searchResults = await page.$$('.s-main-slot .s-result-item');
    expect(searchResults.length).toBeGreaterThan(0);
});