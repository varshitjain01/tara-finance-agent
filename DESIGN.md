# DESIGN DOCUMENT

## System Overview

The objective of this project is to build a finance research agent capable of answering natural language financial questions using structured financial data.

The solution uses PostgreSQL as the source of truth and Mastra as the AI orchestration framework.

The architecture ensures that responses are generated from database queries rather than model assumptions.

---

## Architecture

User Query

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
* Select appropriate tool
* Execute tool
* Present result

The agent is explicitly instructed not to fabricate financial information and to rely on tools for financial calculations.

---

## Tool Design

### transactionTool

Purpose:

* Category spending analysis

Returns:

* Transaction count
* Total spending

---

### merchantTool

Purpose:

* Merchant-specific spending analysis

Returns:

* Transaction count
* Total merchant spend

---

### portfolioTool

Purpose:

* Portfolio valuation

Method:

* Uses latest NAV value for each holding
* Multiplies NAV by units held

---

### topSpendingTool

Purpose:

* Spending insights

Returns:

* Top spending categories
* Top spending merchants

---

### fundReturnTool

Purpose:

* Investment performance analysis

Method:

* Compares purchase NAV with latest NAV
* Calculates percentage return

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

### Deferred

* Caching
* Advanced analytics
* Multi-user support
* Authentication
* Historical portfolio snapshots

---

## Future Enhancements

* Date range filtering
* Portfolio gain/loss reports
* Monthly spending dashboards
* REST API integration
* Deployment monitoring
* Scheduled financial insights
