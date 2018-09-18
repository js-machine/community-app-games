import { Status, Quiz } from 'models';

export interface QuizState {
    saveGameResultsStatus: Status;
    startGameStatus: Status;
    getQuizStatus: Status;
    quiz: Quiz[];
}
