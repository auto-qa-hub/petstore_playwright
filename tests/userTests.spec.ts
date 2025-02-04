import { test, expect } from '@playwright/test';
import { loginWithCredsFromEnv, CheckUserInformation, CreateTestUser } from './utilities';
import { validUserName, validPassword } from '../playwright.config';


test.describe('Login and UserInfo tests', () => {
  test('Create User', async () => {
    const responseStatus = await CreateTestUser({ username: validUserName, password: validPassword })
    expect(responseStatus.status()).toBe(200);
  });

  test('Check Login', async () => {
    const responseStatus = await loginWithCredsFromEnv(validUserName, validPassword);
    expect(responseStatus.status()).toBe(200);
  });

  test('Check User', async () => {
    const responseStatus = await CheckUserInformation(validUserName)
    expect(responseStatus.status()).toBe(200);
  });
})  