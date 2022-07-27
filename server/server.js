if (process.env.NODE_MODULES !== "production") {
    require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const privateRouter = require("./routes/private");
const imagesRouter = require("./routes/images");
const connection = require("./db");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middleware/error");

connection();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/private", privateRouter);
app.use("/api", imagesRouter);
// app.use.("/api/social");

// Error Handler
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("Server started"));

process.on("unhandledRejection", (err, promise) => {
     console.log("Error: ", err);
     server.close(() => process.exit(1));
});


