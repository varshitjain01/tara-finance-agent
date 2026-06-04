import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { pool } from "../db/postgres";

export const merchantTool = createTool({
  id: "merchant-tool",
  description: "Get spending information for a merchant",

  inputSchema: z.object({
    merchant: z.string(),
  }),

  execute: async ({ merchant }) => {
    const result = await pool.query(
      `
      SELECT
        COUNT(*) as transactions,
        COALESCE(SUM(amount),0) as total_spent
      FROM transactions
      WHERE LOWER(merchant) LIKE LOWER($1)
      `,
      [`%${merchant}%`]
    );

    return result.rows[0];
  },
});