import { createTool } from "@mastra/core/tools";
import { pool } from "../db/postgres";

export const topSpendingTool = createTool({
  id: "top-spending-tool",
  description: "Find top spending categories and merchants",

  inputSchema: undefined,

  execute: async () => {
    const categoryResult = await pool.query(`
      SELECT category, SUM(amount) as total
      FROM transactions
      GROUP BY category
      ORDER BY total DESC
      LIMIT 5
    `);

    const merchantResult = await pool.query(`
      SELECT merchant, SUM(amount) as total
      FROM transactions
      GROUP BY merchant
      ORDER BY total DESC
      LIMIT 5
    `);

    return {
      topCategories: categoryResult.rows,
      topMerchants: merchantResult.rows,
    };
  },
});