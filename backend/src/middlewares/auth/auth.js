const logger = require("../../common/logger");
const jwt = require("jsonwebtoken"),
  asyncHandler = require("express-async-handler"),
  DAL = require("../../common/dal"),
  User = require("../../resources/users/model"),
  RefreshToken = require("./model"),
  jwtGen = require("../../helpers/jwtGen"),
  UserDAL = DAL(User),
  RefreshDAL = DAL(RefreshToken);
const verifyRefreshToken = asyncHandler(async (refreshToken) => {
  if (!refreshToken) {
    return null;
  }
  try {
    const decoded = await jwt.verify(refreshToken, JWT_SECRET),
      user = await UserDAL.getOne({ id: decoded.id });
    if (!user) {
      throw new Error("No user");
    }
    const refreshExists = await RefreshDAL.getOne({ refreshToken });
    if (refreshExists) {
      return null;
    }
    const addedRefreshToken = await RefreshDAL.createOne({
      refreshToken,
      userId: user.id,
    });
    return user.id;
  } catch {
    return null;
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
        const userId = await verifyRefreshToken(req.headers["refreshtoken"]);
        if (!userId) {
          res.statusCode = 401;
          throw new Error("Invalid token");
        }
        const newRefreshToken = await jwtGen({ id: userId }),
          newAccessToken = await jwtGen({ id: userId });

        res.tokens = {
          accessToken: newAccessToken,
          refreshToken: newAccessToken,
        };
      }
    }
  } else {
    logger.info("not ");
    res.statusCode = 401;
    throw new Error("No access token");
  }
  // next();
});
