const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validateFields } = require('../middlewares/validate-fields');
const {
    isValidRole,
    validEmail,
    validUserId
} = require('../helpers/db-validators');

const { 
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
} = require('../controllers/user');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdmin, hasRole } = require('../middlewares/validate-roles');

router.get('/', usersGet);     

router.put('/:id', [
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(validUserId),
    check('role').custom( isValidRole ),
    validateFields
], usersPut); 

router.post('/', [
    check('name', 'The name is required').notEmpty(),
    check('password', 'The password require more than 6 letters').isLength({min: 6}),
    check('email', 'The email isn´t valid').isEmail(),
    check('email').custom( validEmail ),
    // check('role', 'The role is not valid ').isIn(['USER_ROLE', 'ADMIN_ROLE']),
    check('role').custom( isValidRole ),
    validateFields
], usersPost);   

router.delete('/:id', [
    validateJWT,
    // isAdmin,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(validUserId),
    validateFields
], usersDelete);          
     

module.exports = router; 