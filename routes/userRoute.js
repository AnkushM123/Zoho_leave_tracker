const express = require('express');
const router = express.Router();
const user = require('../apis/user');
const login = require('../apis/auth');

router.route("/setPassword").put(login.authenticateToken,user.changePassword);

router.route("/").get(login.authenticateToken,user.getUser)

router.route("/:id").put(login.authenticateToken,user.editUser);

router.route("/isVarifyEmail").post(login.authenticateToken,user.getUserByEmail);

module.exports = router   