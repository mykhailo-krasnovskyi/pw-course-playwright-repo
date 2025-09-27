import { expect } from "@playwright/test";
import { testUser1, testUser2 } from "../../test-data/validUsers";
import { test } from "../../utils/fixtures/pagesFixtures";

test('Log in as testuser1 and save storage state', async ({ context, app }) => {
    await app.homePage.navigate();
    await app.homePage.openSignInForm();
    await app.signInForm.signInWithCredentials(testUser1.email, testUser1.password);
    await expect(app.garagePage.pageHeading).toContainText('Garage');

    await context.storageState({ path: '.states/testuser1.json' });
    await context.close();
})


test('Log in as testuser2 and save storage state', async ({ context, app }) => {
    await app.homePage.navigate();
    await app.homePage.openSignInForm();
    await app.signInForm.signInWithCredentials(testUser2.email, testUser2.password);
    await expect(app.garagePage.pageHeading).toContainText('Garage');

    await context.storageState({ path: '.states/testuser2.json' });
    await context.close();
})