const Sequelize = require('sequelize');
const db = require('../config/database');


const UserType = db.define('UserType', {
    // Model attributes are defined here
    UserTypeName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Desc: {
      type: Sequelize.STRING
      // allowNull defaults to true
    }
});

UserType.associate = (models) => {
    UserType.hasMany(models.User);
};

module.exports = UserType;