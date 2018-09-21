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
    GetQuizError,
    SendQuizAnswers,
    SendQuizAnswersSuccess,
    SendQuizAnswersError,
    GetResult,
    GetResultSuccess,
    GetResultError

} from './quiz.action';

import { QuizService } from './quiz.service';
import { Quiz, FinalResult } from 'models';

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

    @Effect() public sendQuizAnswer$: Observable<SendQuizAnswersSuccess | SendQuizAnswersError> = this.actions$.pipe(
        ofType<SendQuizAnswers>(QuizActionTypes.SendQuizAnswers),
        switchMap(({ quizAnswers }) => this.quizService.sendQuizAnswers(quizAnswers)
            .pipe(
                map((userToken: string) => new SendQuizAnswersSuccess(userToken)),
                catchError((error: Error) => of(new SendQuizAnswersError(error)))
            )
        )
    );

    @Effect() public sendQuizAnswerSuccess$: Observable<GetResultSuccess | GetResultError> = this.actions$.pipe(
        ofType<SendQuizAnswersSuccess>(QuizActionTypes.SendQuizAnswersSuccess),
        switchMap(({ userToken }) => this.quizService.getResult(userToken)
            .pipe(
                map((result: FinalResult) => new GetResultSuccess(result)),
                catchError((error: Error) => of(new GetResultError(error)))
            )
        )
    );

    // @Effect() public getResult$: Observable<GetResultSuccess | GetResultError> = this.actions$.pipe(
    //     ofType<GetResult>(QuizActionTypes.GetResult),
    //     switchMap(({ userToken }) => this.quizService.getResult(userToken)
    //         .pipe(
    //             map((result: FinalResult) => new GetResultSuccess(result)),
    //             catchError((error: Error) => of(new GetResultError(error)))
    //         )
    //     )
    // );

    public constructor(
        private actions$: Actions,
        private quizService: QuizService
    ) { }
}
