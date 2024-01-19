const express = require('express');
const router = express.Router();
const user = require('../apis/user');
const login = require('../middlewares/authenticateToken');
const userMiddleware = require('../middlewares/userValidationMiddleware');
const userValidation = require('../core/dtos/userValidation');
const multer = require('multer');

router.route("/setPassword/:id").put(login.authenticateToken, userMiddleware.mongoIdValidation(userValidation.mongoIdSchema), userMiddleware.changePasswordValidation(userValidation.changePasswordSchema), user.changePassword);

router.route("/").get(login.authenticateToken, user.get);

router.route("/:id").put(login.authenticateToken, multer().single("user"), userMiddleware.mongoIdValidation(userValidation.mongoIdSchema), userMiddleware.editUserValidation(userValidation.editUserSchema), user.update);

router.route("/isVarifyEmail").post(login.authenticateToken, userMiddleware.getUserByEmailValidation(userValidation.getUserByEmailSchema), user.getByEmail);

module.exports = router    