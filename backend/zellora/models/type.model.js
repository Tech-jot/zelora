const { pool } = require("../config/db");

exports.createType = async (name, createdby) => {
  const result = await pool.query(
    `INSERT INTO types (name, createdby)
     VALUES ($1,$2) RETURNING *`,
    [name, createdby]
  );
  return result.rows[0];
};

exports.getTypes = async () => {
  const result = await pool.query(
    "SELECT * FROM types WHERE isactive=true ORDER BY id DESC"
  );
  return result.rows;
};
