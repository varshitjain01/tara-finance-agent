import fs from "fs";
import path from "path";
import { pool } from "../db/postgres";

async function ingest() {
  try {
    // Use sample_a by default if DATA_DIR is not provided
    const dataDir =
      process.env.DATA_DIR ||
      path.join(process.cwd(), "data", "sample_a");

    console.log(`Loading data from: ${dataDir}`);

    const transactions = JSON.parse(
      fs.readFileSync(
        path.join(dataDir, "transactions.json"),
        "utf8"
      )
    );

    const funds = JSON.parse(
      fs.readFileSync(
        path.join(dataDir, "funds.json"),
        "utf8"
      )
    );

    const holdings = JSON.parse(
      fs.readFileSync(
        path.join(dataDir, "holdings.json"),
        "utf8"
      )
    );

    console.log("Loading transactions...");

    for (const txn of transactions) {
      await pool.query(
        `
        INSERT INTO transactions
        (id,date,merchant,category,amount,currency,memo)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        ON CONFLICT (id) DO NOTHING
        `,
        [
          txn.id,
          txn.date,
          txn.merchant,
          txn.category,
          txn.amount,
          txn.currency,
          txn.memo,
        ]
      );
    }

    console.log("Loading funds...");

    for (const fund of funds) {
      await pool.query(
        `
        INSERT INTO funds (id,name,category)
        VALUES ($1,$2,$3)
        ON CONFLICT (id) DO NOTHING
        `,
        [fund.id, fund.name, fund.category]
      );

      for (const nav of fund.nav) {
        await pool.query(
          `
          INSERT INTO fund_nav
          (fund_id, nav_date, nav_value)
          VALUES ($1,$2,$3)
          `,
          [fund.id, nav.date, nav.value]
        );
      }
    }

    console.log("Loading holdings...");

    for (const holding of holdings) {
      await pool.query(
        `
        INSERT INTO holdings
        (fund_id,fund_name,units,purchase_date,purchase_nav)
        VALUES ($1,$2,$3,$4,$5)
        `,
        [
          holding.fund_id,
          holding.fund_name,
          holding.units,
          holding.purchase_date,
          holding.purchase_nav,
        ]
      );
    }

    console.log("Data loaded successfully!");
  } catch (error) {
    console.error("Ingestion failed:", error);
  } finally {
    await pool.end();
  }
}

ingest();