const userModel = require('../schema/user-schema');

let getUserByEmail = async function (email) {
    return userModel.find({ email: email });
}

let createUser = async function (user) {
    return userModel.create(user)
}

module.exports = { getUserByEmail, createUser };