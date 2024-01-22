const express = require('express');
const router = express.Router();
const leaveRecord = require('../apis/leaveRecord');
const leaveRecordMiddleware = require('../middlewares/leaveRecordValidationMiddleware');
const leaveRecordValidation = require('../core/dtos/leaveRecordValidation');
const login = require('../middlewares/authenticateToken');

router.route("/createRecord").post(login.authenticateToken, leaveRecordMiddleware.createLeaveRecordValidation(leaveRecordValidation.createRecordSchema), leaveRecord.createLeaveRecord)

router.route("/getAllRecord").post(login.authenticateToken, leaveRecordMiddleware.userAllRecordValidation(leaveRecordValidation.userAllRecordSchema), leaveRecord.getAllRecord)

router.route("/getParticularRecord").post(login.authenticateToken, leaveRecordMiddleware.userParticularRecordValidation(leaveRecordValidation.userParticularRecordSchema), leaveRecord.getparticularRecord)

router.route("/:leaveId").put(login.authenticateToken, leaveRecordMiddleware.mongoIdValidation(leaveRecordValidation.mongoIdSchema), leaveRecordMiddleware.editLeaveRecordValidation(leaveRecordValidation.editLeaveRecordSchema), leaveRecord.editLeaveRecord)

module.exports = router; 