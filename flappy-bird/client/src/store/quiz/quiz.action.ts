import { Action } from '@ngrx/store';

import { Quiz, EndGameStatistic } from 'models';

export enum QuizActionTypes {
    StartGame = '[quiz] Start Game',
    StartGameSuccess = '[quiz] Start Game Success',
    StartGameError = '[quiz] Start Game Error',
    SaveGameResult = '[quiz] Save Game Results',
    SaveGameResultSuccess = '[quiz] Save Game Results Success',
    SaveGameResultError = '[quiz] Save Game Results Error',
    GetQuiz = '[quiz] Get Quiz',
    GetQuizSuccess = '[quiz] Get Quiz Success',
    GetQuizError = '[quiz] Get Quiz Error'
}

export class SaveGameResults implements Action {
    public readonly type = QuizActionTypes.SaveGameResult;

    constructor(public payload: EndGameStatistic) { }
}

export class SaveGameResultSuccess implements Action {
    public readonly type = QuizActionTypes.SaveGameResultSuccess;

    constructor(public payload: boolean) { }
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

    constructor(public payload: boolean) { }
}

export class StartGameError implements Action {
    public readonly type = QuizActionTypes.StartGameError;

    constructor(public payload: Error) { }
}

export class GetQuiz implements Action {
    public readonly type = QuizActionTypes.GetQuiz;

    constructor(public userToken: string) {}
}

export class GetQuizSuccess implements Action {
    public readonly type = QuizActionTypes.GetQuizSuccess;

    constructor(public payload: Quiz[]) {}
}

export class GetQuizError implements Action {
    public readonly type = QuizActionTypes.GetQuizError;

    constructor(public payload: Error) {}
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
    | GetQuizError;
