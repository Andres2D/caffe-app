const { response, request } = require('express');

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

const usersPost = (req, res = response) => {

    const {name, age} = req.body;

    res.status(201).json({
        ok: true,
        msg: 'POST - api',
        name,
        age
    });
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