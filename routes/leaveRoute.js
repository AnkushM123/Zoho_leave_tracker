const express = require('express');
const router = express.Router();
const leave = require('../apis/leave')

router.route("/:id").get(leave.getLeaveById)
                    .post(leave.createLeave)
                    .delete(leave.deleteLeave)
                    .put(leave.editLeave);

module.exports = router