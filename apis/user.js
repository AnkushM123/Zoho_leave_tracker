const userService = require('../core/services/user-service')
const validator = require('validator');

/**
*  @swagger 
* /user:
*   get:
*     description: Get a current user
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
*                   flat_details:
*                     type: string
*                   area:
*                      type: string
*                   landmark:
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
*       404:
*         description: No data
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'No data found'
*/

const getUser = async (req, res) => {
  let data = await userService.getUser(req.user.id);
  if (data.length > 0) {
    res.send(data);
  }
  else {
    res.status(404).json("No data found");
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
*                   flat_details:
*                     type: string
*                   area:
*                      type: string
*                   landmark:
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
*         description: No data found
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'user not found'
*       400:
*         description: Invalid Id
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'Invalid Id format'
*/

const editUser = async (req, res) => {
  let isValidObjectId = (id) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id);
  };

  if (req.body.age < 0 || req.body.age > 60) {
    return res.status(400).send("age must be within 60");
  }

  if (isValidObjectId(req.params.id)) {
    if (!req.body.name || !req.body.address || !req.body.mobile || !req.body.email || req.body.age < 1) {
      return res.status(400).send("name,address,age,mobile,email are required fields");
    }
    const add = JSON.parse(req.body.address)
    let employee = ({
      name: req.body.name,
      address: {
        flat_details: add.flat_details,
        landmark: add.landmark,
        area: add.area
      },
      age: req.body.age,
      mobile: req.body.mobile,
      email: req.body.email,
      updatedBy: req.body.updatedBy
    })

    const data = await userService.editUser(req.params.id, employee);

    if (data.modifiedCount === 1) {    
      return res.send("user updated successfully")
    }
    else {  
      return res.status(404).json("No data found");
    }
  }
  else {
    res.status(400).json("Invalid Id Format");
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
*                   flat_details:
*                     type: string
*                   area:
*                      type: string
*                   landmark:
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
*         description: Invalid Email
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'please enter valid email'
*/

const getUserByEmail = async (req, res) => {

  if (validator.isEmail(req.body.email)) {
    const _email = await userService.getUserByEmail(req.body.email);
    if (_email.length > 0) {
      return res.status(200).send(_email);
    } else {
      return res.status(404).send("user not found");  
    }
  } else {
    res.status(400).send("please enter valid email");
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
*               example: 'user not found'
*       400:
*         description: Invalid Email
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'please enter valid email'
*/

const changePassword = async (req, res) => {
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;   
    return (regex.test(password));
  }

  if (!validator.isEmail(req.body.email)) {
    return res.status(400).send("please enter valid email");
  }

  if (!validatePassword(req.body.password)) {
    return res.status(400).send("Password must contain atleast one lower,one upper,one special character,one digit,no blank spaces and length must be between 8-20 characters");  
  }

  let data = await userService.changePassword(req.body.email, req.body.password);
  res.send("password changed successfully");
}

module.exports = { getUser, editUser, getUserByEmail, changePassword };