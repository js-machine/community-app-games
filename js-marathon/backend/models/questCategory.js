'use strict';
let dbConfig = require('../config/database.config.json');

module.exports = function(connect, DataTypes) {
    let Category = connect.define(dbConfig.questCategoriesModel, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoryDifficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
            },
        categoryName: {
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
    }, {
        freezeTableName: true,
        tableName: dbConfig.questCategoriesTable
    });

    return Category;
};