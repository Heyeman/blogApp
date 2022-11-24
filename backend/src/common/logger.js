const pino = require("pino");
const pretty = require("pino-pretty");
const stream = pretty({
  colorize: true,
});
const logger = pino(
  {
    name: process.env.APP_ID,
    level: process.env.LOG_LEVEL || "info",
  },
  stream
);

module.exports = logger;
