# Finance Research Agent (Tara)

## Overview

Finance Research Agent (Tara) is an AI-powered financial assistant built using Mastra, PostgreSQL (Neon), and Groq.

The system enables users to query financial data using natural language and receive accurate, database-backed responses.

The application ingests transaction, mutual fund, NAV history, and portfolio holding data into PostgreSQL and uses AI-powered tools to perform financial analysis.

---

## Features

### Transaction Analysis

* Spending by category
* Transaction count by category
* Date-based spending analysis

### Merchant Analysis

* Merchant-specific spending analysis
* Transaction aggregation by merchant

### Portfolio Analysis

* Current portfolio valuation
* Holdings analysis

### Investment Performance

* Fund return calculation
* Best-performing fund identification

### Spending Insights

* Top spending categories
* Transfer exclusion support
* Total spending analysis

---

## Technology Stack

* TypeScript
* Mastra Framework
* PostgreSQL (Neon)
* Groq (Llama 3.3 70B Versatile)
* Node.js
* Render

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

Returns highest spending categories.

Example:

* What are my top spending categories?

### fundReturnTool

Calculates investment returns using latest NAV values.

Example:

* Which fund performed best?

### totalSpendingTool

Calculates overall spending and supports transfer exclusion.

Example:

* Ignore transfers. What was my total spending?

---

## Setup

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create a `.env` file:

```env
DATABASE_URL=<your_neon_connection_string>
GROQ_API_KEY=<your_groq_api_key>
```

### Load Data

```bash
npm run ingest
```

### Run API Server

```bash
npm run server
```

Server:

```text
http://localhost:3000
```

API Endpoint:

```text
POST /ask
```

### Run Evaluation

```bash
npm run eval
```

---

## Deployment

Render URL:

https://tara-finance-agent-ky81.onrender.com

---

## Sample Queries

* How much did I spend on food?
* What is my portfolio value?
* Show my spending at Apollo.
* What are my top spending categories?
* Which fund performed best?
* Ignore transfers. What was my total spending?

---

## Future Improvements

* Portfolio gain/loss reporting
* Monthly spending dashboards
* Budget tracking and alerts
* Scheduled financial summaries
* Advanced investment analytics
* Monitoring and observability dashboards
