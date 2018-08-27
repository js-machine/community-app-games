const CommunityLayer = require('community-layer').CommunityLayer;
const communityLayer = new CommunityLayer();

const statisticRepository = require('./statistic.repository');

const ResultStatus = require('./../room/resultStatus');
const ParticipationStatus = require('./../room/participationStatus');
const RoomStatus = require('./../room/roomStatus');


module.exports = class StatisticService {

    constructor() {

        this.statisticRepository = statisticRepository;
    }




	saveResults(result, roomToken) {
        return this.statisticRepository.saveResults(result, roomToken);
    }  

    removeResults(result) {
        this.statisticRepository.removeResults(result, roomToken);
    }

    finishGame(appToken, room, gameTime) {
        room.status = RoomStatus.GAME_FINISHED;
        let statistic = [];
        const usersTokensInRoom = room.players.map(p => p.playerToken )
        const isAnyStatisticForRoom = this.statisticRepository.getStatisticByRoomToken(room.roomToken);
        if(isAnyStatisticForRoom) {
            statistic = isAnyStatisticForRoom.stat;
        }


        let finalUsersStat =  [];
        usersTokensInRoom.map(token => {
            let user = room.players.find(u => u.playerToken === token);
			if(!user.playerSocket.connected) {
                user.participationStatus = ParticipationStatus.LEAVE;
            } else {
                user.participationStatus = ParticipationStatus.PLAY;
            }            
            let currentUserStat = statistic.filter(s => s.userToken === token);
            let scoresArr = currentUserStat.map(s => s.taskPoints)

            let scores = 0
            if(scoresArr.length > 0) {
                scores = scoresArr.reduce((a, b) => a + b)
            }

            let finalCurrentUserStat = {
                userToken: token,
                playedTime: gameTime / 60 / 1000,
                scores,
   
                resultStatus: user.resultStatus,
                participationStatus:  user.participationStatus
            }

          
            
            finalCurrentUserStat.resultStatus = ResultStatus.LOSE; // default
            
            finalUsersStat.push(finalCurrentUserStat);


           this.statisticRepository.cleanForRoom(room.roomToken);

        });

        // Who is winner
        finalUsersStat = this.sortBy(finalUsersStat, 'scores');
        const winner = finalUsersStat[0];

        if(finalUsersStat.every(u => u.scores === winner.scores)) {
            finalUsersStat.forEach(player => {
                
                player.resultStatus = ResultStatus.DEAD_HEAT;
            });
        } else {
            finalUsersStat.forEach(player => {

                player.resultStatus = ResultStatus.LOSE;
            });
   
            finalUsersStat[0].resultStatus = ResultStatus.WIN;
        }

        console.log('FINAL USERS STAT', finalUsersStat);

        communityLayer.gameCycle.setGameResult(finalUsersStat, appToken);
    }

    sortBy(array, property) {
        return array.sort((a, b) => {
          if (a[property] < b[property]) {
            return 1;
          }
          if (a[property] > b[property]) {
            return -1;
          }
    
          return 0;
        });
    }
};