# QA Automation Portfolio

QA automation portfolio using Playwright, TypeScript, and CI.

## Goals

- Learn Playwright with TypeScript
- Practice E2E test design and automation
- Run automated tests in CI
- Build a portfolio for QA / SET roles

## Environment

- Node.js 24 LTS
- npm
- TypeScript
- Playwright Test

## Setup

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Run tests

Run all tests:

```bash
npx playwright test
```

Run the first E2E test:

```bash
npx playwright test tests/my-first.spec.ts
```

Open the HTML report:

```bash
npx playwright show-report
```