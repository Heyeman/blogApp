const router = require("express").Router(),
  authRoutes = require("./auth/routes");
router.get("/", (req, res) => {
  res.send("users home");
});
router.use("/auth", authRoutes);

module.exports = router;
