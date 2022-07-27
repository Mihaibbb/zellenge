const router = require("express").Router();
const { uploadVideo } = require("../controllers/videos");

router.post("/", uploadVideo);

module.exports = router;