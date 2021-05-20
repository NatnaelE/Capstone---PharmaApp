const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Medicine = require('../models/Medicine');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', (req, res) => 
    Medicine.findAll()
        .then( meds => res.render('meds', {
            meds
        }))
);


router.get('/search', (req, res) => {

    const {search_med} = req.query;

    Medicine.findAll({ where : {MedName: { [Op.like]: '%' + search_med + '%'} } })
        .then( meds => res.render('meds', {
            meds
        }))
        .catch(err => console.log(err));
});


module.exports = router;