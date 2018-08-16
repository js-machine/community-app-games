let rooms = [];

module.exports = class RoomRepositoryService {

  saveToken(token) {
    rooms.push(token);
  }
}
