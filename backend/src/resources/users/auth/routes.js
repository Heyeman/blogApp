const router = require("express").Router(),
  { createUser, login } = require("./controller");
router.get("/", (req, res) => {
  res.send("auth home");
});
// router.post("/login");
router.post("/register", createUser);
router.post("/login", login);
module.exports = router;
