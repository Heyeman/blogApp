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
  // logger.info("verifying");
  if (!refreshToken) {
    // logger.info("no token provided");
    return null;
  } else {
    // logger.info("refresh there");
  }
  try {
    // logger.info("trying");
    const decoded = await jwt.verify(refreshToken, process.env.JWT_SECRET);
    // logger.info("finding user");

    const user = await UserDAL.getOne({ id: decoded.id });
    if (!user) {
      // logger.info("no user");
      throw new Error("No user");
    }
    // logger.info("user is theres");
    const refreshExists = await RefreshDAL.getOne({ refreshToken });
    if (refreshExists) {
      // logger.info("existing refresh token");
      return null;
    }
    const addedRefreshToken = await RefreshDAL.createOne({
      refreshToken,
      userId: user.id,
    });
    return user.id;
  } catch (error) {
    // logger.info("caught" + error.message);

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
        // logger.info("Expired");
        const userId = await verifyRefreshToken(req.headers["refreshtoken"]);
        if (!userId) {
          res.statusCode = 401;
          throw new Error("Invalid token");
        }
        const newRefreshToken = await jwtGen({ id: userId }, true),
          newAccessToken = await jwtGen({ id: userId });

        res.tokens = {
          accessToken: newAccessToken,
          refreshToken: newAccessToken,
        };
        next();
      }
    }
  } else {
    res.statusCode = 401;
    throw new Error("No access token");
  }
});
