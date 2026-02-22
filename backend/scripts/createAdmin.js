require("dotenv").config();
const { createAdmin } = require("../utils/createAdmin"); // adjust path
const db = require("../config/db"); // if you have DB connection

async function run() {
  try {
    await createAdmin();
    console.log("✅ Admin created successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
}

run();
