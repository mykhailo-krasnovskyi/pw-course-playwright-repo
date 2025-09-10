import test from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('');
})

test('.filter hasText', ({ page }) => {
    page.locator('//button').filter({ hasText: 'Sign' });
    page.getByRole('button').filter({ hasText: 'Sign' });
    page.locator('//button', { hasText: 'Sign in' });
    page.getByRole('button', { name: 'Sign up' });
})

test('.filter hasNotText', ({ page }) => {
    page.locator('//button').filter({ hasNotText: 'Sign' });
})


test('.filter has', ({ page }) => {
    page.locator('//a').filter({ has: page.locator('span.icon-telegram') }).highlight();
})

test('.filter hasNot', ({ page }) => {
    page.locator('//a').filter({ hasNot: page.locator('span.icon-telegram') }).highlight();
})

test('.locator.locator', ({ page }) => {
    page.locator('//nav').locator('//a').highlight();
})