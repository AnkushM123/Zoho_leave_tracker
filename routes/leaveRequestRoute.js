const express = require('express');
const router = express.Router();
const leaveRequest = require('../apis/leaveRequest');
const leaveRequestMiddleware = require('../middlewares/leaveRequestValidationMiddleware');
const leaveRequestValidation = require('../core/dtos/leaveRequestValidation');
const multer = require('multer');
const login = require('../middlewares/authenticateToken');

router.route("/").post(multer().single("request"), login.authenticateToken, leaveRequestMiddleware.applyLeaveValidation(leaveRequestValidation.applyLeaveSchema), leaveRequest.applyLeave);

router.route("/:requestId").put(login.authenticateToken, leaveRequestMiddleware.mongoIdValidation(leaveRequestValidation.mongoIdSchema), leaveRequest.updateRequest);

router.route("/changeStatus/:requestId").put(multer().single("status"),login.authenticateToken, leaveRequestMiddleware.mongoIdValidation(leaveRequestValidation.mongoIdSchema), leaveRequestMiddleware.changeStatusValidation(leaveRequestValidation.changeStatusSchema), leaveRequest.changeStatus);

router.route("/userRequest/:userId").get(login.authenticateToken, leaveRequestMiddleware.getByUserIdValidation(leaveRequestValidation.getByUserIdSchema), leaveRequest.getByUserId);

router.route("/getByManagerIdAndStatus/:managerId").post(login.authenticateToken, leaveRequestMiddleware.getByManagerIdValidation(leaveRequestValidation.getByManagerIdSchema), leaveRequest.getByManagerIdAndStatus);

router.route("/getRequest/:requestId").get(login.authenticateToken, leaveRequest.getByRequestId);

router.route("/:managerId").get(login.authenticateToken, leaveRequest.getByManagerId);

router.route("/getByStatus/:userId").get(login.authenticateToken, leaveRequest.getRequestByStatus);

module.exports = router