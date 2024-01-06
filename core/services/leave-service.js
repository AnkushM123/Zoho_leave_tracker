const leaveModel = require('../schema/leave-schema');


const getLeaveById = async function (id) {
    try {
        const data = await leaveModel.find({ user_id: id })
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

const editLeave = async function (id, leave) {
    try {
        const data = await leaveModel.updateOne({ user_id: id }, { $set: leave })
        return data;
    } catch (err) {
        console.log(err);
    }
}

const deleteLeave = async function (id) {
    try {
        const data = await leaveModel.deleteOne({ user_id: id })
        return data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getLeaveById, createLeave, editLeave, deleteLeave}