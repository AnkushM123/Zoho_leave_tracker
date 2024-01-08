const express = require('express');
const router = express.Router();
const registerUser = require('../apis/login')
const upload = require('../image_api')

router.route("/").post(upload.single('avatar'), registerUser.registerUser);

module.exports = router; 