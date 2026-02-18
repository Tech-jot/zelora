const Type = require("../models/type.model");
const { sendResponse } = require("../utils/response");

exports.createType = async (req, res) => {
  try {
    const { name, createdby } = req.body;
    const data = await Type.createType(name, createdby);
    return sendResponse(res, {
      status: 200,
      success: true,
      message: "Type Created Successfully",
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

exports.getTypes = async (req, res) => {
  const data = await Type.getTypes();
  return sendResponse(res, {
    status: 200,
    success: true,
    message: "Types found Successfully",
    data,
  });
};
