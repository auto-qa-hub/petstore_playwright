import { test, expect, request } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import pets from "../test-data/pets.Data.json"

const backendURL: string = "https://petstore.swagger.io/v2/pet";

test.describe("Testing uploading image for pet and pets creation/updating", () => {
  test("Upload an image via API", async () => {
    const apiRequestContext = await request.newContext();
    const petId = 1;
    const additionalMetadata = "Sample metadata";
    const filePath = path.resolve(__dirname, "../tests/image.jpeg");

    const response = await apiRequestContext.post(
      `${backendURL}/${petId}/uploadImage`,
      {
        multipart: {
          additionalMetadata: additionalMetadata,
          file: {
            name: "image.jpg",
            mimeType: "image/jpeg",
            buffer: fs.readFileSync(filePath),
          },
        },
      }
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody).toHaveProperty("code");
    expect(responseBody).toHaveProperty("type");
    expect(responseBody).toHaveProperty("message");
  });

  test("Add a new pet to the store", async () => {
    const context = await request.newContext();
    const response = await context.post(`${backendURL}`, {
      data:pets.pet2,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
  });

  test("Update an existing pet", async () => {
    const context = await request.newContext();
    const response = await context.post(`${backendURL}`, {
      data: pets.pet2update
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
  });
});

test.describe("Find pet by status: available, pending, sold", () => {
  test('Should return pets with status "pending"', async ({ request }) => {
    const response = await request.get(`${backendURL}/findByStatus`, {
      params: pets.pet2.status[1],
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    responseBody.forEach((pet) => {
      expect(pet.status).toBe(pets.pet2.status[1]);
    });
  });
});

test('Should return pets with status "available"', async ({ request }) => {
  const response = await request.get(`${backendURL}/findByStatus`, {
    params: pets.pet2.status[0],
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBeTruthy();
  responseBody.forEach((pet) => {
    expect(pet.status).toBe(pets.pet2.status[0]);
  });
});

test('Should return pets with status "sold"', async ({ request }) => {
  const response = await request.get(`${backendURL}/findByStatus`, {
    params: pets.pet2.status[2],
  });

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBeTruthy();
  responseBody.forEach((pet) => {
    expect(pet.status).toBe(pets.pet2.status[2]);
  });
});

test.describe("Find pet by ID, update pet in the store", async () => {
  test("Find pet", async () => {
    const context = await request.newContext();
    const response = await context.get(`${backendURL}/${pets.pet4.id}`);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);
  });
});

test("Update pet information", async () => {
  const context = await request.newContext();
  const response = await context.post(`${backendURL}/${pets.pet2update.id}`, {
    form: {
      name: pets.pet2update.name,
      status: pets.pet2update.status[2]
    },
  });
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.message).toBe(pets.pet2update.id.toString());
});

test.describe("Delete pet by ID", async () => {
  test.beforeAll(async () => {
    const context = await request.newContext();
    const response = await context.post(`${backendURL}`, {
      data: pets.pet6
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
  });

  test("Delete pet", async () => {
    const context = await request.newContext();
    const apiKey = "your_actual_api_key";
    const response = await context.delete(`${backendURL}/${pets.pet6.id}`, {
      headers: {
        api_key: apiKey,
      },
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
  });

  test.afterAll(async () => {
    const context = await request.newContext();
    const response = await context.delete(`${backendURL}/${pets.pet6.id}`);

    expect(response.status()).toBe(404);
  });
});
