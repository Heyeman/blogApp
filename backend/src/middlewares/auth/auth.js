const logger = require("../../common/logger");
const jwt = require("jsonwebtoken"),
  asyncHandler = require("express-async-handler"),
  DAL = require("../../common/dal"),
  User = require("../../resources/users/model"),
  RefreshToken = require("./model"),
  UserDAL = DAL(User),
  RefreshDAL = DAL(RefreshToken);
const verifyRefreshToken = asyncHandler(async (refreshToken) => {
  if (!refreshToken) {
    return false;
  }
  try {
    const decoded = await jwt.verify(refreshToken, JWT_SECRET),
      user = await UserDAL.getOne({ id: decoded.id });
    if (!user) {
      throw new Error("No user");
    }
    const refreshExists = await RefreshDAL.getOne({ refreshToken });
    if (refreshExists) {
      return false;
    }
    const addedRefreshToken = await RefreshDAL.createOne({
      refreshToken,
      userId: user.id,
    });
    return true;
  } catch {
    return false;
  }
});

module.exports = asyncHandler(async (req, res, next) => {
  logger.info("Auth middleware".red);
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader && bearerHeader.startsWith("Bearer")) {
    const token = bearerHeader.toString().split(" ")[1];
    //tries to decode the accesstoken
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      // logger.info("here");
      // logger.info("finding", decoded);
      const user = await UserDAL.getOne({ id: decoded.id });
      if (!user) {
        res.statusCode = 401;
        throw new Error("User not found");
      }
      req.userId = user.id;
      next();
      // logger.info(user.email);
      // logger.info("last".red);
    } catch (error) {
      if (error.message == "jwt expired") {
        logger.info("expired token".red);
        const validRefreshToken = await verifyRefreshToken(req.headers["refreshtoken"]);
        if (!validRefreshToken) {
          res.statusCode = 401;
          throw new Error('Invalid token');
        }

      }
      // logger.error(error.message);
    }
  } else {
    logger.info("not ");
    res.statusCode = 401;
    throw new Error("No access token");
  }
  // next();
});
