const router = require("express").Router(),
  authRoutes = require("./auth/routes"),
  authMiddleware = require("../../middlewares/auth/auth"),
  { getInfo } = require("./controller");
router.get("/", (req, res) => {
  res.send("users home");
});
router.use("/auth", authRoutes);
router.get("/profile", authMiddleware, getInfo);
router.get("/profile/:id", authMiddleware, getInfo);

module.exports = router;
