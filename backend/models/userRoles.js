
'use strict';
let dbConfig = require('../config/database.config.json');

module.exports = function(connect, DataTypes) {
    let userRoles = connect.define(dbConfig.userRolesModel, {
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
        roleId: {
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
        freezeTableName: true, // If freezeTableName is true, sequelize will not try to alter the DAO name to get the table name. Otherwise, the model name will be pluralized
        tableName: dbConfig.userRolesTable, //Defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
        classMethods:{
            associate:function(models){
                // skip associating during working with DB
                if (global.insertingToDBMode) return;

                userRoles.belongsTo(models.users, { foreignKey:'userId', onDelete: "CASCADE", onUpdate: 'CASCADE'} );
                userRoles.belongsTo(models.roles, { foreignKey:'roleId', onDelete: "CASCADE", onUpdate: 'CASCADE'} );
            }
        }
    });
    return userRoles;
};