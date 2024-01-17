const userModel = require('../schema/user-schema');

const getUser = async function (id) {
    try {
        const data = await userModel.find({_id: id});
        return data;
    } catch (err) {
        console.log(err);
    }
}

let getUserByEmail = async function (email) {
    return userModel.find({ email: email });
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