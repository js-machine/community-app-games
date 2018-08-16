'use strict';

let rest = require('epilogue');
let epilogueAssociationWrite = require('epilogue-association-write');

function generateRoutes(db) {
    let router = require('express').Router();

    // Initialize epilogue
    rest.initialize({
        app: router,
        sequelize: db.connect
    });
    // Create REST resource
    let userResource = rest.resource({
        model: db.users,
        endpoints: ['/users', '/users/:id'],
        // association: true,
        search: {
            attributes: ['name', 'isActive']
        },
        // actions: options.actions,
        // include: options.include,
        // pagination: options.pagination,
        // updateMethod: this.updateMethod,
        // sort: options.sort,
        // reloadInstances: options.reloadInstances,
        // associations: options.associations,
        // excludeAttributes: options.excludeAttributes,
        // readOnlyAttributes: options.readOnlyAttributes
    });

    /*
     db.users.belongsTo(Group);

     // those are the two lines you add to support belongsTo writes.
     userResource.create.write(epilogueAssociationWrite(userResource));
     userResource.update.write(epilogueAssociationWrite(userResource));

     POST /users
     {
     firstName:'John',
     lastName: 'Doe',
     groups: [ {id: 1, role: 'Admin'}, {id: 2, role: 'User'}]
     }
     */

    //ad resources here!

    let rolesResource = rest.resource({
        model: db.roles,
        endpoints: ['/roles', '/roles/:id'],
        association: true,
        search: {
            attributes: [`name`]
        },
    });

    let userRolesResource = rest.resource({
        model: db.userRoles,
        endpoints: ['/user-roles', '/user-roles/:id'],
        association: true,
        search: {
            attributes: [`name`]
        },
        include: [{ model: db.users, as: 'users' },
        { model: db.roles, as: 'roles' }]
    });

    let quizQuestionsResource = rest.resource({
        model: db.quizQuestions,
        endpoints: ['/quiz-questions', '/quiz-questions/:id'],
        association: true,
        include: [{ model: db.quizAnswers, as: 'answers' }]

    });

    let quizAnswersResource = rest.resource({
        model: db.quizAnswers,
        endpoints: ['/quiz-answers', '/quiz-answers/:id'],
        // association: true,
        search: {
            attributes: [`questionId`]
        },

    });

    let quizSettingsResource = rest.resource({
        model: db.quizSettings,
        endpoints: ['/quiz-settings', '/quiz-settings/:id'],
        // association: true,
    });

    let questSettingsResource = rest.resource({
        model: db.questSettings,
        endpoints: ['/quest-settings', '/quest-settings/:id'],
        // association: true,
    });

    let quizUserAnswersResource = rest.resource({
        model: db.quizUserAnswers,
        endpoints: ['/quiz-user-answers', '/quiz-user-answers/:id'],
        // association: true,
        search: {
            attributes: ['userId', 'answerId']
        },

    });

    let quizUsersResultsResource = rest.resource({
        model: db.quizUsersResults,
        endpoints: ['/quiz-users-results', '/quiz-users-results/:id'],
        association: true,
        include: [
            { model: db.users, as: 'user' } // TODO: security issue - all information about users (need leave only name)
        ],
        search: {
            attributes: ['userId', 'questionId']
        },

    });

    let questCategoriesResource = rest.resource({
        model: db.questCategories,
        endpoints: ['/quest-categories', '/quest-categories/:id'],
        association: true,
        include: [
            {
                model: db.questTasks, as: 'tasks', include:
                    { model: db.questTasksTests, as: 'taskTests' }
            }
        ],
        search: {
            attributes: ['categoryDifficulty']
        },
    });

    let questTasksResource = rest.resource({
        model: db.questTasks,
        endpoints: ['/quest-tasks', '/quest-tasks/:id'],
        association: true,
        include: [{ model: db.questTasksTests, as: 'taskTests' }],
        search: {
            attributes: ['categoryId']
        },

    });

    let questTasksTestsResource = rest.resource({
        model: db.questTasksTests,
        endpoints: ['/quest-tasks-tests', '/quest-tasks-tests/:id'],
        // association: true,
        // search: {
        //     attributes: ['taskId']
        // },
    });

    let questUserAnswersResource = rest.resource({
        model: db.questUserAnswers,
        endpoints: ['/quest-user-answers', '/quest-user-answers/:id'],
        search: {
            attributes: ['userId', 'taskId']
        },
        association: true,
        include: [
            { model: db.users, as: 'user' } // TODO: security issue - all information about users (need leave only name)
        ],
        sort: {
            param: 'orderby',
            attributes: ['userId']
        }
    });


    let adminUsersProfilesResource = rest.resource({
        model: db.users,
        endpoints: ['/admin-users-profiles', '/admin-users-profiles/:id'],
        association: true,
        include: [
            { model: db.roles },
            { model: db.userRoles }
        ],
        search: {
            attributes: ['name', 'isActive']
        },

    });

    let usersSaveIcon = rest.resource({
        model: db.users,
        endpoints: ['/users-save-icon', '/users-save-icon/:id'],
        association: false,
    });

    return router;
}

module.exports = generateRoutes;
