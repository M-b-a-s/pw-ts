import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test.describe.only("Intercept requests with playwright", () => {
    // Mock a successful api response to GET a user with a local JSON file
    test('Mock GET single user', async ({ page }) => {

        const mockData = JSON.parse(fs.readFileSync('test_data/user2.json', 'utf-8'));

        await page.route('**/api/users/2', async route => {
            // Mock response with local json file
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockData)
            });
        });

        await page.goto('https://reqres.in/');
        await page.getByText("SINGLE USER").click();
    });
});