const express = require('express');
const router = express.Router();
const registerUser = require('../apis/auth');
const upload = require('../apis/image_api');
const registerValidation = require('../middlewares/registerValidationMiddleware');
const registerSchema = require('../dtos/registerValidation');
const login = require('../apis/auth');

router.route("/").post(login.authenticateToken, upload.single('avatar'), registerValidation.registerValidation(registerSchema), registerUser.registerUser);

module.exports = router;  