//import Sequelize from 'sequelize';
const Sequelize = require('sequelize');
const db = require('./config/database');
const Country = require('./models/Country');
const Medicine = require('./models/Medicine');
const Pharmacist = require('./models/Pharmacist');
const Pharamacy = require('./models/Pharmacy');
const PharmacyType = require('./models/PharmacyType');
const User = require('./models/User');
const UserType = require('./models/UserType');
const MedType = require('./models/MedType');


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