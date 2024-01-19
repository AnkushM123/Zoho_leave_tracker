const express = require('express');
const router = express.Router();
const auth = require('../apis/auth');
const authMiddleware = require('../middlewares/authValidationMiddleware');
const authValidation = require('../core/dtos/authValidation');
const upload = require('../apis/file-upload');
const login = require('../middlewares/authenticateToken');

router.route("/login").post(authMiddleware.loginValidation(authValidation.loginSchema), auth.login);

router.route("/register").post(login.authenticateToken, upload.single('avatar'), authMiddleware.registerValidation(authValidation.registerSchema), auth.register);

module.exports = router; 