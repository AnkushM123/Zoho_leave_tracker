const leaveModel = require('../schema/leave-schema');

const getLeaveById = async function (_id, _userId) {
    try {
        const data = await leaveModel.find({ $and: [{ leaveId: _id }, { userId: _userId }] })
        return data;
    } catch (err) {
        console.log(err);
    }
}

const getUserLeave = async function (id) {
    try {
        const data = await leaveModel.find({ userId: id })
        return data;
    } catch (err) {
        console.log(err);
    }
}


const createLeave = async function (leave) {
    try {
        const data = await leaveModel.create(leave)
        return data;
    } catch (err) {
        console.log(err);
    }
}

const editLeave = async function (_userId, _leaveId, leave) {
    try {
        const data = await requestModel.updateOne({ $and: [{ UserId: _userId }, { leaveId: _leaveId }] }, { $set: leave })
        return data;
    } catch (err) {
        console.log(err);
    }
}


module.exports = { getLeaveById, createLeave, getUserLeave, editLeave }