# Finance Research Agent (Tara)

## Overview

Finance Research Agent (Tara) is an AI-powered financial assistant built using Mastra, PostgreSQL, and Gemini. The system enables users to query personal financial data using natural language and receive accurate, database-backed responses.

The application ingests transaction, mutual fund, NAV history, and portfolio holding data into PostgreSQL and uses AI tools to perform financial analysis.

---

## Features

### Transaction Analysis

* Spending by category
* Transaction count by category
* Category-wise expenditure insights

### Merchant Analysis

* Merchant-specific spending analysis
* Transaction aggregation by merchant

### Portfolio Analysis

* Current portfolio valuation
* Holdings analysis

### Investment Performance

* Fund return calculation
* Best performing fund identification

### Spending Insights

* Top spending categories
* Top spending merchants

---

## Technology Stack

* TypeScript
* Mastra Framework
* PostgreSQL
* Google Gemini
* Node.js

---

## Database Schema

### transactions

| Column   | Type         |
| -------- | ------------ |
| id       | VARCHAR(50)  |
| date     | DATE         |
| merchant | TEXT         |
| category | VARCHAR(100) |
| amount   | DECIMAL      |
| currency | VARCHAR(10)  |
| memo     | TEXT         |

### funds

| Column   | Type         |
| -------- | ------------ |
| id       | VARCHAR(50)  |
| name     | TEXT         |
| category | VARCHAR(100) |

### fund_nav

| Column    | Type        |
| --------- | ----------- |
| id        | SERIAL      |
| fund_id   | VARCHAR(50) |
| nav_date  | DATE        |
| nav_value | DECIMAL     |

### holdings

| Column        | Type        |
| ------------- | ----------- |
| id            | SERIAL      |
| fund_id       | VARCHAR(50) |
| fund_name     | TEXT        |
| units         | DECIMAL     |
| purchase_date | DATE        |
| purchase_nav  | DECIMAL     |

---

## Available Tools

### transactionTool

Returns spending statistics for a transaction category.

Example:

* How much did I spend on food?

### merchantTool

Returns spending information for a merchant.

Example:

* How much did I spend at Apollo Pharmacy?

### portfolioTool

Calculates current portfolio value.

Example:

* What is my portfolio value?

### topSpendingTool

Returns highest spending categories and merchants.

Example:

* What are my top spending categories?

### fundReturnTool

Calculates investment returns using latest NAV values.

Example:

* Which fund performed best?

---

## Setup

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create `.env`

```env
DATABASE_URL=postgresql://postgres:<password>@localhost:5432/provue_tara

GOOGLE_API_KEY=<api_key>
GOOGLE_GENERATIVE_AI_API_KEY=<api_key>
```

### Start Application

```bash
npm run dev
```

Open:

http://localhost:4111

---

## Sample Queries

* How much did I spend on food?
* What is my portfolio value?
* Show my spending at Apollo.
* What are my top spending categories?
* Which fund performed best?

---

## Future Improvements

* Date range filtering
* Portfolio gain/loss tracking
* Monthly spending trends
* Budget monitoring
* Transaction search
* REST API endpoints
