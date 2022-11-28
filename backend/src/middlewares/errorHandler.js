module.exports = (err, req, res, next) => {
  let status = res.statusCode || 500,
    errorMessage = err.message || "Unknown server error";
  res.status(status).json({
    error: errorMessage,
  });
};
