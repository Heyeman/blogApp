const asyncHandler = require("express-async-handler");
const logger = require("../../../common/logger");
const userModel = require("../model");
const DAL = require("../../../common/dal"),
  UserDAL = DAL(userModel);
const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    res.send(
      `Fields: ${firstName ? "" : "Firstname,"} ${
        lastName ? "" : "lastname,"
      } ${email ? "" : "email,"} ${
        password ? "" : "password"
      } should be filled.`
    );
  }

  const userExists = await UserDAL.getOne({ email });
  if (userExists) {
    res.send("User exists");
  }

  const newUser = await UserDAL.createOne({
    firstName,
    lastName,
    email,
    password,
  });

  const { password: userPassword, ...userDetails } = newUser._doc;

  res.json({
    userDetails,
  });
});

module.exports = {
  createUser,
};
