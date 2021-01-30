const winston = require("winston");

module.exports = function (err, req, res, next) {
    winston.error(err.message, err) //winston.log("error", msg);
    res.status(500).send("Something failed, try again later");
}