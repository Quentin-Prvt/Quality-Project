import { test, expect } from '@playwright/test';

test.describe('Amazon Sign in', () => {
    test.beforeEach(async ({page}) => {
        // Naviguer vers la page du formulaire
        await page.goto('http://amazon.fr/');
        await page.getByLabel('Accepter').click();
    });
    test('sign in', async ({ page }) => {
        await page.click('#nav-link-accountList');  // Sélectionner le lien "Compte"
        // Remplir l'email
        const emailField = page.locator('#ap_email');
        await emailField.fill('damien.loubre@gmail.com');
        await expect(emailField).toHaveValue('damien.loubre@gmail.com');

        // appuyer sur continuer pour mettre le mot de passe
        await page.click('id=continue');
        // Remplir le mot de passe
        const passwordField = page.locator('#ap_password');
        await passwordField.fill('stordeurvousarrachesurvalo');
        await expect(passwordField).toHaveValue('stordeurvousarrachesurvalo');
        // appuyer sur s'identifier pour se connecter
        await page.click('id=signInSubmit');
    });
});