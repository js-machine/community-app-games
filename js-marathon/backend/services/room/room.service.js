const CommunityLayer = require('community-layer').CommunityLayer;
const communityLayer = new CommunityLayer();

const RoomRepositoryService = require('./room.repository.service');
const roomRepositoryService = new RoomRepositoryService();

const TimerService = require('../timer/timer.service');
const timerService = new TimerService();

const ParticipationStatus = require('./participationStatus.js');
const ResultStatus = require('./resultStatus.js');
const RoomStatus = require('./roomStatus.js');
const StatisticService = require('../statistic/statistic.service');
const ApplicationTokenService = require('../application-token/application-token.service');


let rooms = [];

const ROOM_TIME = 30000;
const TIME_TO_RETURN = 10000;
class RoomService {
  constructor() {
    this.statisticService = new StatisticService();
    this.applicationTokenService = new ApplicationTokenService();

  }

  createToken() {
    let roomToken = communityLayer.gameCycle.createRoomToken();
    roomRepositoryService.saveToken(roomToken);

    return roomToken;
  }

  roomIsEmpty(room) {
    if(!this.roomExist(room)) {
      return ;
    }
    if (room.status === RoomStatus.GAME_FINISHED) {
      return ; // to prevent final redirect disconnection
    }
    return room.players.every(p => !p.playerSocket.connected)
  }

  roomExist(room) {
    return !!room;
  }

  addRoom(playersBind) {

    const players = playersBind.players.map((playerToken) => ({
      playerToken,
      playerSocket: null,

      participationStatus: ParticipationStatus.INIT,
      resultStatus: ResultStatus.INIT
    }));
    rooms.push({
      roomToken: playersBind.room,

      players: players,
      status: RoomStatus.INIT
    });
  }

  getRoomTokenByPlayerToken(token) {
    return rooms.find(r => !!(r.players.find(p => p.playerToken === token))).roomToken;
  }
  getRoomByPlayerSocketId(socketId) {

    const room = rooms.find(r => !!(r.players.find((p) => {
      if (p.playerSocket) {
        return p.playerSocket.id === socketId
      }
    })));

    if (room) {
      return room;
    }
  }



  addPlayerSocket(findingPlayerToken, playerSocket) {
    let roomIndex = rooms
      .findIndex((room) => {
        return room.players.find((player) => {
          return player.playerToken === findingPlayerToken;
        });
      });
      
    let playerTokenIndex = rooms[roomIndex].players
      .findIndex((player) => player.playerToken == findingPlayerToken);
    rooms[roomIndex].players[playerTokenIndex].playerSocket = playerSocket;

    if (this.isReadyRoom(rooms[roomIndex])) {

      this.startBattle(rooms[roomIndex]);
    }
  }


  async startBattle(room) {

    room.players.forEach((player) => {
      try {
        player.playerSocket.emit('onStartQuest');
      } catch (error) {

      }

    });

    if (room.status === RoomStatus.GAME_FINISHED || room.status === RoomStatus.INIT) {
    room.status = RoomStatus.GAME_STARTED;
    const timer = timerService.start(
      (distance) => {
        let roundDistance = Math.round(distance / 1000);
        if (roundDistance % 30 === 0 || roundDistance === 15 || roundDistance === 10 || roundDistance === 5 || roundDistance === 1) {

          room.currentTime = roundDistance;
          if (room.status === RoomStatus.GAME_FINISHED) {
            timerService.end(timer);
          }
          this.countdown(roundDistance, room);
        }
      },
      () => {
        const playedTime = ROOM_TIME;
        this.applicationTokenService.getApplicationToken().then((applicationToken) => {
          this.statisticService.finishGame(applicationToken, room, playedTime);
        }).catch((error) => console.log(error.message));
      },
      
      ROOM_TIME)
  }
  }

  isReadyRoom(room) {
    let isReady = true;
    if (!room.roomToken) {
      isReady = false;
    }
    let players = room.players;


    players.forEach((player) => {
      if (!player.playerSocket || !player.playerToken) {
        isReady = false;
      }
    });

    return isReady;
  }

  

  countdown(distance, room) {

    room.players.forEach(player => {
      player.playerSocket.emit('updateTimer', distance);
    })
  }

  getCurrentRoomTime(room) {
    return room.currentTime;
  }

  startCountdownToFinishGame(room) {
    const timer = timerService.start(
      (distance) => {
        let roundDistance = Math.round(distance / 1000);
        if (roundDistance % 2 === 0) {

          if(!this.roomIsEmpty(room)) {
            timerService.end(timer);
          }
        }
      },
      () => {
        const playedTime = this.getCurrentRoomTime(room) + TIME_TO_RETURN;
        this.applicationTokenService.getApplicationToken().then((applicationToken) => {
          this.statisticService.finishGame(applicationToken, room, playedTime);
        }).catch((error) => console.log(error.message));
      },
      
      TIME_TO_RETURN)
  } 
}


module.exports = new RoomService();