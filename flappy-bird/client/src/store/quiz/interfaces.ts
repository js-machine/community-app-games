import { Status, Quiz, FinalResult } from 'models';

export interface QuizState {
    saveGameResultsStatus: Status;
    startGameStatus: Status;
    getQuizStatus: Status;
    sendAnswersStatus: Status;
    getResultStatus: Status;
    quiz: Quiz[];
    lastSessionResults: FinalResult;
}
