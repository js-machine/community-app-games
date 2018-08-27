'use strict';
let dbConfig = require('../config/database.config.json');

module.exports = function (connect, DataTypes) {
    let AppToken = connect.define(dbConfig.appTokenModel, {
        token: {
            type: DataTypes.CHAR(50),
            primaryKey: true
        },
    }, {
            freezeTableName: true, // If freezeTableName is true, sequelize will not try to alter the DAO name to get the table name. Otherwise, the model name will be pluralized
            tableName: dbConfig.appTokenTable, //Defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
        });
    return AppToken;
};
