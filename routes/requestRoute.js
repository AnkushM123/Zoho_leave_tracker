const express = require('express');
const router = express.Router();
const request = require('../apis/request')
const multer = require('multer');

router.route("/:id").post(multer().single("request"), request.createRequest)
    .delete(request.deleteRequest)
    .get(request.getRequest)
    .put(request.editRequest);

router.route("/user/:id").get(request.getUserRequest)

module.exports = router