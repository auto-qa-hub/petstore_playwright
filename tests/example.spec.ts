import { test, expect, request } from '@playwright/test';
import { validUserName, validPassword } from '../playwright.config';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test.describe('Positive login test', () => {
  test('Login', async ({ request }) => {

    if (!validUserName || !validPassword) {
      throw new Error('Username or password is undefined');
    }
    const response = await request.get('https://petstore.swagger.io/v2/user/login', {
      
      params: {
        username: validUserName,
        password: validPassword,
      },
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('Login response:', responseBody);
  });
});