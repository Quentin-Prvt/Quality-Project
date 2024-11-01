import {Page} from "@playwright/test";

export async function acceptCookies(page: Page) {
    const cookieSelector = '#sp-cc-accept';
    try {
        // Vérifie si le bouton d'acceptation des cookies est présent
        if (await page.$(cookieSelector)) {
            await page.click(cookieSelector); // Accepte les cookies si le bouton est visible
            console.log('Cookies accepted.');
        } else {
            console.log('Cookie acceptance button not found or already accepted.');
        }
    } catch (error) {
        console.log('An error occurred while trying to accept cookies:', error);
    }
}