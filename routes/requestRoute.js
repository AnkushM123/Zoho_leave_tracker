const express = require('express');
const router = express.Router();
const request = require('../apis/request')

router.route("/").post(request.getRequestByEmail);

router.route("/:id").post(request.createRequest)
                    .delete(request.deleteRequest);

module.exports = router