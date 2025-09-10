import test, { expect } from "@playwright/test";

test.describe('CodeGen Sign in tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
        await page.getByRole('button', { name: 'Sign In' }).click();
    })

    test('Successful sign in', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).fill('michael.krasnovskyi+testUser1@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('ZSgeVQhuU3qkvlG');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('heading')).toContainText('Garage');
    })

    test('Sign in with empty email', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).focus();
        await page.getByRole('textbox', { name: 'Email' }).blur();
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('53252352');
        await expect(page.getByText('Email required')).toBeVisible();
    })

    test('Sign in with empty password', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password' }).focus();
        await page.getByRole('textbox', { name: 'Password' }).blur();
        await page.getByRole('textbox', { name: 'Email' }).fill('test@gmail.com');
        await expect(page.getByText('Password required')).toBeVisible();
        await page.getByRole('button', { name: 'Close' }).click();
    })

    test('Sign incorrect email', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).fill('test');
        await page.getByRole('textbox', { name: 'Password' }).fill('testtest');
        await expect(page.getByText('Email is incorrect')).toBeVisible();
    })

    test('Sign in with wrong credentials', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).fill('test@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('testtest');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Wrong email or password')).toBeVisible();
    })
})