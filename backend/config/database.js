const mongoose = require("mongoose");
const winston = require("winston");

const dbConnection = () => {
    // 1. Create a connection to the database
    mongoose
        .connect(process.env.DB_URI)
        .then((conn) =>
            winston.info(`Database connected : ${conn.connection.host}`)
        )
        .catch((err) => {
            winston.error(`Database Error : ${err}`);
            process.exit(1);
        });
};

module.exports = dbConnection;
