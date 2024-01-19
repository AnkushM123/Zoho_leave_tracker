const userService = require('../core/services/user-service');
const bcrypt = require('bcrypt');
const message = require('../core/constant/messages');

/**
*  @swagger 
* /user:
*   get:
*     description: Get a current loggedIn user
*     security:
*       - bearerAuth: []
*     tags: [User]
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Success
*         content:
*           application/json:
*            schema:
*              type: object
*              properties:
*                _id:
*                 type: string
*                name:
*                 type: string
*                address:
*                 type: object
*                 properties:
*                   addressLine1:
*                     type: string
*                   addressLine2:
*                      type: string
*                   city:
*                     type: string
*                   state:
*                     type: string
*                   country:
*                     type: string
*                   postalCode:
*                     type: string
*                age:
*                 type: integer
*                mobile:
*                 type: string
*                gender:
*                 type: string
*                roles:
*                  type: array
*                  items:
*                     type: integer
*                email:
*                 type: string
*                password:
*                 type: string
*                avatar:
*                  type: string
*                managerId:
*                 type: string
*                createdBy:
*                 type: string
*                updatedBy:
*                 type: string
*                createdAt:
*                 type: string
*                 format: date
*                updatedAt:
*                 type: string
*                 format: date
*                isActive:
*                 type: boolean
*                isDeleted:
*                 type: boolean
*/

const getUser = async (req, res) => {
  const data = await userService.getUser(req.user.id);
  if (data.length > 0) {
    return res.send(data);
  }
  else {
    return res.status(404).json({ message: message.userApi.error.notFound });
  }
}

/**
* @swagger
*  /user/{id}:
*  put:
*     description: Update an existing user using its ID.
*     tags: [User]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*          type: string
*     requestBody:
*       required: true
*       content:
*          multipart/form-data:
*           schema:
*             type: object 
*             properties:
*                name:
*                 type: string
*                address:
*                 type: object
*                 properties:
*                   addressLine1:
*                     type: string
*                   addressLine2:
*                      type: string
*                   city:
*                     type: string
*                   state:
*                     type: string
*                   country:
*                     type: string
*                   postalCode:
*                     type: string
*                age:
*                 type: integer
*                mobile:
*                 type: string
*                email:
*                 type: string
*                updatedBy:
*                 type: string
*     responses:
*       '200':
*         description: Success
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'user updated successfully'
*       '404':
*         description: user not found
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'user not found'
*       400:
*         description: Bad Request
*/

const editUser = async (req, res) => {
  const employee = ({
    name: req.body.name,
    address: req.body.address,
    age: req.body.age,
    mobile: req.body.mobile,
    email: req.body.email,
    updatedBy: req.body.updatedBy
  })

  const data = await userService.editUser(req.params.id, employee);
  if (data.modifiedCount === 1) {
    return res.send({ message: message.userApi.success.updateUser });
  }
  else {
    return res.status(404).json({ message: message.userApi.error.notFound });
  }
}

/**
* @swagger
*  /user/isVarifyEmail:
*  post:
*     description: search an existing user using its email.
*     tags: [User]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*          application/json:
*           schema:
*             type: object 
*             properties:
*                email:
*                  type: string 
*     responses:
*       '200':
*         description: Success
*         content:
*           application/json:
*            schema:
*              type: object
*              properties:
*                _id:
*                 type: string
*                name:
*                 type: string
*                address:
*                 type: object
*                 properties:
*                   addressLine1:
*                     type: string
*                   addressLine2:
*                      type: string
*                   city:
*                     type: string
*                   state:
*                     type: string
*                   country:
*                     type: string
*                   postalCode:
*                     type: string
*                age:
*                 type: integer
*                mobile:
*                 type: string
*                gender:
*                 type: string
*                roles:
*                  type: array
*                  items:
*                     type: integer
*                email:
*                 type: string
*                password:
*                 type: string
*                avatar:
*                  type: string
*                managerId:
*                 type: string
*                createdBy:
*                 type: string
*                updatedBy:
*                 type: string
*                createdAt:
*                 type: string
*                 format: date
*                updatedAt:
*                 type: string
*                 format: date
*                isActive:
*                 type: boolean
*                isDeleted:
*                 type: boolean
*       '404':
*         description: No data found
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'user not found'
*       400:
*         description: Bad Request
*/

const getUserByEmail = async (req, res) => {
  const user = await userService.getUserByEmail(req.body.email);
  if (user.length > 0) {
    return res.status(200).send(user);
  } else {
    return res.status(404).send({ message: message.userApi.error.notFound });
  }
}

/**
* @swagger
*  /user/setPassword/{id}:
*  put:
*     description: change password of user using userId.
*     tags: [User]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*          type: string
*     requestBody:
*       required: true
*       content:
*          application/json:
*           schema:
*             type: object 
*             properties:
*                password:
*                  type: string 
*     responses:
*       '200':
*         description: Success
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'Password changed successfully'
*       '404':
*         description: No data found
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'Cannot find user using this email'
*       400:
*         description: Bad Request
*/

const changePassword = async (req, res) => {
  const data = await userService.getUser(req.params.id);
  if (data.length > 0) {
    const hashedPassword = await bcrypt.hash(req.body?.password, 10);
    req.body.password = hashedPassword;
    const data = await userService.changePassword(req.params.id, req.body.password);

    return res.send({ message: message.userApi.success.changePassword });
  } else {
    return res.status(404).json({ message: message.userApi.error.findUserById });
  }
}

module.exports = { getUser, editUser, getUserByEmail, changePassword };