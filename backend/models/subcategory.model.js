const { pool } = require("../config/db");

exports.createSubcategory = async (categoryId, name, createdby) => {
  const result = await pool.query(
    `INSERT INTO subcategories (categoryid,name,createdby)
     VALUES ($1,$2,$3) RETURNING *`,
    [categoryId, name, createdby],
  );
  return result.rows[0];
};

exports.getSubcategories = async () => {
  const result = await pool.query(`
    SELECT 
      c.id,
      c.name AS name,
      c.categoryid,
      t.name AS category_name,
      c.createdby,
      c.isactive,
      c.created_at
    FROM subcategories c
    JOIN categories t ON c.categoryid   = t.id
    WHERE c.isactive = true
  `);

  // const result = await pool.query(
  //   "SELECT * FROM subcategories WHERE isactive=true"
  // );
  return result.rows;
};
