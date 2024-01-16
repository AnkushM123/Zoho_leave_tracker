const validator = require('validator');
const jwt = require('jsonwebtoken');
const userService = require('../core/services/user-service');
const userModel = require('../core/schema/user-schema')
const bcrypt = require('bcrypt');

/**
* @swagger
* /register:
*   post:
*     tags: [Register]
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
*                roles: {
*                   type: array,
*                   items: {
*                   type: string
*                    }
*                   }
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
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return (regex.test(password));
  }

  if (!req.body.name.trim() || !req.body.address.trim() || !req.body.mobile.trim() || !req.body.gender.trim() || req.body.roles.length == 0 || !req.body.email.trim() || !req.body.password.trim() || req.body.age < 1) {
    res.status(400).send("name,address,age,mobile,gender,role,email and password are required fields");
    return
  }

  if (req.body.age < 0 || req.body.age > 60) {
    res.status(400).send("age must be within 60");
    return

  }

  if (!validator.isEmail(req.body.email)) {
    res.status(400).send("please enter valid email");
    return
  }

  if (!validatePassword(req.body.password)) {
    res.status(400).send("Password must contain atleast one lower,one upper,one special character,one digit,no blank spaces and length must be between 8-20 characters");
    return
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const add = JSON.parse(req.body.address)

  let employee = new userModel({
    name: req.body.name,
    address: {
      flat_details: add.flat_details,
      landmark: add.landmark,
      area: add.area
    },
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
  employee.roles
  let data = await userService.createUser(employee);
  res.send(data);
}

const secretKey = 'dcsgjvjcddsdhvscskhadafsrgvrsgrf';

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
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
  try{
    if (!validator.isEmail(req.body.email)) {
    res.status(400).send("please enter valid email");
    return
  }
  const data = await userService.getUserByEmail(req.body.email);
  if (!data) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(req.body.password, data[0].password);
  const user = {"id":data[0]._id}
  
  if (isMatch) {
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
    res.json({ token });
  }
}
catch(err){
console.log(err);
} 
};

module.exports = { login, authenticateToken, registerUser };