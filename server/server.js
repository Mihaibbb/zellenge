if (process.env.NODE_MODULES !== "production") {
    require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const privateRouter = require("./routes/private");
const imagesRouter = require("./routes/images");
const videosRouter = require("./routes/videos");
const connection = require("./db");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middleware/error");
const cloudinary = require("cloudinary").v2;
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

connection();

cloudinary.config({
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    cloud_name: process.env.CLOUD_NAME,
    secure: true
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use("/api/auth", authRouter);
app.use("/api/private", privateRouter);
app.use("/api/upload-image", imagesRouter);
app.use("/api/upload-video", videosRouter);
// app.use.("/api/social");

// Error Handler
app.use(errorHandler);

io.on("connection", socket => {
    
});

const port = process.env.PORT || 8000;

server.listen(port, () => console.log("Server started " + port));




