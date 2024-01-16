const express = require('express');
const router = express.Router();
const loginUser = require('../apis/login');

router.route("/").post(loginUser.login);

module.exports = router; 