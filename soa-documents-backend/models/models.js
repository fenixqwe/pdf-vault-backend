const sequelize = require('../db');
const {DataTypes, Sequelize} = require('sequelize');

//Models

const Document = sequelize.define("document", {
        document_id: {type: DataTypes.STRING(36), defaultValue: DataTypes.UUIDV4, primaryKey: true},
        name: {type: DataTypes.STRING, allowNull: false},
        type: {type: DataTypes.STRING, allowNull: false, unique: true},
        content: {type: DataTypes.BLOB('long'), allowNull: false},
        user_id: {type: DataTypes.STRING(36), allowNull: false},
    },
);

module.exports = {
    Document
};