const express = require('express');
const router = express.Router();
const user = require('../apis/user');
const login = require('../middlewares/authenticateToken');
const userMiddleware = require('../middlewares/userValidationMiddleware');
const userValidation = require('../core/dtos/userValidation');
const upload = require('../apis/file-upload');

router.route("/setPassword/:id").put(userMiddleware.mongoIdValidation(userValidation.mongoIdSchema), userMiddleware.changePasswordValidation(userValidation.changePasswordSchema), user.changePassword);

router.route("/").get(login.authenticateToken, user.get);

router.route("/getUser/:id").get(login.authenticateToken, user.getUser);

router.route("/:id").put(login.authenticateToken, upload.single('avatar'), userMiddleware.mongoIdValidation(userValidation.mongoIdSchema), userMiddleware.editUserValidation(userValidation.editUserSchema), user.update);

router.route("/isVarifyEmail").post(userMiddleware.getUserByEmailValidation(userValidation.getUserByEmailSchema), user.getByEmail);

router.route("/getEmployee").get(login.authenticateToken, user.getEmployee);

router.route("/changePassword/:id").post(login.authenticateToken, user.confirmOldPassword);

router.route("/getByRole/:id").get(login.authenticateToken, user.getByRole);

module.exports = router    