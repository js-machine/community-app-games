const config = require('../config/config.json');
const questions = require('../mock-data/questions');

const jwtEx = require('express-jwt');
const jwtCheck = jwtEx({
    secret: config.secret
});

const tester = require('../tester');

const db = require('../models');
const api = require('./api')(db);

const StatisticService = require('../services/statistic/statistic.service');
const statisticService = new StatisticService();
const roomService = require('../services/room/room.service');

module.exports = function (app, passport) {

    // process the login form
    app.post('/login', passport.authenticate('local-login-create', {
        failureRedirect: '/',
        session: false
    }), generateToken, respond);

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.use(jwtCheck);

    app.post('/user-answer/', (req, res) => {
        db.questUserAnswers.findOne({
            where: {
                userId: req.user.id,
                taskId: req.body.taskId
            }
        }).then(userAnswer => {
            if (!userAnswer) {
                db.questTasksTests.findAll({
                    where: {
                        taskId: req.body.taskId
                    }
                }).then((data) =>
                    tester.testJSCode(req.body.taskUserCode, data.map(i => ({
                        input: JSON.parse(i.paramInput),
                        output: i.paramOutput
                    })))
                ).then((isTestsPass) => {
                    if (isTestsPass) {
                        db.questTasks.findById(req.body.taskId)
                            .then(task => {
                                const userResult = {
                                    userId: req.user.id,
                                    userToken: req.user.name,
                                    taskId: req.body.taskId,
                                    taskSpentTime: req.body.taskSpentTime,
                                    taskPoints: task.taskPoints,
                                    taskUserCode: req.body.taskUserCode
                                }
                                db.questUserAnswers.create(userResult);

                                let roomToken = roomService.getRoomTokenByPlayerToken(req.user.name);
                                statisticService.saveResults(userResult, roomToken);
                            });
                    }
                    res.send(isTestsPass);
                });
            } else {
                res.status(403).send(false);
            }
        });
    });

    app.use('/api/protected', jwtCheck);
    app.get('/api/protected/quiz-questions', (req, res) => {
        res.status(200).send(questions.getQuiz());
    });
    app.get('/api/protected/quest-questions', (req, res) => {
        res.status(200).send(questions.getQuest());
    });

    // REST API connected
    app.use('/api', api);


    // Create database and listen
    // db.connect.sync({ force: true });

};

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function generateToken(req, res, next) {
    let jwt = require('jsonwebtoken');
    req.token = jwt.sign({
        id: req.user.id,
        name: req.user.name
    }, config.secret, {

            expiresIn: config.token_expires
        });
    next();
}

function respond(req, res) {
    req.login(req.user, () => {
        return res.status(200).send({
            id: req.user.id,
            name: req.user.name,
            userIcon: req.user.userIcon,
            userColor: req.user.userColor,
            token: req.token
        });
    })
}
