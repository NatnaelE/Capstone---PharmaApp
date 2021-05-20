//import Sequelize from 'sequelize';
const Sequelize = require('sequelize');
const db = require('./src/config/database');
const Country = require('./src/models/Country');
const Medicine = require('./src/models/Medicine');
const Pharmacist = require('./src/models/Pharmacist');
const Pharamacy = require('./src/models/Pharmacy');
const PharmacyType = require('./src/models/PharmacyType');
const User = require('./src/models/User');
const UserType = require('./src/models/UserType');
const MedType = require('./src/models/MedType');


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