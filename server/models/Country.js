const Sequelize = require('sequelize');
const db = require('../config/database');


const Country = db.define('Country', {
    // Model attributes are defined here
    CountryName: {
      type: Sequelize.STRING,
      allowNull: false
    }
});

Country.associate = (models) => {
  // 1:M
  Country.hasMany(models.Pharmacy);
};

module.exports = Country;