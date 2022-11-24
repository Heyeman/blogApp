const express = require("express");
router = require("./common/routes");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("It's working");
});

app.use(router);

module.exports = app;
