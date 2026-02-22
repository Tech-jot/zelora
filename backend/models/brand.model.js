const { pool } = require("../config/db");

exports.createBrand = async (name, createdby) => {
  const result = await pool.query(
    `INSERT INTO brands (name, createdby)
     VALUES ($1,$2) RETURNING *`,
    [name, createdby]
  );
  return result.rows[0];
};

exports.updateBrand = async (id, data) => {
  const {
    name,
    slug,
    description,
    image,
    is_featured,
    isactive,
  } = data;

  const result = await pool.query(
    `
    UPDATE brands
    SET 
      name = $1,
      slug = $2,
      description = $3,
      image = $4,
      is_featured = $5,
      isactive = $6,
      updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
    RETURNING *;
    `,
    [name, slug, description, image, is_featured, isactive, id]
  );

  return result.rows[0];
};

exports.getBrands = async () => {
  const result = await pool.query(
    "SELECT * FROM brands WHERE isactive=true ORDER BY id DESC"
  );
  return result.rows;
};

