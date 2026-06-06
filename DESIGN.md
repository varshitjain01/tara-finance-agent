# DESIGN DOCUMENT

## System Overview

The objective of this project is to build a finance research agent capable of answering natural language financial questions using structured financial data.

The solution uses PostgreSQL (Neon) as the source of truth, Mastra as the AI orchestration framework, and Groq as the language model provider.

The architecture ensures that responses are generated from database queries rather than model assumptions.

---

## Architecture

User Query

↓

REST API (/ask)

↓

Tara Agent

↓

Tool Selection

↓

PostgreSQL Query

↓

Tool Result

↓

Natural Language Response

---

## Design Decisions

### PostgreSQL as Source of Truth

Financial data should not be queried directly from JSON files.

All datasets are ingested into PostgreSQL to provide:

* Efficient querying
* Data normalization
* Scalability
* Consistent access patterns

---

### Data Modeling

Transactions, funds, NAV history, and holdings were modeled separately.

Fund NAV history was normalized into its own table to support time-series analysis and return calculations.

---

## Agent Design

The Tara agent acts as the orchestration layer.

Responsibilities:

* Understand user intent
* Select the appropriate tool
* Execute the tool
* Present the result

The agent is explicitly instructed not to fabricate financial information and to rely on tools for financial calculations.

The agent is also restricted to financial queries and politely rejects out-of-scope requests such as programming, weather, and general knowledge questions.

---

## Tool Design

### transactionTool

Purpose:

* Category spending analysis
* Date-filtered spending analysis

Returns:

* Transaction count
* Total spending

---

### merchantTool

Purpose:

* Merchant-specific spending analysis

Returns:

* Transaction count
* Total merchant spending

---

### portfolioTool

Purpose:

* Portfolio valuation

Method:

* Retrieves the latest NAV for each fund
* Multiplies NAV by units held
* Aggregates portfolio value

---

### topSpendingTool

Purpose:

* Spending insights

Returns:

* Top spending categories
* Highest spending areas

---

### fundReturnTool

Purpose:

* Investment performance analysis

Method:

* Compares purchase NAV with latest NAV
* Calculates percentage return

---

### totalSpendingTool

Purpose:

* Overall spending analysis

Supports:

* Transfer exclusion
* Total spending calculations

---

## Data Ingestion Strategy

The ingestion process loads:

1. Transactions
2. Funds
3. NAV history
4. Holdings

Data is inserted into PostgreSQL using parameterized queries.

Duplicate records are prevented using primary keys and conflict handling.

---

## Error Handling

Implemented safeguards include:

* Input validation using Zod
* Database connection validation
* Environment variable management
* SQL parameterization
* Out-of-scope query handling

---

## Evaluation Strategy

An evaluation suite was implemented in eval.ts.

The suite validates:

* Portfolio valuation
* Category spending
* Merchant spending
* Fund performance
* Date-based filtering
* Transfer exclusion
* Top spending categories

The final evaluation successfully passed all test cases.

---

## Deployment

The application is deployed on Render.

The PostgreSQL database is hosted on Neon and acts as the source of truth for all financial data.

The service is exposed through a REST API endpoint and can be queried using HTTP requests.

---

## Assumptions

* NAV records are ordered chronologically.
* Latest NAV represents current market value.
* Transaction amounts are stored in INR.
* Data integrity is maintained during ingestion.

---

## Trade-Offs

### Chosen

* Simple relational schema
* Tool-specific SQL queries
* Fast implementation
* Lightweight evaluation framework

### Deferred

* Caching
* Advanced analytics
* Multi-user support
* Authentication
* Historical portfolio snapshots

---

## Future Enhancements

* Portfolio gain/loss reporting
* Monthly spending dashboards
* Budget tracking and alerts
* Scheduled financial summaries
* Advanced investment analytics
* Monitoring and observability dashboards
