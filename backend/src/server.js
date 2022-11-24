const app = require("./app");
const os = require("os");
const env = require("./common/env");
const colors = require("colors");
port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Running on ${os.hostname()} and listening to port ${port}`.cyan);
});
