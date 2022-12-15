const router = require("express").Router(),
  { addBlog, viewBlog, likeBlog } = require("./controller"),
  authMiddleware = require("../../middlewares/auth/auth");
router.get("/", (req, res) => {
  res.send("blogs home");
});
//add blogs
router.post("/add", authMiddleware, addBlog);
//view a single blog
router.get("/:id", authMiddleware, viewBlog);
//fetch blogs

//delete blogs
//like blog
router.put("/:id/like", authMiddleware);
module.exports = router;
