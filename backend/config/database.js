const mongoose = require("mongoose");

const dbConnection = () => {
    // 1. Create a connection to the database
    mongoose
        .connect(process.env.DB_URI)
        .then((conn) =>
            console.log(`Database connected : ${conn.connection.host}`)
        )
        .catch((err) => {
            console.error(`Database Error : ${err}`);
            process.exit(1);
        });
};

module.exports = dbConnection;
