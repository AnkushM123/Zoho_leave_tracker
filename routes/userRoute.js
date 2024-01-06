const express = require('express');
const router = express.Router();
const user = require('../apis/user')
const upload=require('../image_api')

router.route("/setPassword").put(user.changePassword);

router.route("/").get(user.getUser)
    .post( upload.single('avatar'),user.createUser)

router.route("/:id").get(user.getUserById)
    .delete(user.deleteUser)
    .put( upload.single('avatar'),user.editUser);

router.route("/getEmail").post(user.getUserByEmail);

router.route("/getRole/:id").get(user.getUserByRole);



module.exports = router   