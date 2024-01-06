const requestService = require('../core/services/request-service')
const validator = require('validator');
const requestModel = require('../core/schema/request-schema')

  
  
/**
* @swagger
* /request:
*   post:
*     description: Retrieve user from the server.
*     tags: [Request]
*     requestBody:
*       required: true
*       content:
*          application/json:
*           schema:
*             type: object
*             properties:
*                managerEmail:
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
*                user_id:
*                 type: string
*                managerEmail:
*                 type: string
*                date:
*                 type: string
*                leaveType:
*                 type: string
*                reasonForLeave:
*                 type: string
*       404:
*         description: No data
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'No data found'
*       400:
*         description: Invalid email
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: 'Invalid email format'
*    
*/
  
  const getRequestByEmail = async (req, res) => {
    if (validator.isEmail(req.body.managerEmail)) {
        const _email = await requestService.getRequestByEmail(req.body.managerEmail);
        if (_email.length > 0) {
          res.status(200).send(_email);
          return
        } else {
          res.status(404).send("request not found");
          return
        }
      } else {
        res.status(400).send("please enter valid email");
        return
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
*                managerEmail:
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
*     produces:
*         application/json
*     responses:
*       200:
*         description: user created successfully
*         content:
*           application/json:
*            schema:
*              type: object
*              properties:
*                user_id:
*                 type: string
*                managerEmail:
*                 type: string
*                date:
*                 type: string
*                leaveType:
*                 type: string
*                reasonForLeave:
*                 type: string
*       400:
*         description: Bad request
*/
  
  const createRequest = async (req, res) => {
    console.log(req.body)
    let isValidObjectId = (id) => {
      const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  
      return objectIdRegex.test(id);
    };

    if(validator.isEmpty(req.body.managerEmail)  || validator.isEmapty(req.body.reasonForLeave) ){
      res.status(400).send("email,leave type and reason for leave are required fields");
      return
   }
 
    
    if(!validator.isEmail(req.body.managerEmail)){
        res.status(400).send("please enter valid email");
        return
    }
  
    if(isValidObjectId(req.params.id)){
    let request = new requestModel({
        user_id:req.params.id,
        managerEmail:req.body.managerEmail,
        leaveType:req.body.leaveType,
        reasonForLeave:req.body.reasonForLeave
    })
    let data = await requestService.createRequest(request);
    res.send(data);
   } else {
      res.status(400).json("Invalid Id Format");
    }
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


  
  module.exports = { getRequestByEmail, createRequest, deleteRequest};