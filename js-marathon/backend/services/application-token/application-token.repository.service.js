let db = require('../../models');

module.exports = class ApplicationTokenRepositoryService {
  saveToken(token) {
    db.appToken.build({
      token: token
    }).save();
  }

  async getToken() {
    let token = await db.appToken.findAll();
    if (token.length !== 1) {
      throw new Error(`Application doesn't have unique token`);
    } else {
      return token[0].dataValues.token;
    }
  }
}
