import Sequelize from 'sequelize';
import { db } from './SequelizeConnect';
import { dbConfig } from '../config';
import { SequelizeStaticAndInstance } from 'sequelize';

export const QuizQuestionsModel: SequelizeStaticAndInstance['Model'] = db.connect.define(dbConfig.quizQuestionsModel, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    points: {
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
        tableName: dbConfig.quizQuestionsTable
    });
