const PlayerBindService = require('../../services/players-bind/players-bind.service');
const playerBindService = new PlayerBindService();

module.exports = class RedirectController {
    constructor(app) {
        app.get('/api/player-token/:token', (request, response) => {
            let playerToken = request.params.token;

            if (playerBindService.checkPlayer(playerToken)) {
                response.status(200).send(true);
            } else {
                response.status(401).send('You have an incorrect token');
            }
        });
    }
}
