import { expect, Locator, Page } from '@playwright/test';

export class SignInPage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly continueButton: Locator;
    readonly passwordField: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.locator('#ap_email');
        this.continueButton = page.locator('id=continue').first();
        this.passwordField = page.locator('#ap_password');
        this.signInButton = page.locator('id=signInSubmit');
    }

    async enterEmail(email: string) {
        await this.emailField.fill(email);
        await expect(this.emailField).toHaveValue(email);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
        await expect(this.passwordField).toHaveValue(password);
    }

    async clickSignIn() {
        await this.signInButton.click();
    }
}
