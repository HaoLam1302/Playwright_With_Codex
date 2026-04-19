import { expect, type Locator, type Page } from '@playwright/test';
import type { InventoryItemDetails } from './InventoryPage';

export class CartPage {
  constructor(private readonly page: Page) {}

  firstCartItem = (): Locator => this.page.locator('(//*[@class="cart_item"])[1]');

  firstCartItemTitle = (): Locator =>
    this.page.locator('(//*[@class="cart_item"])[1]//*[@data-test="inventory-item-name"]');

  firstCartItemDescription = (): Locator =>
    this.page.locator('(//*[@class="cart_item"])[1]//*[@data-test="inventory-item-desc"]');

  firstCartItemPrice = (): Locator =>
    this.page.locator('(//*[@class="cart_item"])[1]//*[@data-test="inventory-item-price"]');

  async expectOnCartPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart\.html$/);
  }
  async expectFirstItemAddedCorrectly(expected: InventoryItemDetails): Promise<void> {
    await expect(this.firstCartItem()).toBeVisible();
    await expect(this.firstCartItemTitle(),`Expected first cart item title to be "${expected.title}"`).toHaveText(expected.title)        ;
    await expect(this.firstCartItemDescription(),`Expected first cart item title to be "${expected.description}"`).toHaveText(expected.description);
    await expect(this.firstCartItemPrice(),`Expected first cart item title to be "${expected.price}"`).toHaveText(expected.price);
  }
}
