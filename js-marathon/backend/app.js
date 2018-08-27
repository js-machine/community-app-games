const express = require('express');
const session = require('express-session');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

const http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(port);

const passport = require('passport');
const config = require('./config/config.json');

require('./passport/passport')(passport); // pass passport for configuration

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
// Configuring Passport
app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

const TimerService = require('./services/timer/timer.service');
const timerService = new TimerService();

const AppTokenController = require('./controllers/app-token/app-token.controllers');
const appTokenController = new AppTokenController(app);

const roomService = require('./services/room/room.service');
const StatisticService = require('./services/statistic/statistic.service');
const statisticService = new StatisticService();

io.on('connection',
    (socket) => {
        console.log('+++User Connected');
        socket.on('onReady', (token) => {
            roomService.addPlayerSocket(token, socket);
        })

        socket.on('disconnect',
            (msg) => {
                console.log('+++User DisConnected');
                console.dir(msg);

                let room = roomService.getRoomByPlayerSocketId(socket.id);
                if (roomService.roomIsEmpty(room)) {
                    roomService.startCountdownToFinishGame(room);
                }

            }
        );
    }
);

const RedirectController = require('./controllers/redirect/redirect.controller');
let redirectController = new RedirectController(app);

const RoomController = require('./controllers/room/room.controller');
let roomController = new RoomController(app);

const PlayersBindController = require('./controllers/players-bind/players-bind.controller');
let playersBindController = new PlayersBindController(app);
const StatisticController = require('./controllers/statistic/statistic.contoller');
let statisticController = new StatisticController(app);

require('./routes/routes')(app, passport);

app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send('error');
});

module.exports = app;
