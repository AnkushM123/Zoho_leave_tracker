require('dotenv').config();
const userService = require('../core/services/user-service');
const userModel = require('../core/schema/user-schema');
const bcrypt = require('bcrypt');
const secretKey = require('../core/constant/jwtKeys');
const jwt = require('jsonwebtoken');
const expireTime = require('../core/constant/expireTime')

/**
* @swagger
* /auth/register: 
*   post:
*     tags: [Auth]
*     security:
*      - bearerAuth: []
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
*
*                age:
*                 type: integer
*                mobile:
*                 type: string
*                gender:
*                  type: string
*                  enum:
*                    - male
*                    - female
*                roles: 
*                   type: array
*                email:
*                  type: string
*                password:
*                 type: string
*                avatar:
*                  type: string
*                  format: binary
*                managerId:
*                 type: string
*                createdBy:
*                 type: string
*                updatedBy:
*                 type: string 
*     produces:
*         application/json
*     responses:
*       200:
*         description: user created successfully
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
*                     type: string
*                email:
*                 type: string
*                password:
*                 type: string
*                avatar:
*                 type: string
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
*       400:
*         description: Bad request
*/

const registerUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body?.password, 10);

  const employee = new userModel({
    name: req.body?.name,
    address: req.body?.address,
    age: req.body?.age,
    mobile: req.body?.mobile,
    gender: req.body?.gender,
    roles: req.body?.roles.split(','),
    email: req.body?.email,
    password: hashedPassword,
    managerId: req.body?.managerId,
    createdBy: req.body?.createdBy,
    updatedBy: req.body?.updatedBy,
    avatar: req.file?.path
  })
  const result = await userService.createUser(employee);
  res.send(result);
}

/**
* @swagger
* /auth/login:
*   post:
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*               password:
*                 type: string 
*     produces:
*         application/json
*     responses:
*       200:
*         description: successfully Logged-In
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'token'
*       400:
*         description: Bad request
*/

const login = async (req, res) => {
  const data = await userService.getUserByEmail(req.body.email);
  if (data.length > 0) {
    const isMatch = await bcrypt.compare(req.body.password, data[0].password);
    const user = { "id": data[0]._id };

    if (isMatch) {
      const token = jwt.sign(user, secretKey, { expiresIn: expireTime });

      return res.json({ token });
    } else {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
  } else {
    return res.status(400).json({ message: 'Invalid username or password' });
  }
};

module.exports = { login, registerUser }; 