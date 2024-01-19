const express = require('express');
const router = express.Router();
const registerUser = require('../apis/login');
const upload = require('../image_api');
const login = require('../apis/login');

router.route("/").post(login.authenticateToken,upload.single('avatar'), registerUser.registerUser);

module.exports = router; 
