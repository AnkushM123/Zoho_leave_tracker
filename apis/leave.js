const leaveService = require('../core/services/leave-service')
const validator = require('validator');
const leaveModel = require('../core/schema/leave-schema')
 
  
/**
* @swagger
* /leave/{id}:
*   get:
*     description: Retrieve leave from the server.
*     tags: [Leave]
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
*                user_id:
*                 type: string
*                compensantoryOff:
*                 type: number
*                forgotIdCard:
*                 type: number
*                outOfOfficeOnDuty:
*                 type: number
*                paidLeave:
*                 type: number
*                unpaidLeave:
*                 type: number
*                workFromHome:
*                 type: number
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
* /leave/{id}:
*   post:
*     tags: [Leave] 
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
*                user_id:
*                 type: string
*                compensantoryOff:
*                 type: number
*                forgotIdCard:
*                 type: number
*                outOfOfficeOnDuty:
*                 type: number
*                paidLeave:
*                 type: number
*                unpaidLeave:
*                 type: number
*                workFromHome:
*                 type: number
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
        user_id:req.params.id
    })
    let data = await leaveService.createLeave(leave);
    res.send(data);
  }
  
/**
* @swagger
*  /leave/{id}:
*  put:
*     description: Update an existing leave using its ID.
*     tags: [Leave]
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*          type: string
*     requestBody:
*       required: true
*       content:
*          application/json:
*           schema:
*             type: object 
*             properties:
*                compensantoryOff:
*                 type: number
*                forgotIdCard:
*                 type: number
*                outOfOfficeOnDuty:
*                 type: number
*                paidLeave:
*                 type: number
*                unpaidLeave:
*                 type: number
*                workFromHome:
*                 type: number
*     produces:
*          - application/json   
*     responses:
*       200:
*         description: Success
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'leave updated successfully'
*       '404':
*         description: No data found
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'leave not found'
*       400:
*         description: Invalid Id
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'Invalid Id format'
*/
  
  const editLeave = async (req, res) => {
    // let leave = new leaveModel({
    //   compensantoryOff:req.body.compensantoryOff,
    //   forgotIdCard:req.body.forgotIdCard,
    //   outOfOfficeOnDuty:req.body.outOfOfficeOnDuty,
    //   paidLeave:req.body.paidLeave,
    //   unpaidLeave:req.body.paidLeave,
    //   workFromHome:req.body.workFromHome
    // })
    let data = await leaveService.editLeave(req.params.id, req.body);
    res.send("leave updated successfully")
    return
  } 
  
  /**
  * @swagger
  * /leave/{id}:
  *  delete:
  *     description: delete an existing leave using its ID.
  *     tags: [Leave]
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
  
  
  module.exports = { getLeaveById, createLeave, editLeave, deleteLeave  };