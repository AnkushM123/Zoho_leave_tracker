const leaveRequestModel = require('../schema/leaveRequest-schema');

const getByManagerId = async function (id) {
    return await leaveRequestModel.find({ managerId: id });
}

const getByUserId = async function (id) {
    return await leaveRequestModel.find({ userId: id });
}

const applyLeave = async function (request) {
    return await leaveRequestModel.create(request);
}

const updateRequest = async function (id, request) {
    return await leaveRequestModel.updateOne({ _id: id }, { $set: request });
}

const changeStatus = async function (id, status) {
    return await leaveRequestModel.updateOne({ _id: id }, { $set: { status: status } });
}

module.exports = { getByManagerId, getByUserId, applyLeave, updateRequest, changeStatus }