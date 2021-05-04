const Sequelize = require('sequelize');
const db = require('../config/database');


const Medicine = db.define('Medicine', {
    // Model attributes are defined here
    MedName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    MedDesc: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    Quant: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    }
});

Medicine.associate = (models) => {
    // 1:M
    Medicine.belongsTo(models.MedType, {
        foreignKey: 'MedID',
    });

    Medicine.belongsTo(models.Pharmacy, {
        foreignKey: 'PharmaID',
    });
};

module.exports = Medicine;