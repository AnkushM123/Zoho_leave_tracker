const userModel = require('../schema/user-schema');

const getUser = async function () {
    try {
        const data = await userModel.find({});
        return data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getUser};