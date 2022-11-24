const asyncHandler = require("express-async-handler");
const userModel = require('../model')
const UserDAL = require('../../../common/dal')(userModel)

const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body();
  if (!firstName || !lastName || !email || !password) {
    res.send("All fields should be filled");
  }


    
    
});
