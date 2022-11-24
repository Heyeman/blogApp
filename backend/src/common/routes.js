const express = require("express");
const router = express.Router();

const userRoutes = require("../resources/users/routes");
router.use("/users", userRoutes);

module.exports = router;
