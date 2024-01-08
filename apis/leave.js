const leaveService = require('../core/services/leave-service');
const leaveModel = require('../core/schema/leave-schema');

/**
*  @swagger 
* /leave/{id}:
*   get:
*     description: Get a list of all leaves
*     tags: [Leave]
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*          type: string
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
    let data = await leaveService.getUserLeave(req.params.id);
    if (data.length > 0) {
        res.send(data);
        return
    }
    else {
        res.status(404).json("No data found");
    }
}

/**
*  @swagger 
* /leave/user/{id}:
*   post:
*     description: Get a leave of user
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

const getLeaveById = async (req, res) => {
    let data = await leaveService.getLeaveById(req.body.leaveId, req.params.id);
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
* /leave/{id}:
*   post:
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
*         description: Invalid Id
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'Invalid Id format'
*/

const createLeave = async (req, res) => {
    let leave = new leaveModel({
        userId: req.params.id,
        leaveId: req.body.leaveId,
        createdBy: req.body.createdBy,
        updatedBy: req.body.updatedBy,
        balance: req.body.balance
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
    let isValidObjectId = (id) => {
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        return objectIdRegex.test(id);
    }
    if (isValidObjectId(req.params.id)) {
        let leave = ({
            balance: req.body.balance,
            updatedBy: req.body.updatedBy
        })
        const data = await leaveService.editLeave(req.params.id, req.body.leaveId, leave);
        if (data.modifiedCount === 1) {
            res.send("request updated successfully")
            return
        }
        else {
            res.status(404).json("request not found");
            return
        }
    }
    else {
        res.status(400).json("Invalid Id Format");
    }
}

module.exports = { getLeave, getLeaveById, createLeave, editLeave };