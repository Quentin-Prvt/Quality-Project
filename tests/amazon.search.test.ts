import { test, expect } from '@playwright/test';
import {acceptCookies} from "../Components/acceptCookies";

test.describe('Amazon Search', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the Amazon homepage and accept cookies
        await page.goto('https://www.amazon.fr/');
        await acceptCookies(page);
    });

    test('Search by Category', async ({ page }) => {
        await page.getByLabel('Ouvrir le menu Toutes les cat').click();
        //cliquer sur la catégorie "Livres"
        await page.locator('a.hmenu-item[data-menu-id="9"]').filter({ hasText: 'Livres' }).nth(0).click();
        //cliquer sur la catégorie "Livres en français"
        await page.getByRole('link', { name: 'Tous les livres' }).nth(1).click();
        // cliquer sur le premier lvire dans les nouveautés
        await page.getByRole('link', { name: 'Voir plus Nouveautés' }).click();
        await page.locator('#p13n-asin-index-0').click();
        //fait moi un except pour finaliser le test par rapport au test que j'ai fait, pas de to have title et pas avec le h1
        await expect(page.locator('h1').first()).toHaveText('    Ce que je cherche     Broché – 9 novembre 2024   ');
    });

    test('Search by Keyword', async ({ page }) => {
        // Perform a search for a keyword (e.g., "smartphone")
        await page.fill('input[name="field-keywords"]', 'smartphone');
        await page.click('input#nav-search-submit-button');

        // Wait for search results to load
        await page.waitForSelector('.s-main-slot');

        // Verify that search results are displayed
        const searchResults = await page.$$('.s-main-slot .s-result-item');
        expect(searchResults.length).toBeGreaterThan(0); // Ensure there is at least one result
        console.log('Number of search results:', searchResults.length);
    });
});