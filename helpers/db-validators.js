
const Role = require('../models/role');

const isValidRole = async(role = '') => {
    const existRole = await Role.findOne({role});
    if(!existRole) {
        throw new Error(`The role ${role} isn´t registered on the database`)
    }
}

module.exports = {
    isValidRole
}
