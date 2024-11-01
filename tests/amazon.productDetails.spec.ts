import { test, expect } from '@playwright/test';
import { acceptCookies } from '../Components/acceptCookies';
import { ProductPage } from '../Components/ProductPage';

test.describe('Product Details Verification', () => {
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        // Go to the Amazon homepage and accept cookies
        await page.goto('https://www.amazon.fr/');
        await acceptCookies(page);

        // Initialize the ProductPage POM
        productPage = new ProductPage(page);

        // Navigate to the specific product
        await productPage.navigateToProduct('pc portable hp');
    });

    test('Verify Product Title', async () => {
        // Retrieve the product title and check if it is not empty
        const productTitle = await productPage.getProductTitle();
        expect(productTitle?.length).toBeGreaterThan(0);
        console.log('Product Title:', productTitle);
    });

    test('Verify Product Price', async () => {
        // Retrieve the product price and check if it is not empty
        const productPrice = await productPage.getProductPrice();
        if (productPrice) {
            console.log('Product Price:', productPrice);
            expect(productPrice.length).toBeGreaterThan(0);
        } else {
            console.log('Price not available for this product.');
        }
    });

    test('Verify Product Review Count', async () => {
        // Retrieve the review count and check if it is zero or more
        const reviewCount = await productPage.getReviewCount();
        console.log('Review Count:', reviewCount);
        expect(reviewCount).toBeGreaterThanOrEqual(0);
    });

    test('Verify Product Description', async () => {
        // Retrieve the product description and check if it is not empty
        const productDescription = await productPage.getProductDescription();
        if (productDescription) {
            console.log('Product Description:', productDescription);
            expect(productDescription.length).toBeGreaterThan(0); // Check if description is not empty
        } else {
            console.log('Description not available for this product.');
        }
    });
});