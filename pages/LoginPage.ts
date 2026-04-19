import { expect, type Locator, type Page, type TestInfo } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  usernameInput = (): Locator => this.page.getByPlaceholder('Username');

  passwordInput = (): Locator => this.page.getByPlaceholder('Password');

  loginButton = (): Locator => this.page.getByRole('button', { name: 'Login' });

  productsTitle = (): Locator => this.page.getByText('Products');

  errorMessage = (): Locator => this.page.getByText('Epic sadface:');

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string, testInfo?: TestInfo): Promise<void> {
    await testInfo?.attach('login-info', {
    body: `Login with user: ${username}, ${password}`,
    contentType: 'text/plain',
    });
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }

  async expectLoginSuccess(): Promise<void> {
    await expect(this.productsTitle()).toBeVisible();
  }

  async expectLoginError(): Promise<void> {
    await expect(this.errorMessage()).toBeVisible();
  }
}
