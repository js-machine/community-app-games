import { QuizState } from './interfaces';
import { initialState } from './quiz.initial';
import { QuizActionTypes, QuizActions, GetQuiz } from './quiz.action';
import { Status } from 'models';

type State = QuizState;

export const quizReducer = (state: State = initialState, action: QuizActions): State => {
    switch (action.type) {
        case QuizActionTypes.SaveGameResult: {
            return {
                ...state,
                saveGameResultsStatus: Status.FETCHING
            };
        }
        case QuizActionTypes.SaveGameResultSuccess: {

            return {
                ...state,
                saveGameResultsStatus: Status.SUCCESS
            };
        }
        case QuizActionTypes.SaveGameResultError: {
            return {
                ...state,
                saveGameResultsStatus: Status.ERROR
            };
        }
        case QuizActionTypes.StartGame: {
            return {
                ...state,
                startGameStatus: Status.FETCHING
            };
        }
        case QuizActionTypes.StartGameSuccess: {
            return {
                ...state,
                startGameStatus: Status.SUCCESS
            };
        }
        case QuizActionTypes.StartGameError: {
            return {
                ...state,
                startGameStatus: Status.ERROR
            };
        }
        case QuizActionTypes.GetQuiz: {
            return {
                ...state,
                getQuizStatus: Status.FETCHING
            };
        }
        case QuizActionTypes.GetQuizSuccess: {
            const quiz = action.payload;

            return {
                ...state,
                quiz,
                getQuizStatus: Status.SUCCESS
            };
        }
        case QuizActionTypes.GetQuizError: {
            return {
                ...state,
                getQuizStatus: Status.ERROR
            };
        }
        default: {
            return state;
        }
    }
};
