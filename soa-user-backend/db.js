const {Sequelize} = require('sequelize');
const oracledb = require('oracledb');

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'oracle',
        logging: false,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialectOptions: oracledb
    }
)