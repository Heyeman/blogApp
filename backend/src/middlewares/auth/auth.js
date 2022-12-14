const express = require("express"),
  logger = require("../../common/logger"),
  jwt = require("jsonwebtoken"),
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
  // logger.info("Auth middleware".red);
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader && bearerHeader.startsWith("Bearer")) {
    const token = bearerHeader.toString().split(" ")[1];
    //tries to decode the accesstoken
    try {
      // logger.info("decoding");
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      // logger.info("here");
      // logger.info("finding", decoded);
      const user = await UserDAL.getOne({ _id: decoded.id });
      if (!user) {
        res.statusCode = 401;
        throw new Error("User not found");
      }
      // logger.info("user is found");
      req.userId = user.id;
      // logger.info("user is ".red + user.id);

      next();
      // logger.info(user.email);
      // logger.info("last".red);
    } catch (error) {
      // logger.info("error has happened " + error.message);
      if (error.message == "jwt expired") {
        // logger.info("Expired");
        const userId = await verifyRefreshToken(req.headers["refreshtoken"]);
        // logger.info("u " + userId);
        if (!userId) {
          res.statusCode = 401;
          throw new Error("Invalid token");
        }
        const newRefreshToken = await jwtGen({ id: userId }, true),
          newAccessToken = await jwtGen({ id: userId });

        const tokens = {
          accessToken: newAccessToken,
          refreshToken: newAccessToken,
        };
        res.tokens = tokens;
        req.userId = userId;
        // logger.info("user is ".red + userId);
        next();
      }
      res.statusCode = 401;
      throw new Error("Unauthorized");
    }
  } else {
    res.statusCode = 401;
    throw new Error("No access token");
  }
});
