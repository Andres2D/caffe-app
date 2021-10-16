const { response } = require("express");
const {uploadFile} = require('../helpers');

const loadFile = async(req, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      res.status(400).json({
          ok: false,
          msg: 'No files were uploaded.'
        });
      return;
    }
    
    // Pictures
    const name = await uploadFile(req.files);

    res.json({
        ok: true,
        name
    });
}

module.exports = {
    loadFile
}
