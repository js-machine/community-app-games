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
                saveGameResultsStatus: Status.Fetching
            };
        }
        case QuizActionTypes.SaveGameResultSuccess: {

            return {
                ...state,
                saveGameResultsStatus: Status.Success
            };
        }
        case QuizActionTypes.SaveGameResultError: {
            return {
                ...state,
                saveGameResultsStatus: Status.Error
            };
        }
        case QuizActionTypes.StartGame: {
            return {
                ...state,
                startGameStatus: Status.Fetching
            };
        }
        case QuizActionTypes.StartGameSuccess: {
            return {
                ...state,
                startGameStatus: Status.Success
            };
        }
        case QuizActionTypes.StartGameError: {
            return {
                ...state,
                startGameStatus: Status.Error
            };
        }
        case QuizActionTypes.GetQuiz: {
            return {
                ...state,
                getQuizStatus: Status.Fetching
            };
        }
        case QuizActionTypes.GetQuizSuccess: {
            const quiz = action.payload;

            return {
                ...state,
                quiz,
                getQuizStatus: Status.Success
            };
        }
        case QuizActionTypes.GetQuizError: {
            return {
                ...state,
                getQuizStatus: Status.Error
            };
        }
        default: {
            return state;
        }
    }
};
