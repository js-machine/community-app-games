import { Status } from 'models';

import { QuizState } from './interfaces';

type State = QuizState;

export const initialState: State = {
    saveGameResultsStatus: Status.INIT,
    startGameStatus: Status.INIT,
    getQuizStatus: Status.INIT,
    quiz: [
        {
            question: '2 + 2',
            answers: ['2', '3', '4']
        }
    ]
};
