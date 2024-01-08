const roleService = require('../core/services/role-service')

/**
* @swagger
* /role/{id}:
*   get:
*     description: Retrieve role from the server.
*     tags: [Role]
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
*                 type: integer
*                roleName:
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
*    
*/

const getRoleById = async (req, res) => {
  let isValidObjectId = (id) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    return objectIdRegex.test(id);
  };

  if (isValidObjectId(req.params.id)) {
    let role = await roleService.getRoleById(req.params.id);
    if (role.length > 0) {
      res.send(role);
      return
    } else {
      res.status(404).send('role name not found')
    }
  } else {
    res.status(400).send("please enter valid id");
  }
}

/**
*  @swagger 
* /role:
*   get:
*     description: Get a list of all roles
*     tags: [Role]
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
*                RoleName:
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

const getRoles = async (req, res) => {
  let data = await roleService.getRoles();
  if (data.length > 0) {
    res.send(data);
    return
  }
  else {
    res.status(404).json("No data found");
  }
}

module.exports = { getRoleById, getRoles }