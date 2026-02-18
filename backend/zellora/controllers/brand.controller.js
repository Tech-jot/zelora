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

exports.getBrands = async (req, res) => {
  const data = await Brand.getBrands();
  return sendResponse(res, {
    status: 200,
    success: true,
    message: "Brands found Successfully",
    data,
  });
};
