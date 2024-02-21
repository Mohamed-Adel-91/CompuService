const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config({ path: "./config.env" });

mongoose
    .connect(process.env.DB_URI)
    .then((conn) => console.log(`Database connected : ${conn.connection.host}`))
    .catch((err) => {
        console.error(`Database Error : ${err}`);
        process.exit();
    });

app.use(morgan("dev"));

if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev")); // log to console for development
    console.log(`process.env.NODE_ENV is ${process.env.NODE_ENV}`);
} else {
    app.use(
        morgan("common", {
            skip: function (req, res) {
                return res.statusCode < 400;
            },
        })
    ); // only log errors for production
    app.use(morgan("short")); // log to file in production
}
app.use(express.json());

app.get("/", (req, res) => {
    // send back a response of "Hello World!"
    res.send("Hello World!");
});

// create the server and listen on port 8000
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on ${"http://localhost:" + PORT}`);
});
