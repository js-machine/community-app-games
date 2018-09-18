import { Action } from '@ngrx/store';

import { EndGameStatistic } from 'models';

export enum QuizActionTypes {
    StartGame = '[quiz] Start Game',
    StartGameSuccess = '[quiz] Start Game Success',
    StartGameError = '[quiz] Start Game Error',
    SaveGameResult = '[quiz] Save Game Results',
    SaveGameResultSuccess = '[quiz] Save Game Results Success',
    SaveGameResultError = '[quiz] Save Game Results Error'
}

export class SaveGameResults implements Action {
    public readonly type: string = QuizActionTypes.SaveGameResult;

    constructor(
        public userToken: string,
        public score: number,
        public question: number
    ) { }
}

export class SaveGameResultSuccess implements Action {
    public readonly type: string = QuizActionTypes.SaveGameResultSuccess;

    constructor(public payload: boolean) { }
}

export class SaveGameResultError implements Action {
    public readonly type: string = QuizActionTypes.SaveGameResultError;

    constructor(public payload: Error) { }
}

export class StartGame implements Action {
    public readonly type: string = QuizActionTypes.StartGame;

    constructor(public payload: string) { }
}

export class StartGameSuccess implements Action {
    public readonly type: string = QuizActionTypes.StartGameSuccess;

    constructor(public payload: boolean) { }
}

export class StartGameError implements Action {
    public readonly type: string = QuizActionTypes.StartGameError;

    constructor(public payload: Error) { }
}

export type QuizActions =
    | SaveGameResults
    | SaveGameResultSuccess
    | SaveGameResultError
    | StartGame
    | StartGameSuccess
    | StartGameError;
