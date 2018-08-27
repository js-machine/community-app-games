'use strict';
let dbConfig = require('../config/database.config.json');

module.exports = function(connect, DataTypes) {
    let Task = connect.define(dbConfig.questTasksModel, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        taskQuestion: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        taskHeader:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        taskFooter:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        taskPoints:{
            type: DataTypes.INTEGER,
            allowNull: false,
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
        freezeTableName: true,
        tableName: dbConfig.questTasksTable
    });
    return Task;
};