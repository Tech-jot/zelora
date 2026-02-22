const Subcategory = require("../models/subcategory.model");
const { sendResponse } = require("../utils/response");

exports.createSubcategory = async (req, res) => {
  try {
    const { categoryId, name, createdby } = req.body;
    const data = await Subcategory.createSubcategory(
      categoryId,
      name,
      createdby,
    );
    return sendResponse(res, {
      status: 200,
      success: true,
      message: "Subcategory Created Successfully",
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

exports.getSubcategories = async (req, res) => {
  const data = await Subcategory.getSubcategories();
  return sendResponse(res, {
    status: 200,
    success: true,
    message: "Sub Category found Successfully",
    data,
  });
};
