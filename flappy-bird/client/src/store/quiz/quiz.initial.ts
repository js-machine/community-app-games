import { Status } from 'models';

import { QuizState } from './interfaces';

type State = QuizState;

export const initialState: State = {
    saveGameResultsStatus: Status.Init,
    startGameStatus: Status.Init,
    getQuizStatus: Status.Init,
    saveQuizAnswersStatus: Status.Init,
    getResultStatus: Status.Init,
    sendResultBeforeQuizStatus: Status.Init,
    sendResultAfterQuizStatus: Status.Init,
    quiz: [],
    lastSessionResults: null
};
