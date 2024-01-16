const userModel = require('../schema/user-schema');

const getUser = async function (id) {
    try {
        const data = await userModel.find({_id: id});
        return data;
    } catch (err) {
        console.log(err);
    }
}

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

const editUser = async function (id, _employee) {
    try {
        const data = await userModel.updateOne({ _id: id }, { $set: _employee })
        return data;
    } catch (err) {
        console.log(err);
    }
}

const getUserByRole = async function (id) {
    try {
        const data = await userModel.find({ role: { $size: id } })
        return data;
    } catch (err) {
        console.log(err);
    }
}

const changePassword = async function (_email, _password) {
    try {
        const data = await userModel.findOneAndUpdate({ email: _email }, { $set: { password: _password } })
        return data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getUser, editUser, createUser, getUserByEmail, getUserByRole, changePassword }