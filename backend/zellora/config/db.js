require("dotenv").config();

const { Pool } = require("pg");
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("✅ PostgreSQL Connected");
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
  }
};

module.exports = { pool, connectDB };
