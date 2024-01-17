require('dotenv').config();
const jwt = require('jsonwebtoken');
const userService = require('../core/services/user-service');
const userModel = require('../core/schema/user-schema');
const bcrypt = require('bcrypt');
const secretKey = require('../core/constant/jwtKeys');

/**
* @swagger
* /register:
*   post:
*     tags: [Register]
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
*                   flat_details:
*                     type: string
*                   area:
*                      type: string
*                   landmark:
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
  let hashedPassword = await bcrypt.hash(req.body.password, 10);

  let employee = new userModel({
    name: req.body.name,
    address: req.body.address,
    age: req.body.age,
    mobile: req.body.mobile,
    gender: req.body.gender,
    roles: req.body.roles.split(','),
    email: req.body.email,
    password: hashedPassword,
    managerId: req.body.managerId,
    createdBy: req.body.createdBy,
    updatedBy: req.body.updatedBy,
    avatar: req.file.path
  })

  let data = await userService.createUser(employee);
  res.send(data);
}

const authenticateToken = (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }

  jwt.verify(token, secretKey, (err, user) => {

    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    req.user = user;
    next();
  });
};

/**
* @swagger
* /login:
*   post:
*     tags: [Login]
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
  let data = await userService.getUserByEmail(req.body.email);
  if (data.length > 0) {
    let isMatch = await bcrypt.compare(req.body.password, data[0].password);
    let user = { "id": data[0]._id };

    if (isMatch) {
      let token = jwt.sign(user, secretKey, { expiresIn: '1h' });
      return res.json({ token });
    }else{
      return res.status(400).json({ message: 'Invalid username or password' })
    }
  } else {
    res.status(400).json({ message: 'Invalid username or password' })
  }

};

module.exports = { login, authenticateToken, registerUser };