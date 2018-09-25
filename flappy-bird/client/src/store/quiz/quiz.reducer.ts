import { QuizState } from './interfaces';
import { initialState } from './quiz.initial';
import { QuizActionTypes, QuizActions, GetResultError } from './quiz.action';
import { Status } from 'models';

type State = QuizState;

export const quizReducer = (state: State = initialState, action: QuizActions): State => {
    switch (action.type) {
        case QuizActionTypes.SaveGameResult:
            return {
                ...state,
                saveGameResultsStatus: Status.Fetching
            };

        case QuizActionTypes.SaveGameResultSuccess:

            return {
                ...state,
                saveGameResultsStatus: Status.Success
            };

        case QuizActionTypes.SaveGameResultError:
            return {
                ...state,
                saveGameResultsStatus: Status.Error
            };

        case QuizActionTypes.StartGame:
            return {
                ...state,
                saveGameResultsStatus: Status.Init,
                getQuizStatus: Status.Init,
                startGameStatus: Status.Fetching,
                getResultStatus: Status.Init,
                sendAnswersStatus: Status.Init,
                lastSessionResults: null
            };

        case QuizActionTypes.StartGameSuccess:
            return {
                ...state,
                startGameStatus: Status.Success
            };

        case QuizActionTypes.StartGameError:
            return {
                ...state,
                startGameStatus: Status.Error
            };

        case QuizActionTypes.GetQuiz:
            return {
                ...state,
                getQuizStatus: Status.Fetching
            };
        case QuizActionTypes.GetQuizSuccess:
            const quiz = action.payload;

            return {
                ...state,
                quiz,
                startGameStatus: Status.Init,
                saveGameResultsStatus: Status.Init,
                getQuizStatus: Status.Success
            };

        case QuizActionTypes.GetQuizError:
            return {
                ...state,
                getQuizStatus: Status.Error
            };

        case QuizActionTypes.SendQuizAnswers:
            return {
                ...state,
                quiz: [],
                sendAnswersStatus: Status.Fetching
            };

        case QuizActionTypes.SendQuizAnswersSuccess:
            return {
                ...state,
                sendAnswersStatus: Status.Success,
                getQuizStatus: Status.Init
            };

        case QuizActionTypes.SendQuizAnswersError:
            return {
                ...state,
                sendAnswersStatus: Status.Error
            };

        case QuizActionTypes.GetResult:
            return {
                ...state,
                getResultStatus: Status.Fetching
            };

        case QuizActionTypes.GetResultSuccess:
            return {
                ...state,
                lastSessionResults: action.result,
                getResultStatus: Status.Success,
                getQuizStatus: Status.Init
            };

        case QuizActionTypes.GetResultError:
            return {
                ...state,
                getResultStatus: Status.Error
            };

        default:
            return state;
    }
};
