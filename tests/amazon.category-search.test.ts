import { test, expect } from '@playwright/test';

test.describe('Amazon Category Search', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the sign-in page
        await page.goto('http://amazon.fr/');
        await page.getByLabel('Accepter').click();
    });

    test('search by Category', async ({ page }) => {
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
});
