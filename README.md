# 🚀 SuperTest API Testing Masterclass Framework

[![SuperTest API Tests](https://github.com/MYCodeYatra/mcyt-api-supertest/actions/workflows/test.yml/badge.svg)](https://github.com/MYCodeYatra/mcyt-api-supertest/actions/workflows/test.yml)
[![Node.js Support](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![SuperTest](https://img.shields.io/badge/SuperTest-latest-blue.svg)](https://github.com/ladjs/supertest)
[![Jest](https://img.shields.io/badge/Jest-latest-red.svg)](https://jestjs.io/)

This is the official companion repository for the **MyCodeYatra SuperTest API Testing Blog Series**. It contains a production-grade, fully functional test automation framework demonstrating everything from basic HTTP assertions to advanced concepts like GraphQL, WebSockets, Chaos Engineering, and CI/CD pipelines.

---

## 🛠️ Technology Stack

This framework leverages modern, enterprise-ready testing tools in the Node.js ecosystem:
- **Core Language:** TypeScript
- **HTTP Client/Assertion:** SuperTest
- **Test Runner:** Jest
- **Data Generation:** Faker.js
- **CI/CD:** GitHub Actions

---

## 📚 The Blog Series

This repository maps directly to the concepts taught in our comprehensive 16-part blog series on [MyCodeYatra](https://mycodeyatra.com).

| # | Topic / Article Title | Status |
|---|----------------------|--------|
| 1 | Introduction to API Testing & SuperTest | ✅ Completed |
| 2 | Setting Up SuperTest with Jest | ✅ Completed |
| 3 | Writing Your First GET/POST Test | ✅ Completed |
| 4 | Testing Query Parameters and Path Variables | ✅ Completed |
| 5 | Validating JSON Responses and Status Codes | ✅ Completed |
| 6 | Complex Assertions and Jest Matchers | ✅ Completed |
| 7 | Handling API Authentication (JWT & OAuth) | ✅ Completed |
| 8 | Testing File Uploads (multipart/form-data) | ✅ Completed |
| 9 | GraphQL Testing with SuperTest | ✅ Completed |
| 10 | WebSockets and Asynchronous APIs | ✅ Completed |
| 11 | Data-Driven Testing (Faker.js) | ✅ Completed |
| 12 | Chaos Engineering (Simulating Network Failures) | ✅ Completed |
| 13 | Mocking Axios / Fetch Requests | ✅ Completed |
| 14 | Generating Test Coverage Reports | ✅ Completed |
| 15 | Configuring CI/CD for Jest/SuperTest (GitHub Actions) | ✅ Completed |
| 16 | Best Practices & Folder Architecture | ✅ Completed |

---

## 🚀 How to Run Locally

### 1. Pre-requisites
- **Node.js:** Version 18 or higher.
- **npm:** Installed automatically with Node.js.

### 2. Execution

To execute the entire Jest suite, run:
```bash
npm install
npm test
```

### 3. Generating Test Coverage
The framework generates an Istanbul test coverage report. Run the following command:
```bash
npm test -- --coverage
```

---

## 🏗️ Framework Architecture & Test Details

- `src/` - Contains the Express API mock server and routes used for testing.
- `tests/` - Contains the actual test files categorized by topic:
  - `crud.test.ts` - Testing standard REST API operations.
  - `auth.test.ts` - Handling JWT Bearer tokens and login flows.
  - `files.test.ts` - Testing multipart/form-data and file uploads.
  - `graphql.test.ts` - Sending and asserting GraphQL queries and mutations.
  - `websocket.test.ts` - End-to-end WebSocket connection testing.
  - `chaos.test.ts` - Injecting latency and verifying system resilience.
  - `mocking.test.ts` - Overriding external network dependencies.
  - `coverage.test.ts` - Enforcing line and branch coverage limits.
- `jest.config.js` - Jest compiler rules and timeout boundaries.
- `.github/workflows/` - CI/CD pipeline definitions for GitHub Actions.

---

**Developed with ❤️ by the MyCodeYatra Team.**
