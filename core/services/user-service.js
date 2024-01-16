const userModel = require('../schema/user-schema');

const getUserByEmail = async function (_email) {
    try {
        const data = await userModel.find({ email: _email })
        return data;
    } catch (err) {
        console.log(err);
    }
}

const createUser = async function (user) {
    try {
        const data = await userModel.create(user)
        return data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getUserByEmail, createUser };