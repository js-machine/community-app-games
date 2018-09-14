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
    quizSettingsModel: string;
    quizSettingsTable: string;
    quizQuestionsModel: string;
    quizQuestionsTable: string;
    quizUserAnswersModel: string;
    quizUserAnswersTable: string;
    quizAnswersModel: string;
    quizAnswersTable: string;
    questionMarkModel: string;
    questionMarkTable: string;
    UserModel: string;
    UserTable: string;
}

export interface Question {
    id: number;
    question: string;
    points: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Answer {
    id: number;
    questionId: number;
    answer: string;
    isCorrect: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: number;
    userToken: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface UnAnsweredQuestion {
    id: number;
    userId: number;
    questionId: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}
