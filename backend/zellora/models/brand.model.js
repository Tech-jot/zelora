const { pool } = require("../config/db");

exports.createBrand = async (name, createdby) => {
  const result = await pool.query(
    `INSERT INTO brands (name, createdby)
     VALUES ($1,$2) RETURNING *`,
    [name, createdby]
  );
  return result.rows[0];
};

exports.getBrands = async () => {
  const result = await pool.query(
    "SELECT * FROM brands WHERE isactive=true ORDER BY id DESC"
  );
  return result.rows;
};
