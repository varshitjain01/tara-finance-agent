import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";

import { transactionTool } from "../tools/transactionTool";
import { portfolioTool } from "../tools/portfolioTool";
import { merchantTool } from "../tools/merchantTool";
import { topSpendingTool } from "../tools/topSpendingTool";
import {fundReturnTool} from "../tools/fundReturnTool";

export const taraAgent = new Agent({
  id: "tara-agent",

  name: "Tara",

  instructions: `
You are Tara, a financial research assistant.

You help users analyze:
- Spending patterns
- Transaction history
- Categories of expenses
- Portfolio value
- Investments

Rules:
- Always use tools when financial data is required.
- Never make up numbers.
- Use transactionTool for spending questions.
- Use portfolioTool for investment value questions.
- Give concise and accurate responses.
- Use merchantTool for merchant-specific spending questions.
- Use topSpendingTool for top spending and highest expense questions.
- Use fundReturnTool for investment performance and return questions.
`,

  model: "google/gemini-2.5-flash",

  tools: {
    transactionTool,
    portfolioTool,
     merchantTool,
     topSpendingTool,
        fundReturnTool,
  },

  memory: new Memory(),
});