const userService = require('../core/services/user-service');
const bcrypt = require('bcrypt');

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
    res.send(data);
  }
  else {
    res.status(404).json({ message: "User not found" });
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
    res.send({ message: "User updated successfully" });
  }
  else {
    res.status(404).json({ message: "User not found" });
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
    res.status(200).send(user);
  } else {
    res.status(404).send({ message: "User not found" });
  }
}

/**
* @swagger
*  /user/setPassword:
*  put:
*     description: change password of user using its email.
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
  const data = await userService.getUserByEmail(req.body.email);
  if (data.length > 0) {
    const hashedPassword = await bcrypt.hash(req.body?.password, 10);
    req.body.password = hashedPassword;
    const data = await userService.changePassword(req.body.email, req.body.password);
    res.send({ message: "Password changed successfully" });
  } else {
    res.status(404).json({ message: "Cannot find user using this email" });
  }
}

module.exports = { getUser, editUser, getUserByEmail, changePassword };