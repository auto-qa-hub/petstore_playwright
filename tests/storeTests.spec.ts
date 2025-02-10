import {test, expect, request} from '@playwright/test';
import ordersData from '../test-data/ordersData.json';
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
            data: ordersData.order1,
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
    });
});

test.describe('Find purchase order by ID', async () => {
    test.beforeAll(async () => {
        const context = await request.newContext();
        const response = await context.post(`${backendURL}/order`, {
            data: ordersData.order2,
        });
        expect(response.status()).toBe(200);
    
        const responseBody = await response.json();
        console.log(responseBody);
    });

    test('Find order', async () => {
        const context = await request.newContext();
        const response = await context.get(`${backendURL}/order/${ordersData.order2.id}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
    });
});

test.describe('Delete order by ID', () => {
    test.beforeAll(async () => {
        const context = await request.newContext();
        const response = await context.post(`${backendURL}/order`, {
            data: ordersData.order3,
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
    });

    test('Delete order', async () => {
        const context = await request.newContext();
        const response = await context.delete(`${backendURL}/order/${ordersData.order3.id}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
    });

    test.afterAll(async () => {
        const context = await request.newContext();
        const response = await context.delete(`${backendURL}/order/${ordersData.order3.id}`);
        expect(response.status()).toBe(404);

        const responseBody = await response.json();
        console.log(responseBody);
    });
});