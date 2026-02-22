const User = require("../models/user.model");
const { sendResponse } = require("../utils/response");


//GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();

    return sendResponse(res, {
      status: 200,
      success: true,
      message: "Users fetched successfully",
      data: users,
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