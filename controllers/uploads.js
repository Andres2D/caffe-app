const { response } = require("express");
const {uploadFile} = require('../helpers');
const { User, Product } = require('../models');

const loadFile = async(req, res = response) => {
    try {        
        // Pictures
        // const name = await uploadFile(req.files, ['txt', 'md', 'pdf'], 'test');
        const name = await uploadFile(req.files, undefined, 'imgs');
        res.json({
            ok: true,
            name
        });

    }catch(err) {
        res.status(400).json({
            ok: false,
            msg: err
        });
    }
}

const updateImage = async(req, res = response) => {
    try {
        const {id, collection} = req.params;

        let model;
        switch(collection) {
            case 'users':
                model = await User.findById(id);
                if(!model) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Id not exist'
                    });
                }

                break;
            case 'products':
                model = await Product.findById(id);
                if(!model) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Id not exist'
                    });
                }
                break;
            default:
                res.status(500).json({
                    ok: false,
                    msg: 'Forgot implemet collection'
                })
        }

        const name = await uploadFile( undefined, collection);
        model.img = name;

        await model.save()

        res.json({
            ok: true,
            model
        });

    }catch(err) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

module.exports = {
    loadFile,
    updateImage
}
