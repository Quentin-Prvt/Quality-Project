import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'

test.describe('Amazon Sign up', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the registration page
        await page.goto('http://amazon.fr/');
        await page.getByLabel('Accepter').click();
    });

    test('sign up', async ({ page }) => {
        await page.getByRole('link', { name: 'Bonjour, Identifiez-vous' }).click();
        await page.getByRole('link', { name: 'Créer votre compte Amazon' }).click();

        // Use Faker to generate a random full name
        const fullName = faker.person.fullName();
        // Fill in the full name
        const nameField = page.locator('#ap_customer_name');
        await nameField.fill(fullName);
        await expect(nameField).toHaveValue(fullName);

        // Use Faker to generate a random email or phone number
        const email = faker.internet.email();
        // Fill in the email
        const emailField = page.locator('#ap_email');
        await emailField.fill(email);
        await expect(emailField).toHaveValue(email);

        // Use Faker to generate a random password
        const password = faker.internet.password({ length: 15 });
        // Fill in the password
        const passwordField = page.locator('#ap_password');
        await passwordField.fill(password);
        // Fill in the password confirmation
        const passwordFieldCheck = page.locator('#ap_password_check');
        await passwordFieldCheck.fill(password);
        // Check that both password fields contain the same value
        await expect(passwordField).toHaveValue(password);
        await expect(passwordFieldCheck).toHaveValue(password);

        // Click continue to proceed
        await page.getByLabel('Continuer Vérifier le numéro').click();

        // Complete the CAPTCHA puzzle for verification
        await page.locator('iframe[title="verification puzzle"]').contentFrame().locator('iframe[title="Vérification de l\\\'authentification"]').contentFrame().locator('iframe[title="Verification challenge"]').contentFrame().locator('iframe[title="Défi visuel"]').contentFrame().getByRole('button', { name: 'Commencer l’énigme' }).click();

        // End of test, cannot proceed further due to security reasons and to avoid automated account creation
    });
});
