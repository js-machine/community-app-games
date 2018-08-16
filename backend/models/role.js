
'use strict';
let dbConfig = require('../config/database.config.json');

module.exports = function(connect, DataTypes) {
    let Role = connect.define(dbConfig.rolesModel, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Date.now(),
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Date.now(),
        }
    },{
        freezeTableName: true, // If freezeTableName is true, sequelize will not try to alter the DAO name to get the table name. Otherwise, the model name will be pluralized
        tableName: dbConfig.rolesTable //Defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
    });
    return Role;
};