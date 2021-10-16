const { Router } = require('express');
const { check } = require('express-validator');
const { loadFile, updateImage } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');
const { validateFields, validateFile } = require('../middlewares');

const router = Router();

router.post('/', validateFile, loadFile);
router.put('/:collection/:id', [
    validateFile,
    check('id', 'Invalid Id').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users','products'])),
    validateFields
], updateImage);

module.exports = router;
