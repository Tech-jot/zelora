const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { sendResponse } = require("../utils/response");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findByEmail(email);

    if (existing) {
      return sendResponse(res, {
        status: 400,
        success: false,
        message: "Email already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.createUser(name, email, hashed);

    return sendResponse(res, {
      message: "User created",
      data: user,
    });
  } catch (err) {
    return sendResponse(res, {
      status: 500,
      success: false,
      message: err.message,
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return sendResponse(res, {
        status: 400,
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return sendResponse(res, {
      message: "Login success",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    return sendResponse(res, {
      status: 500,
      success: false,
      message: err.message,
    });
  }
};
