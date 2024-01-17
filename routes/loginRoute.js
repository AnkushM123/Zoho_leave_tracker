const express = require('express');
const router = express.Router();
const loginUser = require('../apis/auth');
const loginValidation = require('../middlewares/loginValidationMiddleware');
const loginSchema = require('../dtos/loginValidation');

router.route("/").post(loginValidation.loginValidation(loginSchema), loginUser.login);

module.exports = router; 