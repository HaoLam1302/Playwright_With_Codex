import { test } from '../fixtures/baseTest';
import { loginData } from '../utils/testData';

test.describe('Login', () => {

  test('first inventory item is added correctly in cart', async ({
    cartPage,
    inventoryPage,
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(loginData.valid.username, loginData.valid.password, test.info());

    await inventoryPage.expectOnInventoryPage();

    const firstItem = await inventoryPage.getFirstItemDetails();
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.openCart();

    await cartPage.expectOnCartPage();
    await cartPage.expectFirstItemAddedCorrectly(firstItem);
  });
});
