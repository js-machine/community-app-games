import { createFeatureSelector, createSelector} from '@ngrx/store';

import { QuizState } from './interfaces';

const getQuizState = createFeatureSelector<QuizState>('quiz');


const getSaveGameResultsStatus = createSelector(
    getQuizState,
    (state: QuizState) => state.saveGameResultsStatus
);

const getStartGameStatus = createSelector(
    getQuizState,
    (state: QuizState) => state.startGameStatus
);

const getQuizStatus = createSelector(
    getQuizState,
    (state: QuizState) => state.getQuizStatus
);

const getSaveQuizAnswersStatus = createSelector(
    getQuizState,
    (state: QuizState) => state.saveQuizAnswersStatus
);

const getResultStatus = createSelector(
    getQuizState,
    (state: QuizState) => state.getResultStatus
);

const getSendResultBeforeQuizStatus = createSelector(
    getQuizState,
    (state: QuizState) => state.sendResultBeforeQuizStatus
);

const getSendResultAfterQuizStatus = createSelector(
    getQuizState,
    (state: QuizState) => state.sendResultAfterQuizStatus
);

const getQuiz = createSelector(
    getQuizState,
    (state: QuizState) => state.quiz
);

const getLastSessionResults = createSelector(
    getQuizState,
    (state: QuizState) => state.lastSessionResults
);

const getQuestions = createSelector(
    getQuizState,
    (state: QuizState) => state.lastSessionResults.questionsAndAnswers
);

export const quizQuery = {
    getSaveGameResultsStatus,
    getStartGameStatus,
    getQuizStatus,
    getSaveQuizAnswersStatus,
    getResultStatus,
    getSendResultBeforeQuizStatus,
    getSendResultAfterQuizStatus,
    getQuiz,
    getLastSessionResults,
    getQuestions
};
