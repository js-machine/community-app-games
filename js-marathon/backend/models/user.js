'use strict';
let dbConfig = require('../config/database.config.json');

module.exports = function(connect, DataTypes) {
    let User = connect.define(dbConfig.usersModel, {
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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        userIcon: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
            validate: {
                notEmpty: true
            }
        },
        userColor: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
            validate: {
                notEmpty: true
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
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
        tableName: dbConfig.usersTable, //Defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
        classMethods:{
            associate:function(models){
                // skip associating during working with DB
                if (global.insertingToDBMode) return;

                User.belongsToMany(
                    models.roles,
                    {
                        through: {
                            model: models.userRoles,
                        }
                    }
                );
                User.hasMany(
                    models.userRoles
                );
            }
        }
    });
    return User;
};