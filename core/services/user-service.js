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

const getUserByRole = async function (id) {
    return userModel.find({ role: { $size: id } })
}

const changePassword = async function (email, password) {
    return userModel.findOneAndUpdate({ email: email }, { $set: { password: password } })
}

module.exports = { getUser, editUser, createUser, getUserByEmail, getUserByRole, changePassword }