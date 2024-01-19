const roleService = require('../core/services/role-service');
const message = require('../core/constant/messages');

/**
* @swagger
* /role/{id}:
*   get:
*     description: Get role using RoleId.
*     tags: [Role]
*     security:
*       - bearerAuth: []
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

const getById = async (req, res) => {
  const result = await roleService.getById(req.params.id);
  if (result.length > 0) {
    return res.send(result);
  } else {
    return res.status(404).json({ message: message.roleApi.error.notFoundById });
  }
}

/**
*  @swagger 
* /role:
*   get:
*     description: Get list of all roles.
*     tags: [Role]
*     security:
*       - bearerAuth: []
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

const get = async (req, res) => {
  const result = await roleService.get();
  if (result.length > 0) {
    return res.send(result);
  }
  else {
    return res.status(404).json({ message: message.roleApi.error.notFound });
  }
}

module.exports = { getById, get }