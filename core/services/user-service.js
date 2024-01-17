const userModel = require('../schema/user-schema');

const getUserByEmail = async function (email) {
    return userModel.find({ email: email });
}

const createUser = async function (user) {
    return userModel.create(user)
}

module.exports = { getUserByEmail, createUser };