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
    StartGame,
    GetQuiz,
    GetQuizSuccess,
    GetQuizError
} from './quiz.action';

import { QuizService } from './quiz.service';
import { Quiz } from 'models';

@Injectable()
export class QuizEffects {
    @Effect() public saveGameResults$: Observable<SaveGameResultSuccess | SaveGameResultError> = this.actions$.pipe(
        ofType<SaveGameResults>(QuizActionTypes.SaveGameResult),
        switchMap(({ payload: { userToken, score, question } }) => this.quizService.saveGameResults(userToken, score, question)
            .pipe(
                map(() => new SaveGameResultSuccess()),
                catchError((error: Error) => of(new SaveGameResultError(error)))
            )
        )
    );

    @Effect() public startGame$: Observable<StartGameSuccess | StartGameError> = this.actions$.pipe(
        ofType<StartGame>(QuizActionTypes.StartGame),
        switchMap(({ payload }) => this.quizService.startGame(payload)
            .pipe(
                map(() => new StartGameSuccess()),
                catchError((error: Error) => of(new StartGameError(error)))
            )
        )
    );

    @Effect() public getQuiz$: Observable<GetQuizSuccess | GetQuizError> = this.actions$.pipe(
        ofType<GetQuiz>(QuizActionTypes.GetQuiz),
        switchMap(({ userToken }) => this.quizService.getQuiz(userToken)
            .pipe(
                map((quiz: Quiz[]) => new GetQuizSuccess(quiz)),
                catchError((error: Error) => of(new GetQuizError(error)))
            )
        )
    );

    public constructor(
        private actions$: Actions,
        private quizService: QuizService
    ) { }
}
