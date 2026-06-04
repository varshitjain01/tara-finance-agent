import { pool } from "../db/postgres";

async function test() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log(result.rows);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
  }
}

test();