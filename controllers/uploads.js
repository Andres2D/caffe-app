const { response } = require("express");
const {uploadFile} = require('../helpers');

const loadFile = async(req, res = response) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
          res.status(400).json({
              ok: false,
              msg: 'No files were uploaded.'
            });
          return;
        }
        
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
        res.json({
            ok: true,
            id,
            collection
        })

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
