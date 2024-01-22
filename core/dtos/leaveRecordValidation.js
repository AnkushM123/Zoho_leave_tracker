const yup = require('yup');
const regex = require('../constant/regex');
const message = require('../constant/messages');

const mongoIdSchema = yup.object().shape({
    leaveId: yup.string().required().matches(regex.mongoIdRegex, message.leaveRecordApi.error.invalidLeaveId),
});

const userAllRecordSchema = yup.object().shape({
    userId: yup.string().required().matches(regex.mongoIdRegex, message.leaveRecordApi.error.invalidUserId),
});

const userParticularRecordSchema = yup.object().shape({
    userId: yup.string().required().matches(regex.mongoIdRegex, message.leaveRecordApi.error.invalidUserId),
    leaveId: yup.string().required().matches(regex.mongoIdRegex, message.leaveRecordApi.error.invalidLeaveId),
});

const createRecordSchema = yup.object().shape({
    userId: yup.string().required().matches(regex.mongoIdRegex, message.leaveRecordApi.error.invalidUserId),
    leaveId: yup.string().required().matches(regex.mongoIdRegex, message.leaveRecordApi.error.invalidLeaveId),
    balance: yup.number().required().min(0),
    createdBy: yup.string().required(),
    updatedBy: yup.string().required(),
});

const editLeaveRecordSchema = yup.object().shape({
    userId: yup.string().required().matches(regex.mongoIdRegex, message.leaveRecordApi.error.invalidUserId),
    balance: yup.number().required().min(0),
    updatedBy: yup.string().required(),
});

module.exports = { mongoIdSchema, userAllRecordSchema, userParticularRecordSchema, createRecordSchema, editLeaveRecordSchema }