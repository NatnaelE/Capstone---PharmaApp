const Sequelize = require('sequelize');
const db = require('../config/database');


const PharmacyType = db.define('PharmacyType', {
    // Model attributes are defined here
    PharmacyTypeName: {
      type: Sequelize.STRING,
      allowNull: false
    }
});

PharmacyType.associate = (models) => {
  PharmacyType.hasMany(models.Pharmacy);
};

module.exports = PharmacyType;