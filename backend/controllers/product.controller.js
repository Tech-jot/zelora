const Product = require("../models/product.model");


// ➕ ADD PRODUCT
exports.addProduct = async (req, res) => {
  try {
    const { product, variants } = req.body;

    await Product.createProduct(product, variants);

    res.json({
      success: true,
      message: "Product created successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error creating product",
    });
  }
};



// 📦 GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const data = await Product.getAllProducts();

    // 🔥 Group data (product → variants → images)
    const map = {};

    data.forEach(row => {
      if (!map[row.product_id]) {
        map[row.product_id] = {
          id: row.product_id,
          name: row.name,
          description: row.description,
          variants: {},
        };
      }

      if (row.variant_id) {
        if (!map[row.product_id].variants[row.variant_id]) {
          map[row.product_id].variants[row.variant_id] = {
            id: row.variant_id,
            price: row.price,
            discount: row.discount,
            stock: row.stock,
            shade: row.shade,
            color: row.color,
            size: row.size,
            images: [],
          };
        }

        if (row.image_id) {
          map[row.product_id].variants[row.variant_id].images.push({
            id: row.image_id,
            url: row.image_url,
            is_primary: row.is_primary,
          });
        }
      }
    });

    res.json({
      success: true,
      data: Object.values(map).map(p => ({
        ...p,
        variants: Object.values(p.variants),
      })),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
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
