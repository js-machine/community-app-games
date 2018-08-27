
statistic = []
class StatisticRepository {

  
    getStatistic() {
        return statistic;
    }

 	getStatisticByRoomToken(roomToken) {
        return statistic.find(s => s.roomToken = roomToken)
    }  

    saveResults(result, roomToken) {
        var currentRoomIndex = 0;
        var statForRoom = statistic.filter((stat, index) => { 
            currentRoomIndex = index;
            return stat.roomToken === roomToken;
        });

        if(statForRoom.length === 0) {
            statistic.push({
                roomToken,
                stat: []
            })
            statistic[statistic.length - 1].stat.push(result);
        } else {
            statistic[currentRoomIndex].stat.push(result);
        }
    }

    removeResults(result) {
        let existedResultIndex = statistic.indexOf(s => s.userId === result.userId);
        statistic.splice(existedResultIndex, 1);
    }

    clean() {
        statistic = [];
    }

    cleanForRoom(roomToken) {
        statistic = statistic.filter(s => s.roomToken !== roomToken);
    }
};


module.exports = new StatisticRepository();
