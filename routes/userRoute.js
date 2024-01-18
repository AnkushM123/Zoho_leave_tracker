const express = require('express');
const router = express.Router();
const user = require('../apis/user');
const login = require('../middlewares/authenticateToken');
const userMiddleware = require('../middlewares/userValidationMiddleware');
const userValidation = require('../core/dtos/userValidation');
const authMiddleware = require('../middlewares/authValidationMiddleware');
const authValidation = require('../core/dtos/authValidation');
const multer = require('multer');

router.route("/setPassword").put(login.authenticateToken, authMiddleware.loginValidation(authValidation.loginSchema), user.changePassword);

router.route("/").get(login.authenticateToken, user.getUser);

router.route("/:id").put(login.authenticateToken, multer().single("user"), userMiddleware.mongoIdValidation(userValidation.mongoIdSchema), userMiddleware.editUserValidation(userValidation.editUserSchema), user.editUser);

router.route("/isVarifyEmail").post(login.authenticateToken, userMiddleware.getUserByEmailValidation(userValidation.getUserByEmailSchema), user.getUserByEmail);

module.exports = router    