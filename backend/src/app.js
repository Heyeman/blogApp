const express = require("express"),
  mongoose = require('mongoose'),
router = require("./common/routes");
// mongoose.now('')
mongoose.connect("mongodb://localhost:27017", );
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("It's working");
});

app.use(router);

module.exports = app;
