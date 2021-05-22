const express = require('express');
const router = express.Router();
const MedType = require('../models/MedType');
// const Sequelize = require('sequelize');
// // const Op = Sequelize.Op;


router.get('/', (req, res) => 
    MedType.findAll()
        .then(meds => res.json(meds))
        .catch(console.error)
);

router.post('/', (req, res) => {
  const body = req.body
  console.log(req.body)
  MedType.bulkCreate(body)
    .then(res.send("Inserted all records successfully"))
    .catch(console.error)
});


// router.get('/search', (req, res) => {

//     const {search_med} = req.query;

//     MedType.findAll({ where : {MedName: { [Op.like]: '%' + search_med + '%'} } })
//         .then( meds => res.render('meds', {
//             meds
//         }))
//         .catch(err => console.log(err));
// });


module.exports = router;