const PlayerBindRepositoryService = require('./players-bind.repository.service');
const playerBindRepositoryService = new PlayerBindRepositoryService();

const roomService = require('../room/room.service');
// const roomService = new RoomService();

module.exports = class PlayerBindService {
  savePlayersBind(playersBind) {

    if (this.checkPlayersBind(playersBind)) {
      playerBindRepositoryService.savePlayersBind(playersBind);
      roomService.addRoom(playersBind);
    }
  }

  checkPlayer(playersToken) {
    let player = playerBindRepositoryService.getPlayersBinds()
      .find((playersBind) => playersBind.players
        .find((player) => playersToken == player));

    return !!player;
  }

  checkPlayersBind(playersBind) {
    if (!playersBind.room) {
      throw new Error(`Request body don't have 'room' property`);
    } else if (!playersBind.players) {
      throw new Error(`Request body don't have 'players' property`);
    }
    else {
      return true;
    }
  }
}
