import { Locator } from '@playwright/test'
import { BasePage } from './BasePage';

export class GaragePage extends BasePage {
    public readonly pageHeading: Locator = this.page.getByRole('heading', { name: 'Garage' });

    async navigate() {
        await super.navigate('/panel/garage');
    }
}