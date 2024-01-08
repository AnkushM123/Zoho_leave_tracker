const requestService = require('../core/services/request-service')
const validator = require('validator');
const requestModel = require('../core/schema/request-schema');
const { request } = require('express');


/**
* @swagger
* /request/{id}:
*   get:
*     description: Retrieve requests from the server.
*     tags: [Request]
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
*                userId:
*                 type: string
*                managerId:
*                 type: string
*                leaveType:
*                  type: string
*                reasonForLeave:
*                 type: string
*                startDate:
*                 type: string
*                endDate:
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

const getRequest = async (req, res) => {
  let isValidObjectId = (id) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    return objectIdRegex.test(id);
  };

  if (isValidObjectId(req.params.id)) {
    let request = await requestService.getRequest(req.params.id);
    if (request.length > 0) {
      res.send(request);
      return
    } else {
      res.status(404).send('request not found')
    }
  } else {
    res.status(400).send("please enter valid id");
  }
}

/**
* @swagger
* /request/user/{id}:
*   get:
*     description: Retrieve requests of users from the server.
*     tags: [Request]
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
*                userId:
*                 type: string
*                managerId:
*                 type: string
*                leaveType:
*                  type: string
*                reasonForLeave:
*                 type: string
*                startDate:
*                 type: string
*                endDate:
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

const getUserRequest = async (req, res) => {
  let isValidObjectId = (id) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    return objectIdRegex.test(id);
  };

  if (isValidObjectId(req.params.id)) {
    let request = await requestService.getUserRequest(req.params.id);
    if (request.length > 0) {
      res.send(request);
      return
    } else {
      res.status(404).send('request not found')
    }
  } else {
    res.status(400).send("please enter valid id");
  }
}

/**
* @swagger
* /request/{id}:
*   post:
*     tags: [Request]
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
*                managerId:
*                 type: string
*                leaveType:
*                  type: string
*                  enum:
*                    - compensantoryOff
*                    - forgotIdCard
*                    - outOfOfficeOnDuty
*                    - paidLeave
*                    - unpaidLeave
*                    - workFromHome
*                reasonForLeave:
*                 type: string
*                startDate:
*                 type: string
*                endDate:
*                 type: string
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
*                leaveType:
*                  type: string
*                reasonForLeave:
*                 type: string
*                startDate:
*                 type: string
*                endDate:
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

const createRequest = async (req, res) => {
  let isValidObjectId = (id) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    return objectIdRegex.test(id);
  }

  if (!req.body.managerId.trim() || !req.body.leaveType.trim() || !req.body.reasonForLeave.trim() || !req.body.startDate.trim() || !req.body.endDate.trim() || !req.body.createdBy.trim() || !req.body.updatedBy.trim()) {
    res.status(400).send("All fields are required");
    return
  }

  if (isValidObjectId(req.params.id)) {

    const request = new requestModel({
      userId: req.params.id,
      managerId: req.body.managerId,
      leaveType: req.body.leaveType,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy,
      reasonForLeave: req.body.reasonForLeave
    })

    const data = await requestService.createRequest(request);
    res.send(data);
  } else {
    res.status(400).send("Invalid Id format");
  };
}


/**
* @swagger
* /request/{id}:
*  delete:
*     description: delete an existing request using its ID.
*     tags: [Request]
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
*               example: 'request deleted successfully' 
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

const deleteRequest = async (req, res) => {
  let isValidObjectId = (id) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id);
  };

  if (isValidObjectId(req.params.id)) {
    let data = await requestService.deleteRequest(req.params.id);
    if (data.deletedCount > 0) {
      res.send("request deleted successfully");
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
*  /request/{id}:
*  put:
*     description: Update an existing request using its ID.
*     tags: [Request]
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
*         description: Invalid Id
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'Invalid Id format'
*/

const editRequest = async (req, res) => {
  let isValidObjectId = (id) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    return objectIdRegex.test(id);
  }


  if (isValidObjectId(req.params.id)) {
    let request = ({
      status: req.body.status
    })
    const data = await requestService.editRequest(req.params.id, request);
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



module.exports = { getRequest, createRequest, deleteRequest, getUserRequest, editRequest };