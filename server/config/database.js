const { Sequelize } = require('sequelize');

module.exports = new Sequelize('capstone', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});