import { createTool } from "@mastra/core/tools";
import { pool } from "../db/postgres";

export const portfolioTool = createTool({
  id: "portfolio-tool",
  description: "Calculate current portfolio value",

  inputSchema: undefined,

  execute: async () => {
    const result = await pool.query(`
      SELECT
        SUM(h.units * fn.nav_value) AS portfolio_value
      FROM holdings h
      JOIN (
        SELECT DISTINCT ON (fund_id)
          fund_id,
          nav_value
        FROM fund_nav
        ORDER BY fund_id, nav_date DESC
      ) fn
      ON h.fund_id = fn.fund_id
    `);

    return result.rows[0];
  },
});