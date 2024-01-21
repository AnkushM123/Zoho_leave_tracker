const userModel = require('../schema/user-schema');

const get = async function (id) {
    return userModel.find({ _id: id });
}

const getByEmail = async function (email) {
    return userModel.find({ email: email });
}

const create = async function (user) {
    return userModel.create(user);
}

const update = async function (id, employee) {
    return userModel.updateOne({ _id: id }, { $set: employee })
}

const changePassword = async function (id, password) {
    return userModel.findOneAndUpdate({ _id: id }, { $set: { password: password } })
}

module.exports = { get, update, create, getByEmail, changePassword }