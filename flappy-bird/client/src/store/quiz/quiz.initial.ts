import { Status } from 'models';

import { QuizState } from './interfaces';

type State = QuizState;

export const initialState: State = {
    saveGameResultsStatus: Status.Init,
    startGameStatus: Status.Init,
    getQuizStatus: Status.Init,
    quiz: [
        {
            question: '2 + 2',
            answers: ['2', '3', '4']
        }
    ]
};
