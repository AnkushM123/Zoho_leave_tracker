const leaveRecordService = require('../core/services/leaveRecord-service');
const leaveRecordModel = require('../core/schema/leaveRecord-schema');
const message = require('../core/constant/messages');

/**
*  @swagger 
* /leaveRecord/getAllRecord:
*   post:
*     description: Get a list of all leave Records of user
*     tags: [LeaveRecord]
*     security:
*       - bearerAuth: []
*     produces:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               userId:
*                 type: string
*     responses:
*       200:
*         description: Success
*         content:
*           application/json:
*            schema:
*              type: object
*              properties:
*                userId:
*                 type: string
*                leaveId:
*                 type: string
*                balance:
*                 type: number
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
*         description: No data found
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'No data found'
*/

const getAllRecord = async (req, res) => {
    const result = await leaveRecordService.get(req.body?.userId);
    if (result.length > 0) {
        return res.send(result);
    }
    else {
        return res.status(404).json({ message: message.leaveRecordApi.error.notFound });
    }
}

/**
*  @swagger 
* /leaveRecord/getParticlarRecord:
*   post:
*     description: Get a paricular leave record of user
*     tags: [LeaveRecord]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*          application/json:
*           schema:
*             type: object 
*             properties:
*                userId:
*                 type: string
*                leaveId:
*                 type: string
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
*                userId:
*                 type: string
*                leaveId:
*                 type: string
*                balance:
*                 type: number
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
*         description: No data found
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'No data found'
*/

const getparticularRecord = async (req, res) => {
    const result = await leaveRecordService.getById(req.body?.leaveId, req.body?.userId);
    if (result.length > 0) {
        return res.send(result);
    }
    else {
        return res.status(404).json({ message: message.leaveRecordApi.error.notFound });
    }
}

/**
* @swagger
* /leaveRecord/createRecord:
*   post:
*     description: create leave record of user
*     tags: [LeaveRecord]
*     security:
*       - bearerAuth: [] 
*     requestBody:
*       required: true
*       content:
*          application/json:
*           schema:
*             type: object 
*             properties:
*                userId:
*                 type: string
*                leaveId:
*                 type: string
*                balance:
*                 type: number
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
*         description: Bad request
*/

const createLeaveRecord = async (req, res) => {
    const leaveRecord = new leaveRecordModel({
        userId: req.body?.userId,
        leaveId: req.body?.leaveId,
        createdBy: req.body?.createdBy,
        updatedBy: req.body?.updatedBy,
        balance: req.body?.balance
    })
    const result = await leaveRecordService.createLeaveRecord(leaveRecord);
    return res.send(result);
}

/**
* @swagger
*  /leaveRecord/{leaveId}:
*  put:
*     description: Update an particular leave record of user using leaveId.
*     tags: [LeaveRecord]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: leaveId
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
*                userId:
*                  type: string
*                balance:
*                  type: number
*                updatedBy:
*                  type: string
*     responses:
*       '200':
*         description: Success
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'Leave record updated successfully'
*       '404':
*         description: No data found
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'leave record not found'
*       400:
*         description: Bad Request
*/

const editLeaveRecord = async (req, res) => {
    const data = await leaveRecordService.getById(req.params.leaveId, req.body.userId);
    if (data.length > 0) {
        const leaveRecord = ({
            balance: req.body?.balance,
            updatedBy: req.body?.updatedBy
        })
        const result = await leaveRecordService.editLeaveRecord(req.body?.userId, req.params.leaveId, leaveRecord);
        if (result.modifiedCount === 1) {
            return res.send({ message: message.leaveRecordApi.success.updateRecord });
        }
        else {
            return res.status(404).json({ message: message.leaveRecordApi.error.notFound });
        }
    } else {
        return res.status(404).json({ message: message.leaveRecordApi.error.notFound });
    }
}

module.exports = { getAllRecord, getparticularRecord, createLeaveRecord, editLeaveRecord };