import { Locator } from '@playwright/test'
import { BasePage } from './BasePage';

export class GaragePage extends BasePage {
    public readonly pageHeading: Locator = this.page.getByRole('heading', { name: 'Garage' });
    public readonly addCarButton: Locator = this.page.getByRole('button', { name: 'Add car' });

    async navigate() {
        await super.navigate('/panel/garage');
    }

    async openAddCarForm() {
        await this.addCarButton.click();
    }
}