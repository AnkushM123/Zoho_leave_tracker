const express = require('express');
const router = express.Router();
const leaveType = require('../apis/leaveType');
const userMiddleware = require('../middlewares/userValidationMiddleware');
const userValidation = require('../core/dtos/userValidation');
const login = require('../middlewares/authenticateToken');

router.route("/:id").get(login.authenticateToken, userMiddleware.mongoIdValidation(userValidation.mongoIdSchema), leaveType.getById);

router.route("/").get(login.authenticateToken, leaveType.get);

module.exports = router; 