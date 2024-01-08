const express = require('express');
const router = express.Router();
const leave = require('../apis/leaveType')

router.route("/:id").get(leave.getLeaveById)
    .delete(leave.deleteLeave)


router.route("/").get(leave.getLeave)
    .post(leave.createLeave)


module.exports = router