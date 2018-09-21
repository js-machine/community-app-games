import { Status } from 'models';

import { QuizState } from './interfaces';

type State = QuizState;

export const initialState: State = {
    saveGameResultsStatus: Status.Init,
    startGameStatus: Status.Init,
    getQuizStatus: Status.Init,
    sendAnswersStatus: Status.Init,
    getResultStatus: Status.Init,
    quiz: [],
    lastSessionResults: null
};
