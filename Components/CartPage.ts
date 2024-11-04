import { Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async searchAndAddItemToCart(productName: string) {
        // Search for a product and add the first item in the results to the cart
        await this.page.fill('#twotabsearchtextbox', productName);
        await this.page.click('input#nav-search-submit-button');
        await this.page.waitForSelector('.s-main-slot');

        const firstItem = await this.page.$('.s-main-slot .s-result-item');
        if (firstItem) {
            await firstItem.click();
            await this.page.waitForSelector('#add-to-cart-button');
            await this.page.click('#add-to-cart-button');
        }
    }

    async goToCart() {
        // Navigate to the cart page
        await this.page.goto('https://www.amazon.fr/gp/cart/view.html');
    }

    async getCartCount(): Promise<number> {
        // Get the current cart count
        await this.page.waitForSelector('#nav-cart-count');
        const cartCount = await this.page.$eval('#nav-cart-count', el => el.textContent);
        return parseInt(cartCount || '0');
    }

    async removeItemFromCart() {
        // Remove the first item from the cart
        await this.page.click('.sc-action-delete input');
    }

    async getConfirmationMessage(): Promise<string | null> {
        // Retrieve the confirmation message displayed after an item is removed
        return await this.page.locator('body').textContent();
    }

    async modifyItemQuantity(quantity: string) {
        // Change the quantity of the first item in the cart
        await this.page.waitForSelector('.a-button.a-button-dropdown.quantity');
        await this.page.selectOption('.sc-action-quantity select', quantity);
    }

    async getItemQuantity(): Promise<string> {
        // Retrieve the quantity of the first item in the cart
        return await this.page.$eval('.sc-action-quantity select', el => (el as HTMLSelectElement).value);
    }
}