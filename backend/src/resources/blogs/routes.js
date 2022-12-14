const router = require("express").Router(),
  { addBlog } = require("./controller");

  router.get("/", (req, res) => {
    res.send("blogs home");
  });
//add blogs
router.post("/add", addBlog);


//delete blogs
//fetch blogs
//view a single blog

module.exports = router;
