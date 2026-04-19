import { test as base } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

type Pages = {
  cartPage: CartPage;
  inventoryPage: InventoryPage;
  loginPage: LoginPage;
};

export const test = base.extend<Pages>({
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
