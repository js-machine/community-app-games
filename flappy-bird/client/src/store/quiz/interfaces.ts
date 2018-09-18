import { Status, Quiz } from 'models';

export interface QuizState {
    saveGameResultsStatus: Status;
    startGameStatus: Status;
    quiz: Quiz[];
}
