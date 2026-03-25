import { createClient } from "@libsql/client";
import "dotenv/config";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function main() {
  console.log("--- TABLES ---");
  const tables = await db.execute("SELECT name FROM sqlite_master WHERE type='table';");
  console.log(tables.rows);

  console.log("\n--- USERS ---");
  const users = await db.execute("SELECT * FROM users LIMIT 5;");
  console.log(users.rows);

  // Check if they have a different table for time saved
  if (tables.rows.some(r => r[0] === "time_saved")) {
    console.log("\n--- TIME SAVED ---");
    const ts = await db.execute("SELECT * FROM time_saved LIMIT 5;");
    console.log(ts.rows);
  }
}

main().catch(console.error);
