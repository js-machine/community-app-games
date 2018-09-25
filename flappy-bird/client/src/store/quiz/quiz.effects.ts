import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

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
    SaveQuizAnswers,
    SaveQuizAnswersSuccess,
    SaveQuizAnswersError,
    GetResultSuccess,
    GetResultError,
    SendResult,
    SendResultSuccess,
    SendResultError

} from './quiz.action';

import { QuizService } from './quiz.service';
import { Quiz, FinalResult } from 'models';

@Injectable()
export class QuizEffects {
    @Effect() public saveGameResults$: Observable<SaveGameResultSuccess | SaveGameResultError> = this.actions$.pipe(
        ofType<SaveGameResults>(QuizActionTypes.SaveGameResult),
        switchMap(({ payload:
            { userToken, score, question, createdAt } }) => this.quizService.saveGameResults(userToken, score, question, createdAt)
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

    @Effect() public saveQuizAnswer$: Observable<SaveQuizAnswersSuccess | SaveQuizAnswersError> = this.actions$.pipe(
        ofType<SaveQuizAnswers>(QuizActionTypes.SaveQuizAnswers),
        switchMap(({ quizAnswers }) => this.quizService.saveQuizAnswers(quizAnswers)
            .pipe(
                map((userToken: string) => new SaveQuizAnswersSuccess(userToken)),
                catchError((error: Error) => of(new SaveQuizAnswersError(error)))
            )
        )
    );

    @Effect() public saveQuizAnswerSuccess$: Observable<SendResult | SendResultError> = this.actions$.pipe(
        ofType<SaveQuizAnswersSuccess>(QuizActionTypes.SaveQuizAnswersSuccess),
        switchMap(({ userToken }) => this.quizService.sendResult({userToken, isAfterQuiz: true})
            .pipe(
                map((token: string) => new SendResult({userToken: token, isAfterQuiz: true})),
                catchError((error: Error) => of(new SendResultError(error)))
            )
        )
    );

    @Effect() public sendResult$: Observable<SendResultSuccess | SendResultError> = this.actions$.pipe(
        ofType<SendResult>(QuizActionTypes.SendResult),
        switchMap(({ payload }) => this.quizService.sendResult(payload)
            .pipe(
                map((token: string) => new SendResultSuccess(token)),
                catchError((error: Error) => of(new SendResultError(error)))
            )
        )
    );

    @Effect() public sendResultSuccess$: Observable<GetResultSuccess | GetResultError> = this.actions$.pipe(
        ofType<SendResultSuccess>(QuizActionTypes.SendResultSuccess),
        switchMap(({ userToken }) => this.quizService.getResult(userToken)
            .pipe(
                map((result: FinalResult) => new GetResultSuccess(result)),
                catchError((error: Error) => of(new GetResultError(error)))
            )
        )
    );


    // @Effect() public saveQuizAnswerSuccess$: Observable<GetResultSuccess | GetResultError> = this.actions$.pipe(
    //     ofType<SaveQuizAnswersSuccess>(QuizActionTypes.SaveQuizAnswersSuccess),
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
