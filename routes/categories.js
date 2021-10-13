const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getCategories } = require('../controllers/categories');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

/**
 * {{url}}/api/categories
 */

// Get all the categories - public
router.get('/', getCategories);

// Get category by id - public
router.get('/:id', (req, res) =>{
    res.json({
        ok: true,
        msg: 'GET - ID'
    })
});

// Create category - with a valid token
router.post('/', [
    validateJWT,
    check('name', 'The name is required').notEmpty(),
    validateFields
], createCategory);

// Update category by id - with a valid token
router.put('/:id', (req, res) =>{
    res.json({
        ok: true,
        msg: 'PUT'
    })
});

// Delete category by id - with a valid token only ADMIN
router.delete('/:id', (req, res) =>{
    res.json({
        ok: true,
        msg: 'DELETE'
    })
});

module.exports = router;
