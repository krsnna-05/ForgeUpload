import { Pool } from "pg";

const connectDB = async (): Promise<Pool> => {
  const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "forgeuser",
    password: "forgepass",
    database: "forgeupload",
  });

  return pool;
};

export default connectDB;
