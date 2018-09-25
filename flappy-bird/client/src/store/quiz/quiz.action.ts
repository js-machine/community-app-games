import { Action } from '@ngrx/store';

import { Quiz, EndGameStatistic, QuizAnswers, FinalResult, Result } from 'models';

export enum QuizActionTypes {
    StartGame = '[quiz] Start Game',
    StartGameSuccess = '[quiz] Start Game (Success)',
    StartGameError = '[quiz] Start Game (Error)',
    SaveGameResult = '[quiz] Save Game Results',
    SaveGameResultSuccess = '[quiz] Save Game Results (Success)',
    SaveGameResultError = '[quiz] Save Game Results (Error)',
    GetQuiz = '[quiz] Get Quiz',
    GetQuizSuccess = '[quiz] Get Quiz (Success)',
    GetQuizError = '[quiz] Get Quiz (Error)',
    SaveQuizAnswers = '[quiz] Save Quiz Answers',
    SaveQuizAnswersSuccess = '[quiz] Save Quiz Answers (Success)',
    SaveQuizAnswersError = '[quiz] Save Quiz Answers (Error)',
    GetResult = '[quiz] Send Get Result',
    GetResultSuccess = '[quiz] Get Result (Success)',
    GetResultError = '[quiz] Get Result (Error)',
    SendResult = '[quiz] Send Result',
    SendResultSuccess = '[quiz] Send Result (Success)',
    SendResultError = '[quiz] Send Result (Error)'
}

export class SaveGameResults implements Action {
    public readonly type = QuizActionTypes.SaveGameResult;

    constructor(public payload: EndGameStatistic) { }
}

export class SaveGameResultSuccess implements Action {
    public readonly type = QuizActionTypes.SaveGameResultSuccess;
}

export class SaveGameResultError implements Action {
    public readonly type = QuizActionTypes.SaveGameResultError;

    constructor(public payload: Error) { }
}

export class StartGame implements Action {
    public readonly type = QuizActionTypes.StartGame;

    constructor(public payload: string) { }
}

export class StartGameSuccess implements Action {
    public readonly type = QuizActionTypes.StartGameSuccess;
}

export class StartGameError implements Action {
    public readonly type = QuizActionTypes.StartGameError;

    constructor(public payload: Error) { }
}

export class GetQuiz implements Action {
    public readonly type = QuizActionTypes.GetQuiz;

    constructor(public userToken: string) { }
}

export class GetQuizSuccess implements Action {
    public readonly type = QuizActionTypes.GetQuizSuccess;

    constructor(public payload: Quiz[]) { }
}

export class GetQuizError implements Action {
    public readonly type = QuizActionTypes.GetQuizError;

    constructor(public payload: Error) { }
}

export class SaveQuizAnswers implements Action {
    public readonly type = QuizActionTypes.SaveQuizAnswers;

    constructor(public quizAnswers: QuizAnswers) { }
}

export class SaveQuizAnswersSuccess implements Action {
    public readonly type = QuizActionTypes.SaveQuizAnswersSuccess;

    constructor(public userToken: string) { }
}

export class SaveQuizAnswersError implements Action {
    public readonly type = QuizActionTypes.SaveQuizAnswersError;

    constructor(public payload: Error) { }
}

export class GetResult implements Action {
    public readonly type = QuizActionTypes.GetResult;

    constructor(public userToken: string) { }
}

export class GetResultSuccess implements Action {
    public readonly type = QuizActionTypes.GetResultSuccess;

    constructor(public result: FinalResult) { }
}

export class GetResultError implements Action {
    public readonly type = QuizActionTypes.GetResultError;

    constructor(public payload: Error) { }
}

export class SendResult implements Action {
    public readonly type = QuizActionTypes.SendResult;

    constructor(public payload: Result) { }
}

export class SendResultSuccess implements Action {
    public readonly type = QuizActionTypes.SendResultSuccess;

    constructor(public userToken: string) {}
}

export class SendResultError implements Action {
    public readonly type = QuizActionTypes.SendResultError;

    constructor(public payload: Error) { }
}

export type QuizActions =
    | SaveGameResults
    | SaveGameResultSuccess
    | SaveGameResultError
    | StartGame
    | StartGameSuccess
    | StartGameError
    | GetQuiz
    | GetQuizSuccess
    | GetQuizError
    | SaveQuizAnswers
    | SaveQuizAnswersSuccess
    | SaveQuizAnswersError
    | GetResult
    | GetResultSuccess
    | GetResultError
    | SendResult
    | SendResultSuccess
    | SendResultError;
