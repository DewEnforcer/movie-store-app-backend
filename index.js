const express = require("express");
const app = express();
const winston = require("winston");

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const server = app.listen(4000, () => {
    winston.info("Listening on port 4000...");
    console.log("Listening on port 4000");
});

module.exports = server