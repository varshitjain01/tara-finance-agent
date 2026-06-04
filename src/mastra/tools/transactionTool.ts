import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { pool } from "../db/postgres";

export const transactionTool = createTool({
  id: "transaction-tool",
  description: "Query transactions by category",

  inputSchema: z.object({
    category: z.string(),
  }),

  execute: async ({ category }) => {
    const result = await pool.query(
      `
      SELECT
        COUNT(*) as total_transactions,
        COALESCE(SUM(amount),0) as total_spent
      FROM transactions
      WHERE LOWER(category)=LOWER($1)
      `,
      [category]
    );

    return result.rows[0];
  },
});