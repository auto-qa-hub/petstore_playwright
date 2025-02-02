import { test, expect, request } from '@playwright/test';
import { loginWithCredsFromEnv, CheckUserInformation } from './utilities';
import { describe } from 'node:test';


test.describe('Login and UserInfo tests', () => {
  test('Check Login', async ({ request }) => {
    await loginWithCredsFromEnv(process.env.VALID_USER_NAME, process.env.VALID_PASSWORD);

  });

  test('Check User', async ({ request }) => {
    await CheckUserInformation(process.env.VALID_USER_NAME)
  });
})