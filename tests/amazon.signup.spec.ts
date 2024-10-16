import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker'


test.describe('Amazon Sign up', () => {
    test.beforeEach(async ({page}) => {
        // Naviguer vers la page du formulaire
        await page.goto('http://amazon.fr/');
        await page.getByLabel('Accepter').click();
    });
    test('sign up', async ({ page }) => {
        await page.getByRole('link', { name: 'Bonjour, Identifiez-vous' }).click();
        await page.getByRole('link', { name: 'Créer votre compte Amazon' }).click();
        //utiliser Faker pour générer un nom de famille et un prénom
        const fullName = faker.person.fullName();
        // Remplir le prénom et le nom de famille
        const nameField = page.locator('#ap_customer_name');
        await nameField.fill(fullName);
        await expect(nameField).toHaveValue(fullName);

        // utiliser Faker pour générer un email ou un numéro de téléphone
        const email = faker.internet.email();
        // Remplir l'email
        const emailField = page.locator('#ap_email');
        await emailField.fill(email);
        await expect(emailField).toHaveValue(email);

        //Utiliser Faker pour générer un mot de passe
        const password = faker.internet.password({ length: 15 }) //
        // Remplir le mot de passe
        const passwordField = page.locator('#ap_password');
        await passwordField.fill(password);
        // Remplir la vérif du mot de passe
        const passwordFieldCheck = page.locator('#ap_password_check')
        await passwordFieldCheck.fill(password)
        // Faire un except pour vérifier que dans passwor Field on a password et la même dans passwordFieldCheck
        await expect(passwordField).toHaveValue(password);
        await expect(passwordFieldCheck).toHaveValue(password);
        //Appuyer sur continuer
        await page.getByLabel('Continuer Vérifier le numéro').click();
        await page.locator('iframe[title="verification puzzle"]').contentFrame().locator('iframe[title="Vérification de l\\\'authentification"]').contentFrame().locator('iframe[title="Verification challenge"]').contentFrame().locator('iframe[title="Défi visuel"]').contentFrame().getByRole('button', { name: 'Commencer l’énigme' }).click();
        //Fin du test car on ne peut pas le faire avec un script pour des raisons de sécurité et éviter la création de compte par un bot

    });
});