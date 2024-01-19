const express = require('express');
const router = express.Router();
const roleApi = require('../apis/role');
const userMiddleware = require('../middlewares/userValidationMiddleware');
const userValidation = require('../core/dtos/userValidation');
const login = require('../middlewares/authenticateToken');

router.route("/:id").get(login.authenticateToken, userMiddleware.mongoIdValidation(userValidation.mongoIdSchema), roleApi.getById);

router.route("/").get(login.authenticateToken, roleApi.get);

module.exports = router; 