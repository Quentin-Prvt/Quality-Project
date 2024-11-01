import { Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;

    constructor(page: Page) {
        // Initialize the page object
        this.page = page;
    }

    async navigateToProduct(productName: string) {
        // Search for a product by name and click the first result
        await this.page.fill('input[name="field-keywords"]', productName);
        await this.page.click('input#nav-search-submit-button');
        await this.page.waitForSelector('.s-main-slot');

        // Select the first item in the search results
        const firstItem = await this.page.$('.s-main-slot .s-result-item');
        if (!firstItem) {
            throw new Error('No product found');
        }

        // Click on the first item and wait for the product page to load
        await firstItem.click();
        await this.page.waitForSelector('#productTitle');
    }

    async getProductTitle(): Promise<string | null> {
        // Retrieve the product title text
        // @ts-ignore
        return this.page.$eval('#productTitle', el => el.textContent?.trim());
    }

    async getProductPrice(): Promise<string | null> {
        // Retrieve the product price text (if available)
        const priceElement = await this.page.$('.a-price-whole');
        return priceElement ? priceElement.textContent() : null;
    }

    async getReviewCount(): Promise<number> {
        // Retrieve the review count text, remove non-numeric characters, and convert to a number
        const reviewCountText = await this.page.$eval('#acrCustomerReviewText', el => el.textContent || '0');
        return parseInt(reviewCountText.replace(/\D/g, '') || '0', 10);
    }

    async getProductDescription(): Promise<string | null> {
        // Retrieve the product description text from the element with ID `feature-bullets`
        const descriptionElement = await this.page.$('#feature-bullets');
        return descriptionElement ? descriptionElement.textContent() : null;
    }
}