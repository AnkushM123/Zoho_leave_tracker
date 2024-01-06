const roleModel = require('../schema/role-schema');

const getRoleById = async function ( id ) {
    try {
        const data = await roleModel.find({ role_id: id })
        return data;
    } catch (err) {
        console.log(err);
    }
}

module.exports={getRoleById}
