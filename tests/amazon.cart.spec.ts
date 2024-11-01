import { test, expect, Page } from '@playwright/test';
import {acceptCookies} from '../Components/acceptCookies'

test.describe('Cart Manipulations', () => {

    test('Add Item to Cart', async ({ page }) => {
        await page.goto('https://www.amazon.fr/');
        acceptCookies(page); //function used many times
        await page.fill('#twotabsearchtextbox', 'logitech g pro x');
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
    
    test('Remove Item from Cart', async ({ page }) => {
        //FIRST STEP : ADD SOMETHING TO THE CART (what we do in addItemToCart)
        await page.goto('https://www.amazon.fr/');
        acceptCookies(page); //synthetic function used many times
        await page.fill('input[name="field-keywords"]', 'logitech g pro x');
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
        acceptCookies(page); //synthetic function used many times //might be useful on load of a page
        const cartCount = await page.$eval('#nav-cart-count', el => el.textContent || '0');
        if (parseInt(cartCount) > 0) {
            await page.click('.sc-action-delete input');
        
            const confirmationMessage = await page.locator('body').textContent(); // Check the entire page's content
            expect(confirmationMessage).toContain('a été supprimé de Votre panier.');
        }
    });

    test('Modify Item Quantity', async ({ page }) => {
        await page.goto('https://www.amazon.fr/');
        acceptCookies(page); //function used many times
        await page.fill('#twotabsearchtextbox', 'logitech g pro x');
        await page.click('input#nav-search-submit-button');
        await page.waitForSelector('.s-main-slot');
        const firstItem = await page.$('.s-main-slot .s-result-item');
        if (firstItem) {
            await firstItem.click();
            await page.waitForSelector('#add-to-cart-button');
            await page.click('#add-to-cart-button');
        }

        await page.goto('https://www.amazon.fr/gp/cart/view.html');
        acceptCookies(page); //synthetic function used many times //might be useful on load of a page

        // Wait for the quantity dropdown button to be visible
        await page.waitForSelector('.a-button.a-button-dropdown.quantity');

        // Change the quantity of the first item in the cart
        await page.selectOption('.sc-action-quantity select', '2'); // Change to 2 items

        // Verify the quantity has been updated
        const updatedQuantity = await page.$eval('.sc-action-quantity select', el => (el as HTMLSelectElement).value);
        expect(updatedQuantity).toBe('2');
    });
});