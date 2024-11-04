import { test, expect } from '@playwright/test';
import { acceptCookies } from '../Components/acceptCookies';
import { CartPage } from '../Components/CartPage';

test.describe('Cart Manipulations', () => {
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.amazon.fr/');
        await acceptCookies(page);
        cartPage = new CartPage(page);
    });

    test('Add Item to Cart', async () => {
        // Search for and add an item to the cart
        await cartPage.searchAndAddItemToCart('pc portable hp');
        await cartPage.goToCart();

        // Verify the item is in the cart
        const cartCount = await cartPage.getCartCount();
        expect(cartCount).toBeGreaterThan(0);
    });

    test('Remove Item from Cart', async () => {
        // Add an item to the cart
        await cartPage.searchAndAddItemToCart('pc portable hp');
        await cartPage.goToCart();

        // Remove the item and verify the confirmation message
        await cartPage.removeItemFromCart();
        const confirmationMessage = await cartPage.getConfirmationMessage();
        expect(confirmationMessage).toContain('a été supprimé de Votre panier.');
    });

    test('Modify Item Quantity', async () => {
        // Add an item to the cart
        await cartPage.searchAndAddItemToCart('pc portable hp');
        await cartPage.goToCart();

        // Change the quantity to 2 and verify the update
        await cartPage.modifyItemQuantity('2');
        const updatedQuantity = await cartPage.getItemQuantity();
        expect(updatedQuantity).toBe('2');
    });
});