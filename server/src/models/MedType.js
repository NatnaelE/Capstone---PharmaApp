const Sequelize = require('sequelize');
const db = require('../config/database');


const MedType = db.define('MedType', {
    // Model attributes are defined here
    FullName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    GenericName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    BrandName: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Dosage: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    DosageForm: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
});


MedType.associate = (models) => {
    // 1:M
    MedType.hasMany(models.Medicine);
}

module.exports = MedType;