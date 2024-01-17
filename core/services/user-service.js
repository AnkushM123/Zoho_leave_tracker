const userModel = require('../schema/user-schema');

const getUser = async function (id) {
    return userModel.find({ _id: id });
}

let getUserByEmail = async function (email) {
    return userModel.find({ email: email });
}

const createUser = async function (user) {
    return userModel.create(user)
}

const editUser = async function (id, _employee) {
    return userModel.updateOne({ _id: id }, { $set: _employee })
}

const getUserByRole = async function (id) {
    return userModel.find({ role: { $size: id } })
}

const changePassword = async function (_email, _password) {
    return userModel.findOneAndUpdate({ email: _email }, { $set: { password: _password } })
}

module.exports = { getUser, editUser, createUser, getUserByEmail, getUserByRole, changePassword }