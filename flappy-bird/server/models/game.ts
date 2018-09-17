import Sequelize from 'sequelize';
import { db } from './SequelizeConnect';
import { dbConfig } from '../config/dbconfig';
import { SequelizeStaticAndInstance } from 'sequelize';

export const GameModel: SequelizeStaticAndInstance['Model'] = db.connect.define(dbConfig.GameModel, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    question: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
}, {
        // if freezeTableName is true, sequelize will not try to alter the DAO name to get the table name.
        // otherwise, the model name will be pluralized
        freezeTableName: true,
        // defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
        tableName: dbConfig.GameTable
    });
