const ApplicationTokenService = require('../../services/application-token/application-token.service');
const applicationTokenService = new ApplicationTokenService();

module.exports = class AppTokenController {
  constructor(app) {
    app.get('/api/app-token/:token', (request, response) => {
      let token = request.params.token;

      applicationTokenService.saveApplicationToken(token)
        .then(() => {
          response.status(200).send(true);
        })
        .catch((error) => {
          response.status(500).send(error.message);
        })
    });
  }
}
