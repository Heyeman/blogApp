const app = require("./app"),
  os = require("os"),
  dotenv = require("dotenv").config(),
  colors = require("colors"),
  logger = require("./common/logger"),
  port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.info(`Running on ${os.hostname()} and listening to port ${port}`);
});
