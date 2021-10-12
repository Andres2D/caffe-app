const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

/**
 * {{url}}/api/categories
 */

// Get all the categories - public
router.get('/', (req, res) =>{
    res.json({
        ok: true,
        msg: 'GET'
    })
});

// Get category by id - public
router.get('/:id', (req, res) =>{
    res.json({
        ok: true,
        msg: 'GET - ID'
    })
});

// Create category - with a valid token
router.post('/', (req, res) =>{
    res.json({
        ok: true,
        msg: 'POST'
    })
});

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
