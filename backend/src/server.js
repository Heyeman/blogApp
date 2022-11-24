const app = require("./app"),
  os = require("os"),
  env = require("./common/env"),
  colors = require("colors"),
  logger = require("./common/logger");
port = process.env.PORT || 5000;
app.use(logger);
app.listen(port, () => {
  logger.info("Running on ${os.hostname()} and listening to port ${port}`");
});
