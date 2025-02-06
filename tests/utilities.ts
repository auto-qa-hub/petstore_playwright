import { test, expect, request } from '@playwright/test';
import testData from "../test-data/test.data.json"

interface UserData {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    userStatus: number;
  }

export async function CreateTestUser({ id = 11225, username = "TestUser", firstName = "Auto", lastName = "Testing", email = "test.user@example.com", password = "12345678Aa!", phone = "0661112233", userStatus = 0 } = {}) {
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
    return response
}

export async function CheckUserInformation(username: string | undefined) {
    const context = await request.newContext();
    const response = await context.get(`https://petstore.swagger.io/v2/user/${username}`)
    const responseBody = await response.json();

    const userInfo = await response.json();
    return response
}

export async function UpdateUserName({ id = 11225, username = "TestUser", firstName = "Auto", lastName = "Testing", email = "test.user@example.com", password = "12345678Aa!", phone = "0661112233", userStatus = 0, newusername = "UpdatedTestUser" } = {}) {
    const context = await request.newContext()
    const response = await context.put(`https://petstore.swagger.io/v2/user/${username}`, {
        data: {
            "id": id,
            "username": newusername,
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "phone": phone,
            "userStatus": userStatus,
        }
    })

    const userUpdatedInfo = await response.json();
    return response
}

export async function DeleteUser(username: string) {
    const context = await request.newContext()
    const response = await context.delete(`https://petstore.swagger.io/v2/user/${username}`)
    return response
}

export async function LogoutUser() {
    const context = await request.newContext();
    const response = await context.get(`https://petstore.swagger.io/v2/user/logout`, {
        headers: {
            "accept": "application/json"
        }
    });
    return response
}

export async function CreateUserWithList(options: UserData[] = []): Promise<any> {
    const context = await request.newContext();
    const response = await context.post(`https://petstore.swagger.io/v2/user/createWithList`, {
      data: options
    });
    return response;
  }

export async function CreateUserWithArray(options: UserData[] = []): Promise<any> {
    const context = await request.newContext();
    const response = await context.post(`https://petstore.swagger.io/v2/user/createWithArray`, {
        data: options
    })
    return response
}