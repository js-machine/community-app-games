const PlayerBindService = require('../../services/players-bind/players-bind.service');
const playerBindService = new PlayerBindService();

const ApplicationTokenService = require('../../services/application-token/application-token.service');
const applicationTokenService = new ApplicationTokenService();

module.exports = class PlayersBindController {
  constructor(app) {
    app.post('/api/set-user-bind', (request, response) => {
      applicationTokenService.getApplicationToken()
        .then((applicationToken) => {
          if (request.headers.authorization === applicationToken) {
            let errorMessage;
            try {
              playerBindService.savePlayersBind(request.body);
            } catch (error) {
              errorMessage = error.message;
            }

            if (errorMessage) {
              console.log(errorMessage);
              
              response.status(400).send(errorMessage);
            } else {
              response.status(200).send();
            }
          } else {
            response.status(401).send('You don`t have application token');
          }
        });
    });
  }
}
