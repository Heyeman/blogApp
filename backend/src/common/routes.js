const express = require("express");
const router = express.Router();

const authRoutes = require("../resources/auth/routes");
router.use("/auth", authRoutes);

module.exports = router;
