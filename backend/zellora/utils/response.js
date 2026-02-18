exports.sendResponse = (
  res,
  { status = 200, success = true, message = "Success", data = null },
) => {
  return res.status(status).json({
    success,
    message,
    data,
  });
};
