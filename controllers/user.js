const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const usersGet = (req = request, res = response) => {

    const { q, name = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        ok: true,
        msg: 'GET - api - controller',
        q,
        name,
        apikey,
        page,
        limit
    });
}

const usersPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        ok: true,
        msg: 'PUT - api',
        id
    });
}

const usersPost = async(req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    try {
        // Verify if the email exist
        const emailExist = await User.findOne({ email });

        if(emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'The email is currently used by another user'
            });
        }
    
        // Has password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
    
        // Save on DB
        await user.save();
        res.status(201).json({
            ok: true,
            msg: 'POST - api',
            user
        });
    }catch(err) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error ' + err
        });
    }
}

const usersDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'DELETE - api'
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'PATCH - api'
    });
}
 
module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}