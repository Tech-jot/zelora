require("dotenv").config();
const bcrypt = require("bcryptjs");
const { pool } = require("../config/db");

const createAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.log("⚠️ Admin credentials missing in .env");
      return;
    }

    // check if exists
    const existing = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existing.rows.length > 0) {
      console.log("✅ Admin already exists");
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    // FIXED QUERY
    await pool.query(
      `INSERT INTO users 
       (firstname, lastname, email, password, role)
       VALUES ($1,$2,$3,$4,$5)`,
      ["Admin", "User", email, hashed, 1]
    );

    console.log("🔥 Admin created successfully");

  } catch (err) {
    console.error("❌ Admin Seeder Error:", err.message);
  }
};

module.exports = createAdmin;
