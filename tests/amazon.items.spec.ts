import { test, expect } from '@playwright/test';

  test('addItemToCart', async ({ page }) => {
    await page.goto('https://www.amazon.fr/');
    await page.click('#sp-cc-accept');
    await page.fill('input[name="field-keywords"]', 'laptop');
    await page.click('input#nav-search-submit-button');
    await page.waitForSelector('.s-main-slot');
    const firstItem = await page.$('.s-main-slot .s-result-item');
    if (firstItem) {
      await firstItem.click();
      await page.waitForSelector('#add-to-cart-button');
      await page.click('#add-to-cart-button');
    }

    // Check if the item is in the cart //nav-cart-count
    await page.waitForSelector('#nav-cart-count');
    const cartCount = await page.$eval('#nav-cart-count', el => el.textContent);
    cartCount = parseInt(cartCount);
    expect(parseInt(cartCount)).toBeGreaterThan(0);
  });
  
  test('removeItemFromCart', async ({ page }) => {
    await page.goto('https://www.amazon.fr/gp/cart/view.html');
    // Check if the cart is not empty
    const cartCount = await page.$eval('#nav-cart-count', el => el.textContent);
    if (parseInt(cartCount) > 0) {
      await page.click('.sc-action-delete input');
      await page.waitForSelector('.sc-your-amazon-cart-is-empty');
      const emptyCartMessage = await page.$('.sc-your-amazon-cart-is-empty');
      expect(emptyCartMessage).not.toBeNull();
    }
  });
  
  test('searchForItem', async ({ page }) => {
    await page.goto('https://www.amazon.fr/');
    await page.click('#sp-cc-accept');
    await page.fill('input[name="field-keywords"]', 'smartphone');
    await page.click('input#nav-search-submit-button');
    await page.waitForSelector('.s-main-slot');
    const searchResults = await page.$$('.s-main-slot .s-result-item');
    expect(searchResults.length).toBeGreaterThan(0);
  });