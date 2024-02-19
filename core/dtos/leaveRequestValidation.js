const yup = require('yup');
const regex = require('../constant/regex');
const message = require('../constant/messages');

const mongoIdSchema = yup.object().shape({
    requestId: yup.string().required().matches(regex.mongoIdRegex, message.leaveRequestApi.error.invalidRequestId),
});

const getByManagerIdSchema = yup.object().shape({
    managerId: yup.string().required().matches(regex.mongoIdRegex, message.leaveRequestApi.error.invalidManagerId),
});

const getByUserIdSchema = yup.object().shape({
    userId: yup.string().required().matches(regex.mongoIdRegex, message.leaveRequestApi.error.invalidUserId),
});

const applyLeaveSchema = yup.object().shape({
    userId: yup.string().required().matches(regex.mongoIdRegex, message.leaveRequestApi.error.invalidUserId),
    managerId: yup.string().required().matches(regex.mongoIdRegex, message.leaveRequestApi.error.invalidManagerId),
    leaveId: yup.string().required(),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
    createdBy: yup.string().required(),
    updatedBy: yup.string().required(),
});

const updateRequestSchema = yup.object().shape({
    leaveType: yup.string().required(),
    reasonForLeave: yup.string().required(),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
    createdBy: yup.string().required(),
    updatedBy: yup.string().required(),
});

const changeStatusSchema = yup.object().shape({
    status: yup.number().required(),
});

module.exports = { mongoIdSchema, getByManagerIdSchema, getByUserIdSchema, applyLeaveSchema, updateRequestSchema, changeStatusSchema }