const leaveTypeModel = require('../schema/leaveType-schema');

const getById = async function (id) {
    return await leaveTypeModel.find({ _id: id });
}

const get = async function () {
    return await leaveTypeModel.find({})
}

module.exports = { getById, get }