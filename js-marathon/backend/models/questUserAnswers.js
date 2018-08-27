'use strict';
let dbConfig = require('../config/database.config.json');

module.exports = function(sequelize, DataTypes) {
    let QuestUserAnswers = sequelize.define(dbConfig.questUserAnswersModel, {
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
        taskId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        taskSpentTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        taskPoints: {
            type:  DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        taskUserCode: {
            type:  DataTypes.STRING,
            allowNull: false
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
        tableName: dbConfig.questUserAnswersTable,
        classMethods:{
            associate:function(models){
                // skip associating during working with DB
                if (global.insertingToDBMode) return;

                QuestUserAnswers.belongsTo(models.users, { foreignKey:'userId'} );
            }
        }
    });

    return QuestUserAnswers;
};