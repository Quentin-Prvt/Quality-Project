import { test, expect } from '@playwright/test';
import {acceptCookies} from "../Components/acceptCookies";
import { SignInPage } from '../Components/signInPage';


test.describe('Amazon Sign in', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the sign-in page
        await page.goto('http://amazon.fr/');
        await acceptCookies(page);
    });

    test('sign in with good password', async ({ page }) => {
        const signInPage = new SignInPage(page);

        await page.click('#nav-link-accountList');  // Sélectionne le lien "Compte"

        // Utilise les méthodes de la page de connexion
        await signInPage.enterEmail('damien.loubre@gmail.com');
        await signInPage.clickContinue();
        await signInPage.enterPassword('stordeurvousarrachesurvalo');
        await signInPage.clickSignIn();
    });
    test('sign in with bad password', async ({ page }) => {
        await page.click('#nav-link-accountList');  // Select the "Account" link
        // Fill in the email
        const emailField = page.locator('#ap_email');
        await emailField.fill('damien.loubre@gmail.com');
        await expect(emailField).toHaveValue('damien.loubre@gmail.com');

        // Click continue to enter the password
        await page.click('id=continue');
        // Fill in the password
        const passwordField = page.locator('#ap_password');
        await passwordField.fill('testosterone');
        await expect(passwordField).toHaveValue('testosterone');

        // Click sign in to log in
        await page.click('id=signInSubmit');


    });
});
