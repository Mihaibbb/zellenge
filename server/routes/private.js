const router = require("express").Router();
const { getPrivateData } = require("../controllers/private");
const { protect } = require("../middleware/auth");

router.get("/", protect, getPrivateData);

module.exports = router;
