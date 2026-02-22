const { pool } = require("../config/db");

exports.createCategory = async (typeId, name, createdby) => {
  const result = await pool.query(
    `INSERT INTO categories (typeid,name,createdby)
     VALUES ($1,$2,$3) RETURNING *`,
    [typeId, name, createdby]
  );
  return result.rows[0];
};

exports.getCategories = async (typeId) => {
  let query = `
    SELECT 
      c.id,
      c.name AS name,
      c.typeid,
      t.name AS type_name,
      c.createdby,
      c.isactive,
      c.created_at
    FROM categories c
    JOIN types t ON c.typeid = t.id
    WHERE c.isactive = true
  `;

  const values = [];

  if (typeId) {
    query += ` AND c.typeid = $1`;
    values.push(typeId);
  }

  const result = await pool.query(query, values);

  return result.rows;
};


