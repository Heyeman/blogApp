const router = require("express").Router();

router.route("/auth", require("./auth/routes"));

module.exports = router;
