import { Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToProduct(productName: string) {
        // Search for a product by name and click the first result
        await this.page.fill('input[name="field-keywords"]', productName);
        await this.page.click('input#nav-search-submit-button');
        await this.page.waitForSelector('.s-main-slot');

        const firstItem = await this.page.$('.s-main-slot .s-result-item');
        if (!firstItem) {
            throw new Error('No product found');
        }

        await firstItem.click();
        await this.page.waitForSelector('#productTitle'); // Wait for the product page to load
    }

    async getProductTitle(): Promise<string | null> {
        return this.page.$eval('#productTitle', el => el.textContent?.trim());
    }

    async getProductPrice(): Promise<string | null> {
        const priceElement = await this.page.$('.a-price-whole');
        return priceElement ? priceElement.textContent() : null;
    }

    async getReviewCount(): Promise<number> {
        const reviewCountText = await this.page.$eval('#acrCustomerReviewText', el => el.textContent || '0');
        return parseInt(reviewCountText.replace(/\D/g, '') || '0', 10);
    }

    async getProductDescription(): Promise<string | null> {
        // Assuming the description is in the element with ID `feature-bullets`
        const descriptionElement = await this.page.$('#feature-bullets');
        return descriptionElement ? descriptionElement.textContent() : null;
    }
}