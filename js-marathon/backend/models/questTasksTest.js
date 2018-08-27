'use strict';
let dbConfig = require('../config/database.config.json');

module.exports = function(connect, DataTypes) {
    let TasksTest = connect.define(dbConfig.questTasksTestsModel, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            taskId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            paramInput: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            paramOutput: {
                type: DataTypes.TEXT,
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
        tableName: dbConfig.questTasksTestsTable
    });
    return TasksTest;
};
