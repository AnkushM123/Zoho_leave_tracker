const express = require('express');
const router = express.Router();

router.route("/").get(user.getUser)

module.exports = router   