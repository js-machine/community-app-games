'use strict';

let fs = require('fs');
let path = require('path');
let Sequelize = require('sequelize');
let connect;

let db = {};
db.dbConfig = require('../config/database.config.json');


if (process.env.DATABASE_URL) {
    connect = new Sequelize(process.env.DATABASE_URL);
} else {
    connect = new Sequelize(db.dbConfig.database, db.dbConfig.connection.user, db.dbConfig.connection.password, {
        dialect: 'mysql'
    });
}

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function (file) {
        let model = connect['import'](path.join(__dirname, file));
        console.log('file:' + file);
        console.log('model.name:' + model.name);
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.connect = connect;
db.Sequelize = Sequelize;

// db.connect.query('USE ' + db.dbConfig.database);

db.quizQuestions.hasMany(db.quizAnswers, {
    foreignKey: 'questionId',
    as: 'answers',
    foreignKeyConstraint: true
});

db.quizUsersResults.hasMany(db.users, {
    as: 'users',
    foreignKey: 'id',
    foreignKeyConstraint: true
});

db.userRoles.hasMany(db.users, {
    as: 'users',
    foreignKey: 'id',
    foreignKeyConstraint: true
});

db.userRoles.hasMany(db.roles, {
    as: 'roles',
    foreignKey: 'id',
    foreignKeyConstraint: true
});

db.questCategories.hasMany(db.questTasks, {
    as: 'tasks',
    foreignKey: 'categoryId',
    foreignKeyConstraint: true
});

db.questTasks.hasMany(db.questTasksTests, {
    foreignKey: 'taskId',
    as: 'taskTests',
    foreignKeyConstraint: true
});

module.exports = db;
