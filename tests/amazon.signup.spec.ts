import { test, expect } from '@playwright/test';
const faker = require('faker');


test.describe('Amazon Sign up', () => {
    test.beforeEach(async ({page}) => {
        // Naviguer vers la page du formulaire
        await page.goto('http://amazon.fr/');
        await page.getByLabel('Accepter').click();
        await page.getByRole('link', { name: 'Commencer ici.' }).click();
    });
    test('sign up', async ({ page }) => {
        //utiliser Faker pour générer un nom de famille et un prénom
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        // Remplir le prénom et le nom de famille
        const nameField = page.locator('#ap_customer_name');
        await nameField.fill(firstName + ' ' + lastName);
        await expect(nameField).toHaveValue(firstName + ' ' + lastName);

        // utiliser Faker pour générer un email ou un numéro de téléphone
        const email = faker.internet.email();
        // Remplir l'email
        const emailField = page.locator('#ap_email');
        await emailField.fill(email);
        await expect(emailField).toHaveValue(email);

    });
});