import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { pool } from "../db/postgres";

export const transactionTool = createTool({
  id: "transaction-tool",
  description:
    "Query transactions by category with optional date filtering",

  inputSchema: z.object({
    category: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),

  execute: async ({ category, startDate, endDate }) => {
    let query = `
      SELECT
        COUNT(*) as total_transactions,
        COALESCE(SUM(amount),0) as total_spent
      FROM transactions
      WHERE LOWER(category)=LOWER($1)
    `;

    const params: any[] = [category];

    if (startDate) {
      query += ` AND date >= $${params.length + 1}`;
      params.push(startDate);
    }

    if (endDate) {
      query += ` AND date <= $${params.length + 1}`;
      params.push(endDate);
    }

    const result = await pool.query(query, params);

    return result.rows[0];
  },
});