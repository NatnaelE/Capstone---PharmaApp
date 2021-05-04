const Sequelize = require('sequelize');
const db = require('../config/database');


const Pharmacy = db.define('Pharmacy', {
    // Model attributes are defined here
    PharmaName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Address: {
      type: Sequelize.STRING
      // allowNull defaults to true
    }
});

Pharmacy.associate = (models) => {
    // 1:M

    Pharmacy.hasMany(models.Pharmacist);

    Pharmacy.hasMany(models.Medicine);
    
    Pharmacy.belongsTo(models.Country, {
        foreignKey: 'CountryID',
    });

    Pharmacy.belongsTo(models.PharamacyType, {
        foreignKey: 'PharamacyTypeID',
    });

    Pharmacy.belongsToMany(models.User, {
        through: 'UserPharmaMapping',
        foreignKey: 'PharmaID'
    });
};

module.exports = Pharmacy;