const Brand = require("../models/brand.model");
const { sendResponse } = require("../utils/response");

exports.createBrand = async (req, res) => {
  try {
    const { name, createdby } = req.body;
    const data = await Brand.createBrand(name, createdby);
    return sendResponse(res, {
      status: 200,
      success: true,
      message: "Brand Created Successfully",
      data,
    });
  } catch (err) {
    return sendResponse(res, {
      status: 500,
      success: false,
      message: err.message,
    });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, slug, description, is_featured, isactive } = req.body;

    // If image uploaded
    let logoPath = null;
    if (req.file) {
      logoPath = `/uploads/brands/${req.file.filename}`;
    }

    const updatedBrand = await Brand.updateBrand(id, {
      name,
      slug,
      description,
      image: logoPath,
      is_featured,
      isactive,
    });

    res.status(200).json({
      success: true,
      data: updatedBrand,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update brand",
    });
  }
};

exports.getBrands = async (req, res) => {
  const data = await Brand.getBrands();
  return sendResponse(res, {
    status: 200,
    success: true,
    message: "Brands found Successfully",
    data,
  });
};
