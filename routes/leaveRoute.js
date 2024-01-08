const express = require('express');
const router = express.Router();
const leave = require('../apis/leave')

router.route("/:id").post(leave.createLeave)
    .get(leave.getLeave)

router.route("/user/:id").post(leave.getLeaveById);


module.exports = router; 