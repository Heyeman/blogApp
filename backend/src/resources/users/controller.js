const asyncHandler = require("express-async-handler"),
  User = require("./model"),
  DAL = require("../../common/dal"),
  UserDAL = DAL(User);

const getInfo = asyncHandler(async (req, res) => {
  const id = req.params.id || req.userId;
  // logger.info("User is ", req.userId);
  const userInfo = await UserDAL.getOne({ _id: id });
  res.json(userInfo);
});

module.exports = {
  getInfo,
};
