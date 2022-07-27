const router = require('express').Router();
const { register, login, forgotPassword, resetPassword, sendEmailCode, checkEmail } = require("../controllers/auth");

// Routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password:resetToken", resetPassword);
router.post("/send-email-code", sendEmailCode);
router.put("/check-email:emailToken", checkEmail);

module.exports = router;