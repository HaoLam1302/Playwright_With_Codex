import { test } from '../fixtures/baseTest';
import { loginData } from '../utils/testData';

test.describe('Login', () => {
  test('standard user can login successfully', async ({ inventoryPage, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(loginData.valid.username, loginData.valid.password);
    await loginPage.expectLoginSuccess();
    await inventoryPage.expectOnInventoryPage();
  });

  test('locked out user sees an error message', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(loginData.locked.username, loginData.locked.password);
    await loginPage.expectLoginError();
  });

  test('first inventory item shows title, description, price and add to cart button', async ({
    inventoryPage,
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(loginData.valid.username, loginData.valid.password);

    await inventoryPage.expectOnInventoryPage();
    await inventoryPage.expectFirstItemVisible();
  });

});
