const roleModel = require('../schema/role-schema');

const getById = async function (id) {
    return await roleModel.find({ _id: id });
}

const get = async function () {
    return await roleModel.find({});
}

module.exports = { getById, get }
