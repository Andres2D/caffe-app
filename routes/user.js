const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validateFields } = require('../middlewares/validate-fields');
const {isValidRole} = require('../helpers/db-validators');

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
    check('role').custom( isValidRole ),
    validateFields
], usersPost);   
router.delete('/', usersDelete);          
router.patch('/', usersPatch);          

module.exports = router; 