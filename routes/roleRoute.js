const express = require('express');
const router = express.Router();
const roleApi=require('../apis/role')

router.route("/:id").get(roleApi.getRoleById);

module.exports = router; 