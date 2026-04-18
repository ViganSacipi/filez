import "dotenv/config";
import pkg from "pg";
const { Client } = pkg;

const db = new Client({
    connectionString: process.env.DATABASE_URL,
});

export default db;