const leaveService = require('../core/services/leaveType-service')
const validator = require('validator');
const leaveModel = require('../core/schema/leaveType-schema')

/**
*  @swagger 
* /leaveType:
*   get:
*     description: Get a list of all leaves
*     tags: [Leave Type]
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

const getLeave = async (req, res) => {
  let data = await leaveService.getLeave();
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
* /leaveType/{id}:
*   get:
*     description: Retrieve leave from the server.
*     tags: [Leave Type]
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

const getLeaveById = async (req, res) => {
  let isValidObjectId = (id) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    return objectIdRegex.test(id);
  };

  if (isValidObjectId(req.params.id)) {
    let leave = await leaveService.getLeaveById(req.params.id);
    if (leave.length > 0) {
      res.send(leave);
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
* /leaveType:
*   post:
*     tags: [Leave Type] 
*     requestBody:
*       required: true
*       content:
*          application/json:
*           schema:
*             type: object 
*             properties:
*                leaveName:
*                 type: string
*                createdBy:
*                 type: string
*                updatedBy:
*                 type: string
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
*         description: Invalid Id
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'Invalid Id format'
*/

const createLeave = async (req, res) => {

  let leave = new leaveModel({
    leaveName: req.body.leaveName,
    createdBy: req.body.createdBy,
    updatedBy: req.body.updatedBy
  })
  let data = await leaveService.createLeave(leave);
  res.send(data);
}


/**
* @swagger
* /leaveType/{id}:
*  delete:
*     description: delete an existing leave using its ID.
*     tags: [Leave Type]
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
*               example: 'leave deleted successfully' 
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

const deleteLeave = async (req, res) => {
  let isValidObjectId = (id) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id);
  };

  if (isValidObjectId(req.params.id)) {
    let data = await leaveService.deleteLeave(req.params.id);
    if (data.deletedCount > 0) {
      res.send("leave deleted successfully");
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


module.exports = { getLeaveById, createLeave, deleteLeave, getLeave };