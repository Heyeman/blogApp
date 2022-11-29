const router = require("express").Router(),
  { createUser } = require("./controller");
router.get("/", (req, res) => {
  res.send("auth home");
});
// router.post("/login");
router.post("/register", createUser);

module.exports = router;
