const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

mongoose.set('useCreateIndex', true);

module.exports = function () {
    const db = config.get("dbConn");

    mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => winston.info("Connected to "+ db));
}
