const leaveRecordModel = require('../schema/leaveRecord-schema');

const getById = async function (leaveId, userId) {
    return await leaveRecordModel.find({ $and: [{ leaveId: leaveId }, { userId: userId }] });
}

const get = async function (userId) {
    return await leaveRecordModel.find({ userId: userId });
}

const createLeaveRecord = async function (leaveRecord) {
    return await leaveRecordModel.create(leaveRecord);
}

const editLeaveRecord = async function (userId, leaveId, leave) {
    return await leaveRecordModel.updateOne({ $and: [{ userId: userId }, { leaveId: leaveId }] }, { $set: leave });
}

module.exports = { get, getById, createLeaveRecord, editLeaveRecord }