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
