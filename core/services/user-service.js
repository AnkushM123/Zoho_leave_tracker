const userModel = require('../schema/user-schema');

const getUser = async function (id) {
    return userModel.find({ _id: id });
}

const getUserByEmail = async function (email) {
    return userModel.find({ email: email });
}

const createUser = async function (user) {
    return userModel.create(user);
}

const editUser = async function (id, employee) {
    return userModel.updateOne({ _id: id }, { $set: employee })
}

const changePassword = async function (id, password) {
    return userModel.findOneAndUpdate({ _id: id }, { $set: { password: password } })
}

module.exports = { getUser, editUser, createUser, getUserByEmail, changePassword }