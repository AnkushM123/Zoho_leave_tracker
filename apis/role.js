const roleService=require('../core/services/role-service')

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
*                role:
*                 type: string
*                role_id:
*                 type: integer
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
      let role = await roleService.getRoleById(req.params.id);
      if (role.length > 0) {
        res.send(role);
        return
      }else{
        res.status(404).send('role not found')
      }
  }

  module.exports={getRoleById}