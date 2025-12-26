// src/db/index.ts
import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "forgeuser",
  password: "forgepass",
  database: "forgeupload",
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL error", err);
  process.exit(1);
});

export default pool;
