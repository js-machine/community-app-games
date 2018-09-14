const fs = require('fs');
const mysql = require('mysql');
const dbConfig = require('./config/database.config.json')

const init = () => {
    const dirname = '../db/flappy-bird'
    const createSchemeQuery = fs.readFileSync(`${dirname}/create-scheme.sql`).toString();
    const dropSchemeQuery = fs.readFileSync(`${dirname}/drop-scheme.sql`).toString();

    const initConnection = mysql.createConnection({
        host: dbConfig.connection.host,
        user: dbConfig.connection.user,
        password: dbConfig.connection.password,
    });

    initConnection.connect();
    initConnection.query(dropSchemeQuery, (error, results, fields) => {
        if (error) throw error;
    });
    initConnection.query(createSchemeQuery, (error, results, fields) => {
        if (error) throw error;

        console.log('Scheme was created');

        const connection = mysql.createConnection({
            host: dbConfig.connection.host,
            user: dbConfig.connection.user,
            password: dbConfig.connection.password,
            database: dbConfig.database
        });

        connection.connect();
        console.log('Started create scheme tables');

        fs.readdirSync(dirname + '/create-tables')
            .filter((file) => {
                return (file.indexOf('.') !== 0);
            })
            .forEach((file) => {
                let sqlQuery = fs.readFileSync(`${dirname}/create-tables/${file}`).toString();

                connection.query(sqlQuery, (error, results, fields) => {
                    if (error) throw error;
                });
            });

        console.log('Tables were created');
        console.log('Start insert data to tables');

        fs.readdirSync(dirname + '/insert-data')
            .filter((file) => {
                return (file.indexOf('.') !== 0);
            })
            .forEach(function (file) {
                let sqlQuery = fs.readFileSync(`${dirname}/insert-data/${file}`).toString();

                connection.query(sqlQuery, (error, results, fields) => {
                    if (error) throw error;
                });
            });
        connection.end();
    });
    initConnection.end();
    console.log('Init database complete');
}

init();