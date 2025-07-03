const sequelize = require('../db');
const {DataTypes, Sequelize} = require('sequelize');

//Models

const User = sequelize.define("user", {
        user_id: {type: DataTypes.STRING(36), defaultValue: DataTypes.UUIDV4, primaryKey: true},
        name: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false, unique: true},
        number: {type: DataTypes.STRING, allowNull: true},
        password: {type: DataTypes.STRING, allowNull: false},
        access_hash: {type: DataTypes.STRING, allowNull: true},
        refresh_hash: {type: DataTypes.STRING, allowNull: true},
    },
);

const Role = sequelize.define("role", {
        role_id: {type: DataTypes.STRING(36), defaultValue: DataTypes.UUIDV4, primaryKey: true},
        name: {type: DataTypes.STRING, defaultValue: "USER", allowNull: false},
    },
);

const Session = sequelize.define("session", {
        session_id: {type: DataTypes.STRING(36), defaultValue: DataTypes.UUIDV4, primaryKey: true},
        startTime: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
        endTime: {type: DataTypes.DATE, allowNull: true},
        durationSeconds: {type: DataTypes.INTEGER, allowNull: true},
    },
);

//Relationships

//User & Role
Role.hasMany(User, {
    foreignKey: "role_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});
User.belongsTo(Role, {foreignKey: "role_id",});

//User & Session
User.hasMany(Session, {
    foreignKey: "user_id",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});
Session.belongsTo(User, {foreignKey: "user_id",});

module.exports = {
    User,
    Role,
    Session
};