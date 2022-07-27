const router = require("express").Router();
const { uploadProfileImage, deleteProfileImage } = require("../controllers/images");
const upload = require("../handlers/uploadImage");

router.post("/upload/profile-image", upload.single('image'), uploadProfileImage);
router.post("/delete/profile-image", deleteProfileImage);

module.exports = router;