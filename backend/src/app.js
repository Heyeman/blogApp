const express = require("express"),
  mongoose = require("mongoose"),
  router = require("./common/routes");
// mongoose.now('')
mongoose.connect(process.env.MONGODB_URL);
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("It's working");
});

app.use(router);

module.exports = app;
