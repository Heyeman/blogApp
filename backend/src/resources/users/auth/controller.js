const asyncHandler = require("express-async-handler");
const userModel = require("../model");
const UserDAL = require("../../../common/dal")(userModel);

const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body();
  if (!firstName || !lastName || !email || !password) {
    res.send("All fields should be filled");
  }

  const userExists = await UserDAL.getOne({ email });
  if (userExists) {
    res.send("User exists");
  }

  const newUser = await UserDal.createOne({
    firstName,
    lastName,
    email,
    password,
  });

  res.json({
    id: newUser._id,
    firstName: newUser.firstName,
  });
});
