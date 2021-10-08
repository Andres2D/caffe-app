const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validateFields } = require('../middlewares/validate-fields');
const Role = require('../models/role');

const { 
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
} = require('../controllers/user');

router.get('/', usersGet);          
router.put('/:id', usersPut);         
router.post('/', [
    check('name', 'The name is required').notEmpty(),
    check('password', 'The password require more than 6 letters').isLength({min: 6}),
    check('email', 'The email isn´t valid').isEmail(),
    // check('role', 'The role is not valid ').isIn(['USER_ROLE', 'ADMIN_ROLE']),
    check('role').custom(async(role = '') => {
        const existRole = await Role.findOne({role});
        if(!existRole) {
            throw new Error(`The role ${role} isn´t registered on the database`)
        }
    }),
    validateFields
], usersPost);   
router.delete('/', usersDelete);          
router.patch('/', usersPatch);          

module.exports = router; 