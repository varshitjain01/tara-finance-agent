import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { pool } from "../db/postgres";

export const totalSpendingTool = createTool({
  id: "total-spending-tool",
  description: "Calculate total spending with optional transfer exclusion",

  inputSchema: z.object({
    excludeTransfers: z.boolean().optional(),
  }),

  execute: async ({ excludeTransfers }) => {
    let query = `
      SELECT COALESCE(SUM(amount),0) as total_spending
      FROM transactions
      WHERE amount > 0
    `;

    if (excludeTransfers) {
      query += `
        AND LOWER(category) <> 'transfer'
      `;
    }

    const result = await pool.query(query);

    return result.rows[0];
  },
});