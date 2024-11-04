import { test, expect, Page } from '@playwright/test';
import {acceptCookies} from '../Components/acceptCookies'

test.describe('Feature: Buy items (except checkout)', () => {
    test('Buy without checkout', async ({ page }) => {
        await page.goto('https://www.amazon.fr/');
        acceptCookies(page); //function used many times
        await page.fill('#twotabsearchtextbox', 'pc portable hp');
        await page.click('input#nav-search-submit-button');
        await page.waitForSelector('.s-main-slot');
        const firstItem = await page.$('.s-main-slot .s-result-item');
        if (firstItem) {
            await firstItem.click();
            await page.waitForSelector('#add-to-cart-button');
            await page.click('#add-to-cart-button');
        }  
      // Handle any pop-up (e.g., Amazon offers for additional products)
      await page.waitForTimeout(2000); // Adjust as needed for page load timing
      await page.goto('https://www.amazon.fr/cart'); // Go to Cart page directly
  
      // Ensure the user is not logged in
      // Since Amazon will prompt login during checkout if not logged in, no additional check here
      
      // Click on "Proceed to checkout"
      await page.waitForSelector('[name="proceedToRetailCheckout"]');
      await page.click('[name="proceedToRetailCheckout"]'); // Proceed to checkout button
  
      // Verify redirection to the login page
      await expect(page).toHaveURL(/.*signin/); // Amazon's login page URL pattern
    });
  });