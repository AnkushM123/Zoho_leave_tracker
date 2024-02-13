const leaveRequestModel = require('../schema/leaveRequest-schema');

const getByManagerIdAndStatus = async function (id , status) {
    return await leaveRequestModel.find({ $and: [{ managerId: id }, { status: status }] });
}

const getByUserId = async function (id) {
    return await leaveRequestModel.find({ userId: id });
} 

const getByManagerId = async function (id) {
    return await leaveRequestModel.find({ $and: [{ managerId: id }, { status: { $nin: [3, 0] } }] })
}

const getByRequestId = async function (id) {
    return await leaveRequestModel.find({ _id: id });
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

const getRequestByStatus = async function (id) {
    return await leaveRequestModel.find({ $and: [{ userId: id }, { status: 0 }] });
}

module.exports = { getByManagerIdAndStatus, getByUserId, applyLeave, updateRequest, changeStatus, getByRequestId, getRequestByStatus, getByManagerId}