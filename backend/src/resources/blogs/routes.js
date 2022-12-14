const router = require("express").Router(),
  { addBlog } = require("./controller"),
  authMiddleware = require("../../middlewares/auth/auth");
  router.get("/", (req, res) => {
    res.send("blogs home");
  });
//add blogs
router.post("/add", authMiddleware, addBlog);
//view a single blog

//fetch blogs

//delete blogs

module.exports = router;
