const Category = require("../models/category.model");
const { sendResponse } = require("../utils/response");

exports.createCategory = async (req, res) => {
  try {
    const { typeId, name, createdby } = req.body;
    const data = await Category.createCategory(typeId, name, createdby);
    return sendResponse(res, {
      status: 200,
      success: true,
      message: "Category Created Successfully",
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

exports.getCategories = async (req, res) => {
  try {
    const { typeId } = req.query;  

    const data = await Category.getCategories(typeId);

    return sendResponse(res, {
      status: 200,
      success: true,
      message: "Categories fetched successfully",
      data,
    });

  } catch (error) {
    console.error(error);
    return sendResponse(res, {
      status: 500,
      success: false,
      message: "Something went wrong",
    });
  }
};

