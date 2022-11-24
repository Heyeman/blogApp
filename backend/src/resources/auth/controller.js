const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body();
});
