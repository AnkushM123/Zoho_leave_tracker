const requestModel = require('../schema/request-schema');


const getRequestByEmail = async function (_email) {
    try {
        const data = await requestModel.find({ managerEmail: _email })
        return data;
    } catch (err) {
        console.log(err);
    }
}

const createRequest = async function (request) {
    try {
        const data = await requestModel.create(request)
        return data;
    } catch (err) {
        console.log(err);
    }
}

const deleteRequest = async function (id) {
    try {
        const data = await requestModel.deleteOne({ user_id: id })
        return data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getRequestByEmail, deleteRequest, createRequest}