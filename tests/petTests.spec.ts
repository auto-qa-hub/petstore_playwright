import { test, expect, request } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

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
      data: {
        id: 2,
        category: {
          id: 0,
          name: "string",
        },
        name: "doggie",
        photoUrls: ["string"],
        tags: [
          {
            id: 0,
            name: "string",
          },
        ],
        status: "available",
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
  });

  test("Update an existing pet", async () => {
    const context = await request.newContext();
    const response = await context.post(`${backendURL}`, {
      data: {
        id: 2,
        category: {
          id: 0,
          name: "string",
        },
        name: "kitty",
        photoUrls: ["string"],
        tags: [
          {
            id: 0,
            name: "string",
          },
        ],
        status: "available",
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
  });
});

test.describe("Find pet by status: available, pending, sold", () => {
  test('Should return pets with status "pending"', async ({ request }) => {
    const status = "pending";
    const response = await request.get(`${backendURL}/findByStatus`, {
      params: { status },
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    responseBody.forEach((pet) => {
      expect(pet.status).toBe("pending");
    });
  });
});

test('Should return pets with status "available"', async ({ request }) => {
  const status = "available";
  const response = await request.get(`${backendURL}/findByStatus`, {
    params: { status },
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBeTruthy();
  responseBody.forEach((pet) => {
    expect(pet.status).toBe("available");
  });
});

test('Should return pets with status "sold"', async ({ request }) => {
  const status = "sold";
  const response = await request.get(`${backendURL}/findByStatus`, {
    params: { status },
  });

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBeTruthy();
  responseBody.forEach((pet) => {
    expect(pet.status).toBe("sold");
  });
});

test.describe("Find pet by ID, update pet in the store", async () => {
  test("Find pet", async () => {
    const petId = 4;
    const context = await request.newContext();
    const response = await context.get(`${backendURL}/${petId}`);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);
  });
});

test("Update pet information", async () => {
  const petId = 2;
  const updatedName = "Updated Pet Name";
  const updatedStatus = "sold";
  const context = await request.newContext();
  const response = await context.post(`${backendURL}/${petId}`, {
    form: {
      name: updatedName,
      status: updatedStatus,
    },
  });
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.message).toBe(petId.toString());
});

test.describe("Delete pet by ID", async () => {
  const petId = 6;
  test.beforeAll(async () => {
    const context = await request.newContext();
    const response = await context.post(`${backendURL}`, {
      data: {
        id: petId,
        category: {
          id: 0,
          name: "string",
        },
        name: "doggie",
        photoUrls: ["string"],
        tags: [
          {
            id: 0,
            name: "string",
          },
        ],
        status: "available",
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
  });

  test("Delete pet", async () => {
    const context = await request.newContext();
    const apiKey = "your_actual_api_key";
    const response = await context.delete(`${backendURL}/${petId}`, {
      headers: {
        api_key: apiKey,
      },
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
  });

  test.afterAll(async () => {
    const petId = 6;
    const context = await request.newContext();
    const response = await context.delete(`${backendURL}/${petId}`);

    expect(response.status()).toBe(404); 
  });
});