const winston = require("winston");
require("express-async-errors");

module.exports = () => {
    
    winston.exceptions.handle(
            new winston.transports.Console({colorize: true, prettyPrint: true}),
            new winston.transports.File({filename: "./logs/uncaughtExceptions.log"})
        )
    
    process.on("unhandledRejection", (ex) => {
        throw ex;
    })

    winston.add(new winston.transports.File({ filename: './logs/logfile.log' }));

    //winston.add(new winston.transports.File, {filename:"logfile.log"});
    
    /*process.on("uncaughtException", (ex) => {
        console.log("Uncaught exception");
        winston.error(ex.message, ex);
        process.exit(1);
    })*/
}