const express = require("express");
const router = express.Router();

const userRouter = require("../resources/users/routes"),
  blogRouter = require("../resources/blogs/routes");
router.use("/users", userRouter);
router.use("/blogs", blogRouter);

module.exports = router;
