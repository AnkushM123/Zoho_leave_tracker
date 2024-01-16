const express = require('express');
const router = express.Router();
const user = require('../apis/user')
const upload = require('../image_api')
const login = require('../apis/login');

router.route("/setPassword").put(user.changePassword);

router.route("/").get(login.authenticateToken,user.getUser)


router.route("/:id").delete(user.deleteUser)
    .put(upload.single('avatar'), user.editUser);

router.route("/getEmail").post(user.getUserByEmail);


module.exports = router   