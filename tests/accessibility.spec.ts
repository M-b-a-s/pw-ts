import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test('General Accessibilty checks', async ({ page }) => {
    // Navigate to page
    await page.goto("https://the-internet.herokuapp.com/login");

    // run accessibility checks with default axe rules
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // Log the results to the console
    console.log('Accessibility scan results: ', accessibilityScanResults.violations);

    // Assert that there are no accessibility violations
    expect(accessibilityScanResults.violations).toEqual([]);
});

test.only('Custom tags verification', async ({ page }) => {
    // Navigate to page
    await page.goto("https://the-internet.herokuapp.com/login");

    // run accessibility checks with default axe rules
    const axeBuilder = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .withRules([
        'color-contrast',
        'label',
        'link-name',
        'image-alt',
    ])

    const accessibilityScanResults = await axeBuilder.analyze();

    // Log the results to the console
    console.log('Accessibility scan results: ', accessibilityScanResults.violations);

    // Assert that there are no accessibility violations
    expect(accessibilityScanResults.violations.length).toBe(0);
});