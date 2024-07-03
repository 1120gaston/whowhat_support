const express = require("express");
const router = express.Router();
const { sendEmail, verifyEmail } = require('../controllers/emailController')

router.route('/').post(sendEmail);
router.route('/verify').post(verifyEmail)

module.exports = router;
