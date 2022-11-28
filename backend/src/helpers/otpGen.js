const { json } = require("express");
const jwt = require("jsonwebtoken");

module.exports = async (id, isRefreshToken = false) => {
  return await jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: isRefreshToken ? "1M" : "4h",
  });
};
