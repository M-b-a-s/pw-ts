import { test, expect } from '@playwright/test';

test.describe('Visual Testing', () => {
    test('Plain screenshot capture of login page', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await expect(page).toHaveScreenshot();
    })

    test('Full page screenshot capture of login page', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await expect(page).toHaveScreenshot({fullPage: true});
    })
    // visual check of specific element
    test('Visual Check of specific element', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        const loginButton = page.getByRole('button', { name: 'Login' });
        await expect(loginButton).toHaveScreenshot("login-btn.png");
    })

    // Masking sensitive data
    test('Masking sensitive data', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.fill('#username', 'tomsmith');
        await page.fill('#password', 'SuperSecretPassword!');
        await expect(page).toHaveScreenshot('login-info-masked.png', {
            fullPage: true,
            mask: [page.locator('#username'), page.locator('#password')],
            maskColor: 'black'
        });
    })
});