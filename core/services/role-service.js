const roleModel = require('../schema/role-schema');

const getRoleById = async function (id) {
    try {
        const data = await roleModel.find({ _id: id })
        return data;
    } catch (err) {
        console.log(err);
    }
}

const getRoles = async function () {
    try {
        const data = await roleModel.find({});
        return data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getRoleById, getRoles }
