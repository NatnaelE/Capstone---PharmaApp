//import Sequelize from 'sequelize';
const Sequelize = require('sequelize');
const db = require('../config/database');
const Country = require('./Country');
const Medicine = require('./Medicine');
const Pharmacist = require('./Pharmacist');
const Pharamacy = require('./Pharmacy');
const PharmacyType = require('./PharmacyType');
const User = require('./User');
const UserType = require('./UserType');
const MedType = require('./MedType');


const models = {
    User: User,
    PharamacyType: PharmacyType,
    Pharmacy: Pharamacy,
    Pharmacist: Pharmacist,
    Medicine: Medicine, 
    Country: Country,
    UserType: UserType,
    MedType: MedType
}

Object.keys(models).forEach((modelName) => {
    if('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.Sequelize = Sequelize;
models.sequelize = db;

module.exports = models;