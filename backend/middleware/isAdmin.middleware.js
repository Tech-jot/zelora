const { Constants } = require("../helper/constants");

module.exports = (req, res, next) => {
  try {

    if (req.user.role !== Constants.ADMIN_ROLE) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authorization error",
    });
  }
};
