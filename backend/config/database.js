const mongoose = require("mongoose");
const winston = require("winston");

const dbConnection = () => {
    // 1. Create a connection to the database
    mongoose.connect(process.env.DB_URI).then((conn) => {
        const logger = `Database connected : ${conn.connection.host}`;
        winston.info(logger);
        console.log(logger);
    });
};

module.exports = dbConnection;
