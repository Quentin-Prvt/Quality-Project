import { test, expect } from '@playwright/test';

test.describe('FORM TEST', () => {
    test.beforeEach(async ({page}) => {
        // Naviguer vers la page du formulaire
        await page.goto('http://amazon.fr/');
        await page.click('id=nav-link-accountList');
    });
});