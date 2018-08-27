const roomService = require('../../services/room/room.service');
// const roomService = new RoomService();

const ApplicationTokenService = require('../../services/application-token/application-token.service');
const applicationTokenService = new ApplicationTokenService();

module.exports = class RoomController {
    constructor(app) {
        app.post('/api/start-new-room', (request, response) => {
            
            applicationTokenService.getApplicationToken()
                .then((applicationToken) => {
                    if (request.headers.authorization === applicationToken) {
                        let roomToken = roomService.createToken();
                        response.status(200).send(roomToken);
                    } else {
                        response.status(401).send('You don`t have application token');
                    }
                });
        });
    }
}
