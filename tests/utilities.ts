import { test, expect, request } from '@playwright/test';

export async function loginWithCredsFromEnv(username: string, password: string) {
    const context = await request.newContext();
    if (!username || !password) {
        throw new Error('Username or password is undefined');
    }
    const response = await context.get('https://petstore.swagger.io/v2/user/login', {

        params: {
            username: username,
            password: password,
        },
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('Login response:', responseBody);
}

export async function CheckUserInformation(username: string) {
    const context = await request.newContext();
    const response = await context.get(`https://petstore.swagger.io/v2/user/${username}`)
    const responseBody = await response.json();
    console.log(responseBody)

    expect(response.status()).toBe(200);
    const userInfo = await response.json();
    console.log('UserInformation:', userInfo);
}


