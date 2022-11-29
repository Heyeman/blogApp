const asyncHandler = require("express-async-handler"),
  User = require("./model"),
  DAL = require("../../common/dal"),
  UserDAL = DAL(User);

const whoAmI = asyncHandler(async (req, res) => {
  const { id } = req;
  const userInfo = await UserDAL.getOne({ id: id });
  res.json(userInfo);
});

module.exports = {
  whoAmI,
};
