const express = require('express');
const router = express.Router();
const leaveRequest = require('../apis/leaveRequest');
const leaveRequestMiddleware = require('../middlewares/leaveRequestValidationMiddleware');
const leaveRequestValidation = require('../core/dtos/leaveRequestValidation');
const multer = require('multer');
const login = require('../middlewares/authenticateToken');

router.route("/").post(multer().single("request"), login.authenticateToken, leaveRequestMiddleware.applyLeaveValidation(leaveRequestValidation.applyLeaveSchema), leaveRequest.applyLeave)

router.route("/:requestId").put(multer().single("leaveType"), login.authenticateToken, leaveRequestMiddleware.mongoIdValidation(leaveRequestValidation.mongoIdSchema), leaveRequestMiddleware.updateRequestValidation(leaveRequestValidation.updateRequestSchema), leaveRequest.updateRequest)

router.route("/changeStatus/:requestId").put(multer().single("status"),login.authenticateToken, leaveRequestMiddleware.mongoIdValidation(leaveRequestValidation.mongoIdSchema), leaveRequestMiddleware.changeStatusValidation(leaveRequestValidation.changeStatusSchema), leaveRequest.changeStatus)

router.route("/userRequest/:userId").get(login.authenticateToken, leaveRequestMiddleware.getByUserIdValidation(leaveRequestValidation.getByUserIdSchema), leaveRequest.getByUserId)

router.route("/:managerId").get(login.authenticateToken, leaveRequestMiddleware.getByManagerIdValidation(leaveRequestValidation.getByManagerIdSchema), leaveRequest.getByManagerId)

module.exports = router