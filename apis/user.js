const userService = require('../core/services/user-service')
const validator = require('validator');

/**
*  @swagger 
* /user:
*   get:
*     description: Get a list of all users
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
  let data = await userService.getUser();
  if (data.length > 0) {
    res.send(data);
    return
  }
  else {
    res.status(404).json("No data found");
  }
}


/**
* @swagger
* /user/{id}:
*   get:
*     description: Retrieve user from the server.
*     tags: [User]
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*          type: string
*     produces:
*          - application/json   
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
*       400:
*         description: Invalid Id
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'Invalid Id format'
*    
*/

const getUserById = async (req, res) => {
  let isValidObjectId = (id) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    return objectIdRegex.test(id);
  };

  if (isValidObjectId(req.params.id)) {
    let employee = await userService.getUserById(req.params.id);
    if (employee.length > 0) {
      res.send(employee);
      return
    }
    else {
      res.status(404).json("No data found");
      return
    }
  } else {
    res.status(400).json("Invalid Id Format");
  }
}



/**
* @swagger
*  /user/{id}:
*  put:
*     description: Update an existing user using its ID.
*     tags: [User]
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
*                gender:
*                  type: string
*                  enum:
*                    - male
*                    - female
*                avatar:
*                  type: string
*                  format: binary 
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
    res.status(400).send("age must be within 60");
    return
  }

  if (isValidObjectId(req.params.id)) {
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
      gender: req.body.gender,
      avatar: req.file.path,
      updatedBy: req.body.updatedBy
    })
    const data = await userService.editUser(req.params.id, employee);
    if (data.modifiedCount === 1) {
      res.send("user updated successfully")
      return
    }

    else {
      res.status(404).json("No data found");
      return
    }
  }
  else {
    res.status(400).json("Invalid Id Format");
  }
}


/**
* @swagger
* /user/{id}:
*  delete:
*     description: delete an existing user using its ID.
*     tags: [User]
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*          type: string
*     responses:
*       '200':
*         description: Success
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'user deleted successfully' 
*       '404':
*         description: No data found
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'No data found' 
*       400:
*         description: Invalid Id
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'Invalid Id format'     
*/

const deleteUser = async (req, res) => {
  let isValidObjectId = (id) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id);
  };

  if (isValidObjectId(req.params.id)) {
    let data = await userService.deleteUser(req.params.id);
    if (data.deletedCount > 0) {
      res.send("user deleted successfully");
      return
    }
    else {
      res.status(404).json("No data found");
      return
    }
  } else {
    res.status(400).json("Invalid Id Format");
  }
}

/**
* @swagger
*  /user/getEmail:
*  post:
*     description: search an existing user using its email.
*     tags: [User]
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
      res.status(200).send(_email);
      return
    } else {
      res.status(404).send("user not found");
      return
    }
  } else {
    res.status(400).send("please enter valid email");
    return
  }
}

/**
* @swagger
*  /user/setPassword:
*  put:
*     description: change password of user using its email.
*     tags: [User]
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
    res.status(400).send("please enter valid email");
    return
  }

  if (!validatePassword(req.body.password)) {
    res.status(400).send("Password must contain atleast one lower,one upper,one special character,one digit,no blank spaces and length must be between 8-20 characters");
    return
  }

  let data = await userService.changePassword(req.body.email, req.body.password);
  res.send("password changed successfully");
  return
}


module.exports = { getUser, getUserById, editUser, deleteUser, getUserByEmail, changePassword };