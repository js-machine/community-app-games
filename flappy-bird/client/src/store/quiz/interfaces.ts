import { Status, Quiz, FinalResult } from 'models';

export interface QuizState {
    saveGameResultsStatus: Status;
    startGameStatus: Status;
    getQuizStatus: Status;
    saveQuizAnswersStatus: Status;
    getResultStatus: Status;
    sendResultBeforeQuizStatus: Status;
    sendResultAfterQuizStatus: Status;
    quiz: Quiz[];
    lastSessionResults: FinalResult;
}
