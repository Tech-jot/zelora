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
