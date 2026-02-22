const { pool } = require("../config/db");

exports.findByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

exports.createUser = async (name, email, password) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",
    [name, email, password]
  );
  return result.rows[0];
};


exports.getAllUsers = async () => {
  const result = await pool.query(
    "SELECT * FROM users ORDER BY id DESC"
  );
  return result.rows;
};
