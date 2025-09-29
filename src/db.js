import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
console.log("Senha lida do .env:", process.env.PGPASSWORD);

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

export { pool };
