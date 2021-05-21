const Sequelize = require('sequelize');
const db = require('../config/database');


const Pharmacist = db.define('Pharmacy', {
    // Model attributes are defined here
    FName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    LName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Pharmacist.associate = (models) => {
    // 1:M
    Pharmacist.belongsTo(models.Pharmacy, {
        foreignKey: 'PharmaID',
    });
};

module.exports = Pharmacist;