import { createTool } from "@mastra/core/tools";
import { pool } from "../db/postgres";

export const fundReturnTool = createTool({
  id: "fund-return-tool",
  description: "Calculate mutual fund returns",

  inputSchema: undefined,

  execute: async () => {
    const result = await pool.query(`
      SELECT
        h.fund_name,
        h.purchase_nav,
        latest.nav_value AS current_nav,
        ROUND(
          ((latest.nav_value - h.purchase_nav)
          / h.purchase_nav * 100)::numeric,
          2
        ) AS return_percent
      FROM holdings h
      JOIN (
        SELECT DISTINCT ON (fund_id)
          fund_id,
          nav_value
        FROM fund_nav
        ORDER BY fund_id, nav_date DESC
      ) latest
      ON latest.fund_id = h.fund_id
      ORDER BY return_percent DESC
      LIMIT 5
    `);

    return result.rows;
  },
});