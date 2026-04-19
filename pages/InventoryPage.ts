import { expect, type Locator, type Page } from '@playwright/test';

export type InventoryItemDetails = {
  title: string;
  description: string;
  price: string;
};

export class InventoryPage {
  constructor(private readonly page: Page) {}

  firstInventoryItem = (): Locator =>
    this.page.locator('(//*[@class="inventory_item"])[1]');

  firstItemTitle = (): Locator =>
    this.page.locator('(//*[@class="inventory_item"])[1]//*[@data-test="inventory-item-name"]',
    );

  firstItemDescription = (): Locator =>
    this.page.locator('(//*[@class="inventory_item"])[1]//*[@data-test="inventory-item-desc"]',
    );

  firstItemPrice = (): Locator =>
    this.page.locator('(//*[@class="inventory_item"])[1]//*[@data-test="inventory-item-price"]',
    );

  firstItemAddToCartButton = (): Locator =>
    this.page.locator('(//*[@class="inventory_item"])[1]//*[@data-test="add-to-cart-sauce-labs-backpack"]',
    );

  cartLink = (): Locator => this.page.locator('//*[@data-test="shopping-cart-link"]');

  async expectOnInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
  }

  async expectFirstItemVisible(): Promise<void> {
    await expect(this.firstItemTitle()).toBeVisible();
    await expect(this.firstItemDescription()).toBeVisible();
    await expect(this.firstItemPrice()).toBeVisible();
    await expect(this.firstItemAddToCartButton()).toBeVisible();
  }

  async addFirstItemToCart(): Promise<void> {
    await this.firstItemAddToCartButton().click();
  }

  async getFirstItemDetails(): Promise<InventoryItemDetails> {
    return {
      title: (await this.firstItemTitle().textContent())?.trim() ?? '',
      description: (await this.firstItemDescription().textContent())?.trim() ?? '',
      price: (await this.firstItemPrice().textContent())?.trim() ?? '',
    };
  }

  async openCart(): Promise<void> {
    await this.cartLink().click();
  }
}
