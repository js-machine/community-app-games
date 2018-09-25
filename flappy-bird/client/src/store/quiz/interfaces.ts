import { Status, Quiz, FinalResult } from 'models';

export interface QuizState {
    saveGameResultsStatus: Status;
    startGameStatus: Status;
    getQuizStatus: Status;
    saveQuizAnswersStatus: Status;
    getResultStatus: Status;
    quiz: Quiz[];
    lastSessionResults: FinalResult;
}
