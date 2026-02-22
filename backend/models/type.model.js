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

exports.getTypesCategories = async () => {
  const result = await pool.query(`
    SELECT 
      t.id AS type_id,
      t.name AS type_name,
      c.id AS category_id,
      c.name AS category_name
    FROM types t
    LEFT JOIN categories c 
    ON c.typeid = t.id AND c.isactive = true
    WHERE t.isactive = true
    ORDER BY t.id, c.id
  `);

  const rows = result.rows;

  //Group data: type → categories
  const map = {};

  rows.forEach((row) => {
    if (!map[row.type_id]) {
      map[row.type_id] = {
        id: row.type_id,
        name: row.type_name,
        categories: [],
      };
    }

    if (row.category_id) {
      map[row.type_id].categories.push({
        id: row.category_id,
        name: row.category_name,
      });
    }
  });

  return Object.values(map);
};
