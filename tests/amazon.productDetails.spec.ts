import { test, expect } from '@playwright/test';
import { acceptCookies } from '../Components/acceptCookies';

test.describe('Product Details Verification', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the homepage and accept cookies
        await page.goto('https://www.amazon.fr/');
        await acceptCookies(page);

        // Search for a product (e.g., "logitech g pro x") and click on the first result
        await page.fill('input[name="field-keywords"]', 'logitech g pro x');
        await page.click('input#nav-search-submit-button');
        await page.waitForSelector('.s-main-slot');

        const firstItem = await page.$('.s-main-slot .s-result-item');
        if (!firstItem) {
            throw new Error('No product found');
        }

        await firstItem.click();
        await page.waitForSelector('#productTitle'); // Wait for the product page to load
    });

    test('Verify Product Title', async ({ page }) => {
        const productTitle = await page.$eval('#productTitle', el => el.textContent?.trim());
        expect(productTitle?.length).toBeGreaterThan(0);
        console.log('Product Title:', productTitle);
    });

    test('Verify Product Price', async ({ page }) => {
        const productPriceElement = await page.$('.a-price-whole');
        if (productPriceElement) {
            const priceText = await productPriceElement.textContent();
            console.log('Product Price:', priceText);
            expect(priceText?.length).toBeGreaterThan(0);
        } else {
            console.log('Price not available for this product.');
        }
    });

    test('Verify Product Review Count', async ({ page }) => {
        const reviewCountElement = await page.$('#acrCustomerReviewText');
        if (reviewCountElement) {
            const reviewCountText = await reviewCountElement.textContent();
            const reviewCount = parseInt(reviewCountText?.replace(/\D/g, '') || '0', 10);
            console.log('Review Count:', reviewCount);
            expect(reviewCount).toBeGreaterThanOrEqual(0);
        } else {
            console.log('No reviews for this product.');
        }
    });
});