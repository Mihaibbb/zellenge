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
const upload = require("express-fileupload");

connection();

cloudinary.config({
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    cloud_name: process.env.CLOUD_NAME,
    secure: true
});

cloudinary.uploader.upload("video.mp4",  { resource_type: "video", 
public_id: "/",
chunk_size: 6000000,
public_id: "/zellenge_videos",
eager: [
  { crop: "pad", audio_codec: "none" } ],                                   
eager_async: true }, (err, result) => {
    console.log(err, result);
})
  

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/private", privateRouter);
app.use("/api/upload-image", imagesRouter);
app.use("/api/upload-video", videosRouter);
// app.use.("/api/social");

// Error Handler
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("Server started " + port));




