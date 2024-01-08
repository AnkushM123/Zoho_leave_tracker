const requestModel = require('../schema/request-schema');

const getRequest = async function (id) {
    try {
        const data = await requestModel.find({ managerId: id })
        return data;
    } catch (err) {
        console.log(err);
    }
}

const getUserRequest = async function (id) {
    try {
        const data = await requestModel.find({ userId: id })
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
        const data = await requestModel.deleteOne({ userId: id })
        return data;
    } catch (err) {
        console.log(err);
    }
}

const editRequest = async function (id, request) {
    try {
        const data = await requestModel.updateOne({ _id: id }, { $set: request })
        return data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getRequest, deleteRequest, createRequest, getUserRequest, editRequest }