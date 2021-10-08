
const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {
    const existRole = await Role.findOne({role});
    if(!existRole) {
        throw new Error(`The role ${role} isn´t registered on the database`);
    }
}

const validEmail = async(email = '') => {
    const emailExist = await User.findOne({ email });
    if(emailExist) {
        throw new Error(`The email ${email} is currently used by another user`);
    }
}

module.exports = {
    isValidRole,
    validEmail
}
