const { response } = require("express");
const { Category } = require('../models');

const getCategories = async(req, res = response) => {
    try {

        const {limit = 10, from = 1} = req.query;
        const query = {status: true};

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                    .skip(Number(from))
                    .limit(Number(limit))
                    .populate('user', 'name email')
        ]);

        res.json({
            ok: true,
            total,
            categories
        });
    }catch(err) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

const createCategory = async(req, res = response) => {
    try {
        const name = req.body.name.toUpperCase();
        const categoryDB = await Category.findOne({name});

        if(categoryDB) {
            return res.status(400).json({
                ok: false,
                msg: 'The category already exist'
            });
        }

        //Generate data to save
        const data = {
            name,
            user: req.user._id
        }

        // Save to DB
        const category = new Category(data);
        await category.save();

        res.status(201).json({
            ok: true,
            category
        })

    } catch(err) {

        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

module.exports = {
    createCategory,
    getCategories
}
