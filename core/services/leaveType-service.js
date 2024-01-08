const leaveTypeModel = require('../schema/leaveType-schema');

const getLeaveById = async function (id) {
    try {
        const data = await leaveTypeModel.find({ _id: id })
        return data;
    } catch (err) {
        console.log(err);
    }
}

const getLeave = async function () {
    try {
        const data = await leaveTypeModel.find({})
        return data;
    } catch (err) {
        console.log(err);
    }
}

const createLeave = async function (leave) {
    try {
        const data = await leaveTypeModel.create(leave)
        return data;
    } catch (err) {
        console.log(err);
    }
}

const deleteLeave = async function (id) {
    try {
        const data = await leaveTypeModel.deleteOne({ _id: id })
        return data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getLeaveById, createLeave, deleteLeave, getLeave }