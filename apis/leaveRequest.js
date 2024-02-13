const leaveRequestService = require('../core/services/leaveRequest-service');
const leaveRequestModel = require('../core/schema/leaveRequest-schema');
const message=require('../core/constant/messages');

/**
* @swagger
* /leaveRequest/{managerId}:
*   get:
*     description: Retrieve leave requests using managerId.
*     tags: [LeaveRequest]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: managerId
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
*                userId:
*                 type: string
*                managerId:
*                 type: string
*                name:
*                 type: string
*                leaveType:
*                  type: string
*                reasonForLeave:
*                 type: string
*                status:
*                  type: string
*                startDate:
*                 type: string
*                 format: date
*                endDate:
*                 type: string
*                 format: date
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
*         description: Bad Request
*    
*/

const getByManagerIdAndStatus = async (req, res) => {
    const result = await leaveRequestService.getByManagerIdAndStatus(req.params.managerId, req.body.status);
    if (result.length > 0) {
        return res.send(result);
    } else {
        return res.status(404).send({message:message.leaveRequestApi.error.notFound});
    }
}

/**
* @swagger
* /leaveRequest/getRequest/{requestId}:
*   get:
*     description: Retrieve leave requests using requestId.
*     tags: [LeaveRequest]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: requestId
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
*                userId:
*                 type: string
*                managerId:
*                 type: string
*                name:
*                 type: string
*                leaveType:
*                  type: string
*                reasonForLeave:
*                 type: string
*                status:
*                  type: string
*                startDate:
*                 type: string
*                 format: date
*                endDate:
*                 type: string
*                 format: date
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
*         description: Bad Request
*    
*/

const getByRequestId = async (req, res) => {
    const result = await leaveRequestService.getByRequestId(req.params.requestId);
    if (result.length > 0) {
        return res.send(result);
    } else {
        return res.status(404).send({message:message.leaveRequestApi.error.notFound});
    }
}

/**
* @swagger
* /leaveRequest/userRequest/{userId}:
*   get:
*     description: Retrieve leave requests using userId.
*     tags: [LeaveRequest]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: userId
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
*                userId:
*                 type: string
*                managerId:
*                 type: string
*                name:
*                 type: string
*                leaveType:
*                  type: string
*                reasonForLeave:
*                 type: string
*                status:
*                  type: string
*                startDate:
*                 type: string
*                 format: date
*                endDate:
*                 type: string
*                 format: date
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
*         description: Bad Request
*    
*/

const getByUserId = async (req, res) => {
    const result = await leaveRequestService.getByUserId(req.params.userId);
    if (result.length > 0) {
        return res.send(result);
    } else {
        return res.status(404).send({message:message.leaveRequestApi.error.notFound});
    }
}

/**
* @swagger
* /leaveRequest:
*   post:
*     tags: [LeaveRequest]
*     security:
*       - bearerAuth: []
*     description: Apply leave request.
*     requestBody:
*       required: true
*       content:
*          multipart/form-data:
*           schema:
*             type: object
*             properties:
*                userId:
*                 type: string
*                managerId:
*                 type: string
*                leaveId:
*                  type: string
*                employeeId:
*                 type: number
*                name:
*                  type: string
*                leaveName:
*                  type: string
*                comment:
*                  type: string
*                reasonForLeave:
*                 type: string
*                startDate:
*                 type: string
*                 format: date
*                endDate:
*                 type: string
*                 format: date
*                totalDays:
*                 type: number
*                createdBy:
*                 type: string
*                updatedBy:
*                 type: string 
*     produces:
*         application/json
*     responses:
*       200:
*         description: request created successfully
*         content:
*           application/json:
*            schema:
*              type: object
*              properties:
*                userId:
*                 type: string
*                managerId:
*                 type: string
*                name:
*                 type: string
*                leaveType:
*                  type: string
*                reasonForLeave:
*                 type: string
*                status:
*                 type: string
*                startDate:
*                 type: string
*                 format: date
*                endDate:
*                 type: string
*                 format: date
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

const applyLeave = async (req, res) => {
    const leaveRequest = new leaveRequestModel({
        employeeId: req.body?.employeeId,
        userId: req.body?.userId,
        managerId: req.body?.managerId,
        leaveId: req.body?.leaveId,
        name: req.body?.name,
        comment:req.body?.comment,
        startDate: req.body?.startDate,
        status: req.body?.status,
        endDate: req.body?.endDate, 
        totalDays: req.body?.totalDays,
        createdBy: req.body?.createdBy,
        updatedBy: req.body?.updatedBy,
        reasonForLeave: req.body?.reasonForLeave,
    })
 
    const result = await leaveRequestService.applyLeave(leaveRequest);
    return res.send(result);
}

/**
* @swagger
*  /leaveRequest/{requestId}:
*  put:
*     description: Update an existing request using its requestId.
*     tags: [LeaveRequest]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: requestId
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
*                comment:
*                  type: string
*     responses:
*       '200':
*         description: Success
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'Request updated successfully'
*       '404':
*         description: No data found
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'Request not found'
*       400:
*         description: Bad Request
*/

const updateRequest = async (req, res) => {
    const leaveRequest = ({
      comment:req.body?.comment
    })

    const result = await leaveRequestService.updateRequest(req.params.requestId, leaveRequest);
    if (result.modifiedCount === 1) {
        return res.send({ message: message.leaveRequestApi.success.updateRecord });
    }
    else {
        return res.status(404).json({ message: message.leaveRequestApi.error.notFound });
    }
}

/**
* @swagger
*  /leaveRequest/changeStatus/{requestId}:
*  put:
*     description: chnage request status using requestId.
*     tags: [LeaveRequest]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: requestId
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
*                status:
*                  type: string
*                  enum:
*                    - Pending
*                    - Approved
*                    - Rejected 
*     responses:
*       '200':
*         description: Success
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'Request updated successfully'
*       '404':
*         description: No data found
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'Request not found'
*       400:
*         description: Bad Request
*/

const changeStatus = async (req, res) => {
    const result = await leaveRequestService.changeStatus(req.params.requestId, req.body.status);
    if (result.modifiedCount === 1) {
        return res.send({ message:message.leaveRequestApi.success.changeStatus});
    } else {
        return res.status(404).send({ message: message.leaveRequestApi.error.notFound });
    }
}

const getRequestByStatus = async (req, res) => {
    const result = await leaveRequestService.getRequestByStatus(req.params.userId);
    if (result.length > 0) {
        return res.send(result);
    } else {
        return res.status(404).send({message:message.leaveRequestApi.error.notFound});
    }
}

/**
* @swagger
* /leaveRequest/{managerId}:
*   get:
*     description: Retrieve leave requests using managerId.
*     tags: [LeaveRequest]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: managerId
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
*                userId:
*                 type: string
*                managerId:
*                 type: string
*                employeeId:
*                 type: string
*                leaveId:
*                 type: string
*                name:
*                 type: string
*                leaveName:
*                  type: string
*                reasonForLeave:
*                 type: string
*                comment:
*                  type: string
*                status:
*                  type: string
*                startDate:
*                 type: string
*                 format: date
*                endDate:
*                 type: string
*                 format: date
*                totalDays:
*                  type: number
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
*         description: Bad Request
*    
*/

const getByManagerId = async (req, res) => {
    const result = await leaveRequestService.getByManagerId(req.params.managerId);
    if (result.length > 0) {
        return res.send(result);
    } else {
        return res.status(404).send({message:message.leaveRequestApi.error.notFound});
    }
}

module.exports = { getByManagerIdAndStatus, applyLeave, getByUserId, updateRequest, changeStatus, getByRequestId, getRequestByStatus, getByManagerId };