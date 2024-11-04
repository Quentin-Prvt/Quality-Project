import { test, expect } from '@playwright/test';
import {acceptCookies} from "../Components/acceptCookies";

test.describe('Amazon Search', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the Amazon homepage and accept cookies
        await page.goto('https://www.amazon.fr/');
        await acceptCookies(page);
    });

    test('Search by Category', async ({ page }) => {
        await acceptCookies(page);
        // Open the category menu and click on "Livres"
        await page.getByLabel('Ouvrir le menu Toutes les cat').click();
        await page.locator('a.hmenu-item[data-menu-id="9"]').filter({ hasText: 'Livres' }).nth(0).click();

        // Click on "Tous les livres" within the "Livres" category
        await page.getByRole('link', { name: 'Tous les livres' }).nth(1).click();

        // Click on the first book in the "Nouveautés" section
        await page.getByRole('link', { name: 'Voir plus Nouveautés' }).click();
        await page.locator('#p13n-asin-index-0').click();

        // Verify that the product page has loaded by checking for the presence of a stable element
        await expect(page.locator('#productTitle')).toBeVisible(); // Checks for product title element
    });

    test('Search by Keyword', async ({ page }) => {
        // Perform a search for a keyword (e.g., "smartphone")
        await page.fill('#twotabsearchtextbox', 'smartphone');
        await page.click('input#nav-search-submit-button');

        // Wait for search results to load
        await page.waitForSelector('.s-main-slot');

        // Verify that search results are displayed
        const searchResults = await page.$$('.s-main-slot .s-result-item');
        expect(searchResults.length).toBeGreaterThan(0); // Ensure there is at least one result
        console.log('Number of search results:', searchResults.length);
    });
});