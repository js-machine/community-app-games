export interface PlayersBind {
    room: string;
    players: string[];
}

export enum RoomStatus {
    INIT,
    GAME_STARTED,
    GAME_FINISHED
}

export enum ResultStatus {
    INIT,
    WIN,
    LOSE,
    DEAD_HEAT,
}

export enum ParticipationStatus {
    INIT,
    LEAVE,
    PLAY
}

export interface Player {
    playerToken: string;
    playerSocket: string;
    participationStatus: ParticipationStatus;
    resultStatus: ResultStatus;

}

export interface Room {
    roomToken: string;
    players: Player[];
    status: RoomStatus;
}

export interface DbConfig {
    connection: {
        host: string;
        user: string;
        password: string;
    };
    database: string;
    appTokenModel: string;
    appTokenTable: string;
}
