const ApplicationTokenRepositoryService = require('./application-token.repository.service');
const applicationTokenRepositoryService = new ApplicationTokenRepositoryService();

module.exports = class ApplicationTokenService {

  getApplicationToken() {
    return new Promise((resolve, reject) => {
      applicationTokenRepositoryService.getToken()
        .then((token) => resolve(this.updateApplicationToken(token)))
        .catch((error) => {
          reject(error);
        });
    });
  }

  async saveApplicationToken(token) {
    try {
      await applicationTokenRepositoryService.saveToken(token);
    } catch (error) {
      console.log(error)
      throw new Error('Fail save application token');
    }
  }

  updateApplicationToken(token) {
    let fullToken = 'Bearer ' + token;

    return fullToken;
  }
}
