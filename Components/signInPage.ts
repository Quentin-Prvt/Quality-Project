import { expect, Locator, Page } from '@playwright/test';

// Class representing the Sign-In page on Amazon.
export class SignInPage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly continueButton: Locator;
    readonly passwordField: Locator;
    readonly signInButton: Locator;

    // Constructor initializes the page and locators for elements on the Sign-In page.
    constructor(page: Page) {
        this.page = page;
        this.emailField = page.locator('#ap_email'); // Locator for the email input field.
        this.continueButton = page.locator('id=continue').first(); // Locator for the "Continue" button after entering email.
        this.passwordField = page.locator('#ap_password'); // Locator for the password input field.
        this.signInButton = page.locator('id=signInSubmit'); // Locator for the "Sign-In" button.
    }

    // Method to fill in the email field and verify the entered value.
    async enterEmail(email: string) {
        await this.emailField.fill(email); // Fill the email field with the provided email.
        await expect(this.emailField).toHaveValue(email); // Ensure the email field contains the expected value.
    }

    // Method to click the "Continue" button after entering the email.
    async clickContinue() {
        await this.continueButton.click(); // Click the continue button to proceed to the password step.
    }

    // Method to fill in the password field and verify the entered value.
    async enterPassword(password: string) {
        await this.passwordField.fill(password); // Fill the password field with the provided password.
        await expect(this.passwordField).toHaveValue(password); // Ensure the password field contains the expected value.
    }

    // Method to click the "Sign-In" button to submit the login credentials.
    async clickSignIn() {
        await this.signInButton.click(); // Click the sign-in button to attempt to log in.
    }
}
