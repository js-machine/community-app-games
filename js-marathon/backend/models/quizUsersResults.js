'use strict';
let dbConfig = require('../config/database.config.json');

module.exports = function(connect, DataTypes) {
    let quizUsersResults = connect.define(dbConfig.quizUsersResultsModel, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        spentTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        quizUserScore: {
            type:  DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
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
        tableName: dbConfig.quizUsersResultsTable,
        classMethods:{
            associate:function(models){
                // skip associating during working with DB
                if (global.insertingToDBMode) return;

                quizUsersResults.belongsTo(models.users, { foreignKey:'userId'} );
            }
        }
    });

    return quizUsersResults;
};