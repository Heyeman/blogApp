const router = require("express").Router(),
  { addBlog } = require("./controller");

//add blogs
router.get("/", (req, res) => {
  res.send("blogs home");
});
router.post("/add", addBlog);

//delete blogs
//fetch blogs
//view a single blog

module.exports = router;
