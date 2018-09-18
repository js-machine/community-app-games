import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
    QuizActionTypes,
    SaveGameResults,
    SaveGameResultSuccess,
    SaveGameResultError,
    StartGameSuccess,
    StartGameError,
    StartGame
} from './quiz.action';

import { QuizService } from './quiz.service';

@Injectable()
export class QuizEffects {
    @Effect() public saveGameResults$: Observable<SaveGameResultSuccess | SaveGameResultError> = this.actions$.pipe(
        ofType<SaveGameResults>(QuizActionTypes.SaveGameResult),
        switchMap(({ userToken, score, question }) => this.quizService.saveGameResults(
            userToken,
            score,
            question
        ).pipe(
            map((isSave: boolean) => new SaveGameResultSuccess(isSave)),
            catchError((error: Error) => of(new SaveGameResultError(error))
            ))
        )
    );

    @Effect() public startGame$: Observable<StartGameSuccess | StartGameError> = this.actions$.pipe(
        ofType<StartGame>(QuizActionTypes.StartGame),
        switchMap(({ payload }) => this.quizService.startGame(payload)
            .pipe(
                map((isStart: boolean) => new StartGameSuccess(isStart)),
                catchError((error: Error) => of(new StartGameError(error))
                )
            )
        )
    );

    public constructor(
        private actions$: Actions,
        private quizService: QuizService
    ) { }
}
