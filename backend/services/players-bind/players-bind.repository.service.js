let playersBinds = [];

module.exports = class PlayerBindRepositoryService {

  savePlayersBind(playersBind) {
    playersBinds.push(playersBind);
  }

  getPlayersBinds() {
    return playersBinds;
  }
}
