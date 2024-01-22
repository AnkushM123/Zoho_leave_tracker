const leaveTypeService = require('../core/services/leaveType-service');
const message=require('../core/constant/messages');

/**
* @swagger
* /leaveType/{id}:
*   get:
*     description: Get leave using leaveId.
*     tags: [LeaveType]
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
*                leaveName:
*                 type: string
*                createdAt:
*                 type: string
*                 format: date
*                updatedAt:
*                 type: string
*                 format: date
*                createdBy:
*                 type: string
*                updatedBy:
*                 type: string
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
  const result = await leaveTypeService.getById(req.params.id);
  if (result.length > 0) {
    return res.send(result);
  } else {
    return res.status(404).json({ message: message.leaveTypeApi.error.notFoundById });
  }
}

/**
*  @swagger 
* /leaveType:
*   get:
*     description: Get list of all leaves.
*     tags: [LeaveType]
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
*                leaveName:
*                 type: string
*                createdAt:
*                 type: string
*                 format: date
*                updatedAt:
*                 type: string
*                 format: date
*                createdBy:
*                 type: string
*                updatedBy:
*                 type: string
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
  const result = await leaveTypeService.get();
  if (result.length > 0) {
    return res.send(result);
  }
  else {
    return res.status(404).json({ message: message.leaveTypeApi.error.notFound });
  }
}

module.exports = { getById, get }