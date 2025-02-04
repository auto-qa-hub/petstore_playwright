import { test, expect, request } from '@playwright/test';

export async function CreateTestUser({id =  11225, username = "TestUser", firstName = "Auto", lastName = "Testing", email = "test.user@example.com", password = "12345678Aa!", phone = "0661112233", userStatus = 0} = {}) {
    const context = await request.newContext();
    const response = await context.post('https://petstore.swagger.io/v2/user', {
        data: {
                "id": id,
                "username": username,
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password,
                "phone": phone,
                "userStatus": userStatus
        }
    })
    const responseBody = await response.json();
    console.log('Creation response:', responseBody);
    return response
}

export async function loginWithCredsFromEnv(username: string | undefined, password: string | undefined) {
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
    const responseBody = await response.json();
    console.log('Login response:', responseBody);
    return response
}

export async function CheckUserInformation(username: string | undefined) {
    const context = await request.newContext();
    const response = await context.get(`https://petstore.swagger.io/v2/user/${username}`)
    const responseBody = await response.json();
    console.log(responseBody)

    const userInfo = await response.json();
    console.log('User Information:', userInfo);
    return response
}