const logger = require("../../common/logger");
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  logger.info("Auth middleware".red);
  const token = req.headers.authorization.split(" ");
  logger.info(token);
};
