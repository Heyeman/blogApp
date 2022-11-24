const express = require("express");
const router = express.Router();

const authRoutes = require("../resources/users/routes");
router.use("/auth", authRoutes);

module.exports = router;
