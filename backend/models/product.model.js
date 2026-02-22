const {pool} = require("../config/db");

exports.createProduct = async (product, variants) => {
//   const client = await pool.connect();

  try {
    await pool.query("BEGIN");
   
    const productRes = await pool.query(
      `INSERT INTO products (name, description, brandid, subcategoryid)
       VALUES ($1,$2,$3,$4)
       RETURNING id`,
      [
        product.name,
        product.description,
        product.brandid,
        product.subcategoryid,
      ]
    );

    const productId = productRes.rows[0].id;

 
    for (const v of variants) {
      const variantRes = await pool.query(
        `INSERT INTO product_variants
        (product_id, shade, color, size, quantity, unit, price, discount, stock, sku)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING id`,
        [
          productId,
          v.shade || null,
          v.color || null,
          v.size || null,
          v.quantity || null,
          v.unit || null,
          v.price,
          v.discount || 0,
          v.stock || 0,
          v.sku,
        ]
      );

      const variantId = variantRes.rows[0].id;

      // 3 Insert images
      if (v.images?.length) {
        for (const img of v.images) {
          await pool.query(
            `INSERT INTO variant_images
            (variant_id, image_url, is_primary)
            VALUES ($1,$2,$3)`,
            [variantId, img.url, img.is_primary || false]
          );
        }
      }
    }

    await pool.query("COMMIT");
    return { success: true };

  } catch (err) {
    await pool.query("ROLLBACK");
    throw err;
  }
};



//  GET ALL PRODUCTS
exports.getAllProducts = async () => {
  const result = await pool.query(`
    SELECT 
      p.id AS product_id,
      p.name,
      p.description,

      v.id AS variant_id,
      v.price,
      v.discount,
      v.stock,
      v.shade,
      v.color,
      v.size,

      i.id AS image_id,
      i.image_url,
      i.is_primary

    FROM products p
    LEFT JOIN product_variants v ON p.id = v.product_id
    LEFT JOIN variant_images i ON v.id = i.variant_id
    ORDER BY p.id DESC
  `);

  return result.rows;
};



// GET PRODUCTS WITH FILTERS
exports.getProducts = async (req) => {
  const {
    brandId,
    subcategoryId,
    isActive,
    search,
    page = 1,
    limit = 10,
  } = req.query;

  const offset = (page - 1) * limit;

  let conditions = [];
  let values = [];
  let index = 1;

  // Dynamic Filters
  if (brandId) {
    conditions.push(`p.brand_id = $${index++}`);
    values.push(brandId);
  }

  if (subcategoryId) {
    conditions.push(`p.subcategory_id = $${index++}`);
    values.push(subcategoryId);
  }

  if (isActive !== undefined) {
    conditions.push(`p.is_active = $${index++}`);
    values.push(isActive);
  }

  if (search) {
    conditions.push(`LOWER(p.name) LIKE LOWER($${index++})`);
    values.push(`%${search}%`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const query = `
    SELECT 
      p.id AS product_id,
      p.name,
      p.description,
      p.brand_id,
      p.subcategory_id,
      p.is_active,

      v.id AS variant_id,
      v.price,
      v.discount,
      v.stock,
      v.shade,
      v.color,
      v.size,

      i.id AS image_id,
      i.image_url,
      i.is_primary

    FROM products p
    LEFT JOIN product_variants v ON p.id = v.product_id
    LEFT JOIN variant_images i ON v.id = i.variant_id
    ${whereClause}
    ORDER BY p.id DESC
    LIMIT $${index++} OFFSET $${index}
  `;

  values.push(limit);
  values.push(offset);

  const result = await pool.query(query, values);

  // Total count for pagination
  const countQuery = `
    SELECT COUNT(*) 
    FROM products p
    ${whereClause}
  `;

  const countResult = await pool.query(countQuery, values.slice(0, -2));

  return {
    data: result.rows,
    total: parseInt(countResult.rows[0].count),
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(countResult.rows[0].count / limit),
  };
};
