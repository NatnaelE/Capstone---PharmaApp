const { Sequelize } = require('sequelize');

//// Local DB Config ////
// const db = new Sequelize('capstone', 'postgres', 'password', {
//     host: 'localhost',
//     dialect: 'postgres'
// });

//// EC2 DB Config ////
const db = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
{
    host: process.env.PGHOST,
    dialect: 'postgres',
    retry: {
        match: [/SequelizeConnectionRefusedError/]
    }
});

module.exports = db;