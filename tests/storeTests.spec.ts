import {test, expect, request} from '@playwright/test';
const backendURL: string = 'https://petstore.swagger.io/v2/store'

test.describe ('Testing access to orders in the pet store', () => {
    test('Return pet inventory by status', async () => {
        const context = await request.newContext();
        const response = await context.get(`${backendURL}/inventory`)
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
    });

    test('Place an order for a pet', async () => {
        const context = await request.newContext();
        const response = await context.post(`${backendURL}/order`, {
            data: {
                "id": 1,
                "petId": 0,
                "quantity": 0,
                "shipDate": "2025-01-01T17:00:00.000Z",
                "status": "placed",
                "complete": true
            },
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
    });
});

test.describe('Find purchase order by ID', async () => {
    const orderId = 2;
    test.beforeAll(async () => {
        const context = await request.newContext();
        const response = await context.post(`${backendURL}/order`, {
            data: {
                "id": orderId,
                "petId": 0,
                "quantity": 0,
                "shipDate": "2025-06-01T17:12:00.000Z",
                "status": "placed",
                "complete": true
            },
        });
        expect(response.status()).toBe(200);
    
        const responseBody = await response.json();
        console.log(responseBody);
    });

    test('Find order', async () => {
        const context = await request.newContext();
        const response = await context.get(`${backendURL}/order/${orderId}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
    });
});

test.describe('Delete order by ID', () => {
    const orderId = 3;
    test.beforeAll(async () => {
        const context = await request.newContext();
        const response = await context.post(`${backendURL}/order`, {
            data: {
                "id": orderId,
                "petId": 0,
                "quantity": 0,
                "shipDate": "2025-06-01T17:12:00.000Z",
                "status": "placed",
                "complete": true
            },
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
    });

    test('Delete order', async () => {
        const context = await request.newContext();
        const response = await context.delete(`${backendURL}/order/${orderId}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
    });

    test.afterAll(async () => {
        const context = await request.newContext();
        const response = await context.delete(`${backendURL}/order/${orderId}`);
        expect(response.status()).toBe(404);

        const responseBody = await response.json();
        console.log(responseBody);
    });
});