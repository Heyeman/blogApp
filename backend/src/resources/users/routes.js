const router = require("express").Router(),
  authRoutes = require("./auth/routes"),
  authMiddleware = require("../../middlewares/auth/auth"),
  { whoAmI } = require("./controller");
router.get("/", (req, res) => {
  res.send("users home");
});
router.use("/auth", authRoutes);
router.use(authMiddleware);
router.get("/me", whoAmI);

module.exports = router;
