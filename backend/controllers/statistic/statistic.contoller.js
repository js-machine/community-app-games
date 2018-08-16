const ApplicationTokenService = require('../../services/application-token/application-token.service');
const applicationTokenService = new ApplicationTokenService();
const StatisticService = require('../../services/statistic/statistic.service');
const statisticService = new StatisticService();

const RoomRepositoryService = require('./../../services/room/room.repository.service');
const roomRepositoryService = new RoomRepositoryService();
module.exports = class StatisticController {
    constructor(app) {
        app.post('/api/finish-game', (request, response) => {
            applicationTokenService.getApplicationToken()
                .then((applicationToken) => {
                    if (request.headers.authorization === applicationToken) {
                        statisticService.saveResults({}, applicationToken).then(() => {
                            response.status(200).send();
                        });
                    } else {
                        response.status(401).send('You don`t have application token');
                    }
                });
        });
    }
}