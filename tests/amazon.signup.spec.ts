import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { acceptCookies } from "../Components/acceptCookies";

test.describe('Amazon Sign up', () => {
    // This function runs before each test, navigating to the Amazon homepage and accepting cookies.
    test.beforeEach(async ({ page }) => {
        await page.goto('http://amazon.fr/');
        await acceptCookies(page);
    });

    test('sign up with retry on email conflict', async ({ page }) => {
        // Click on "Hello, Sign in" and then "Create your Amazon account" to reach the sign-up page.
        await page.getByRole('link', { name: 'Bonjour, Identifiez-vous' }).click();
        await page.getByRole('link', { name: 'Créer votre compte Amazon' }).click();

        // Generate a random full name and fill in the name field, then verify its value.
        const fullName = faker.person.fullName();
        const nameField = page.locator('#ap_customer_name');
        await nameField.fill(fullName);
        await expect(nameField).toHaveValue(fullName);

        let email;
        let emailIsUsed = true;

        // Loop to try different email addresses until an unused one is found.
        while (emailIsUsed) {
            // Generate a random email and fill in the email field, then verify its value.
            email = faker.internet.email();
            const emailField = page.locator('#ap_email');
            await emailField.fill(email);
            await expect(emailField).toHaveValue(email);

            // Generate a new password each time and fill in both password fields.
            const password = faker.internet.password({ length: 15 });
            const passwordField = page.locator('#ap_password');
            const passwordFieldCheck = page.locator('#ap_password_check');

            // Fill in the password fields with the new password and verify their values.
            await passwordField.fill(password);
            await passwordFieldCheck.fill(password);
            await expect(passwordField).toHaveValue(password);
            await expect(passwordFieldCheck).toHaveValue(password);

            // Click to verify the email address.
            await page.getByLabel('Continuer Vérifier le numéro').click();

            // Wait briefly to allow any error alert to load, if it exists.
            await page.waitForTimeout(1000);

            // Check if the email is already in use by looking for the specific alert text.
            const emailUsedAlert = page.locator('.a-alert-content:has-text("Il existe déjà un compte associé à cette adresse e-mail")');
            emailIsUsed = await emailUsedAlert.isVisible();

            if (emailIsUsed) {
                console.log(`The email address ${email} is already in use. Trying a new email and password...`);
            } else {
                console.log(`Email address ${email} accepted, registration can proceed.`);
            }
        }

    });
});
