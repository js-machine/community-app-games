'use strict';
let dbConfig = require('../config/database.config.json');

module.exports = function(connect, DataTypes) {
    let Answer = connect.define(dbConfig.quizAnswersModel, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        answerText: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        isRight: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        answerPoints: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                notEmpty: true
            }
        }
    },{
        freezeTableName: true,
        tableName: dbConfig.quizAnswersTable
    });

    return Answer;
};