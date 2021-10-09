
const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verify if the email exist
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User / Password are invalid - email'
            });
        }

        // Verify if the user is active
        if(!user.status) {
            return res.status(400).json({
                ok: false,
                msg: 'User / Password are invalid - status: false'
            });
        }

        // Verify the password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'User / Password are invalid - password'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });

    }catch(ex) {
        console.log(ex);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

module.exports = {
    login
}
