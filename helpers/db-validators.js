
const Role = require('../models/role');
const User = require('../models/user');
const Category = require('../models/category');

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

const validUserId = async(id = '') => {
    const userExist = await User.findById(id);
    if(!userExist) {
        throw new Error(`The id does not exist: [${id}]`);
    }
}

const validCategory = async(id = '') => {
    const query = {status: true};
    const categoryExist = await Category.findById(id)
                                        .where(query);
    if(!categoryExist) {
        throw new Error(`The category not exist`);
    }
}

module.exports = {
    isValidRole,
    validEmail,
    validUserId,
    validCategory
}
