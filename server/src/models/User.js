const Sequelize = require('sequelize');
const db = require('../config/database');


const User = db.define('User', {
    // Model attributes are defined here
    FName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    LName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    DOB: {
        type: Sequelize.DATE
        // allowNull defaults to true
    }
});

User.associate = (models) => {

    User.belongsToMany(models.Pharmacy, {
        through: 'UserPharmaMapping',
        foreignKey: 'UserID'
    });

    // 1:M
    User.belongsTo(models.UserType, {
        foreignKey: 'UserTypeID',
    });
};

module.exports = User;