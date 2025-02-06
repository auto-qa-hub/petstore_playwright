# Read me for Swagger Petstore API project 

## Overview

This project uses Playwright for API testing. Playwright enables fast and reliable browser automation across different browsers and devices.

## Prerequisites

Ensure you have the following installed before running the tests:

- **Node.js** (v16 or later recommended)
- **Visual Studio**
- **npm or yarn**

## Installation

Clone the repository and install playwright dependencies:

- git clone git@github.com:auto-qa-hub/petstore_playwright.git 
- npm init playwright

## Playwright Installation

Ensure Playwright dependencies are installed:

- npx playwright install

## Running Tests

To execute tests, use the following commands:

### Run All Tests

- npx playwright test

### Run a Specific Test File

- npx playwright test tests/example.spec.js

### Run Tests in Headed Mode

- npx playwright test --headed

### Run Tests with UI Mode

- npx playwright test --ui

## Test Reporting

Generate and view test reports:

- npx playwright show-report

## Writing Tests

Playwright tests are located in the tests/ directory. Example structure:

**/tests**
- storeTests.spec.ts
- userTests.spec.ts
- petTests.spec.js

Refer to the Playwright documentation - https://playwright.dev/docs/intro for writing and structuring tests.

## CI Integration

To integrate Playwright with CI/CD pipelines, configure .github/workflows/playwright.yml or relevant CI scripts. More - https://playwright.dev/docs/ci-intro

## Troubleshooting

- Ensure all dependencies are installed (npm install)

- Verify Playwright browsers are installed (npx playwright install)

- Run tests in debug mode: npx playwright test --debug
