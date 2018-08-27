'use strict';
let dbConfig = require('../config/database.config.json');

module.exports = function(connect, DataTypes) {
    let Question = connect.define(dbConfig.quizQuestionsModel, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        questionText: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        questionType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        questionValue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
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
        tableName: dbConfig.quizQuestionsTable
    });

    return Question;
};