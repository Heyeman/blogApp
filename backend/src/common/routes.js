const express = require("express");
const router = express.Router();
//router calls
const userRouter = require("../resources/users/routes"),
    blogRouter = require("../resources/blogs/routes");
  
//endpoint routes
router.use("/users", userRouter);
router.use("/blogs", blogRouter);


module.exports = router;
