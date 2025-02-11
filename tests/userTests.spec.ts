import { test, expect } from '@playwright/test';
import * as utilities from './utilities';
import { validUserName, validPassword } from '../playwright.config';
import testData from "../test-data/users.data.json";

test.describe('User part tests', () => {
  test('Create User', async () => {
    const responseStatus = await utilities.CreateTestUser({ username: validUserName, password: validPassword })
    expect(responseStatus.status()).toBe(200);
  });

  test('Check Login', async () => {
    const responseStatus = await utilities.loginWithCredsFromEnv(validUserName, validPassword);
    const responseBody = await responseStatus.json()
    expect(responseStatus.status()).toBe(200);
    expect(responseBody.message).toContain('logged in user session')
  });

  test('Check Created User Info', async () => {
    const responseStatus = await utilities.CheckUserInformation(validUserName)
    expect(responseStatus.status()).toBe(200);
    const responseBody = await responseStatus.json()
    expect(responseBody.username).toBe(validUserName)
    expect(responseBody.password).toBe(validPassword)
  });

  test('Check Update User Name', async () => {
    const responseStatus = await utilities.UpdateUserName({ username: validUserName, newusername: testData.username })
    expect(responseStatus.status()).toBe(200);

    const checkNewUserName = await utilities.CheckUserInformation(testData.username)
    const responseBody = await checkNewUserName.json()
    expect(checkNewUserName.status()).toBe(200);
    expect(responseBody.username).toContain(testData.username)
  })

  test('Check User Deleting', async () => {
    const responseStatus = await utilities.DeleteUser(testData.username)
    expect(responseStatus.status()).toBe(200);
  });

  test('Check User Logout', async () => {
    const responseStatusLogin = await utilities.loginWithCredsFromEnv(validUserName, validPassword);
    const responseStatusLogout = await utilities.LogoutUser()
    expect(responseStatusLogout.status()).toBe(200);
    const responseBody = await responseStatusLogout.json()
    expect(responseBody.message).toBe('ok')
  })

  test('Check Creation With List', async () => {
    const response = await utilities.CreateUserWithList([{
      id: testData.id,
      username: testData.username,
      firstName: testData.firstName,
      lastName: testData.lastName,
      email: testData.email,
      password: testData.password,
      phone: testData.phone,
      userStatus: testData.userStatus
    }]);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.message).toBe('ok');
  });
  

  test('Check User With Array', async () => {
    const response = await utilities.CreateUserWithList([{
      id: testData.id,
      username: testData.username,
      firstName: testData.firstName,
      lastName: testData.lastName,
      email: testData.email,
      password: testData.password,
      phone: testData.phone,
      userStatus: testData.userStatus
    }]);
    expect(response.status()).toBe(200);
    const responseBody = await response.json()
    expect(responseBody.message).toBe('ok')
  })
})