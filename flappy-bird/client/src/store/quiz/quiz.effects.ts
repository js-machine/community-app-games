import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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
  SaveQuizAnswers,
  SaveQuizAnswersSuccess,
  SaveQuizAnswersError,
  GetResultSuccess,
  GetResultError,
  SendResultBeforeQuiz,
  SendResultBeforeQuizSuccess,
  SendResultBeforeQuizError,
  SendResultAfterQuizSuccess,
  SendResultAfterQuizError

} from './quiz.action';

import { QuizService } from './quiz.service';
import { Quiz, FinalResult } from 'models';

@Injectable()
export class QuizEffects {
  saveGameResults$: Observable<SaveGameResultSuccess | SaveGameResultError> = createEffect(() => this.actions$.pipe(
    ofType<SaveGameResults>(QuizActionTypes.SaveGameResult),
    switchMap(({ payload:
      { userToken, score, question, createdAt } }) => this.quizService.saveGameResults(userToken, score, question, createdAt)
      .pipe(
        map(() => new SaveGameResultSuccess()),
        catchError((error: Error) => of(new SaveGameResultError(error)))
      )
    )
  ));

  startGame$: Observable<StartGameSuccess | StartGameError> = createEffect(() => this.actions$.pipe(
    ofType<StartGame>(QuizActionTypes.StartGame),
    switchMap(({ payload }) => this.quizService.startGame(payload)
      .pipe(
        map(() => new StartGameSuccess()),
        catchError((error: Error) => of(new StartGameError(error)))
      )
    )
  ));

  getQuiz$: Observable<GetQuizSuccess | GetQuizError> = createEffect(() => this.actions$.pipe(
    ofType<GetQuiz>(QuizActionTypes.GetQuiz),
    switchMap(({ userToken }) => this.quizService.getQuiz(userToken)
      .pipe(
        map((quiz: Quiz[]) => new GetQuizSuccess(quiz)),
        catchError((error: Error) => of(new GetQuizError(error)))
      )
    )
  ));

  saveQuizAnswer$: Observable<SaveQuizAnswersSuccess | SaveQuizAnswersError> = createEffect(() => this.actions$.pipe(
    ofType<SaveQuizAnswers>(QuizActionTypes.SaveQuizAnswers),
    switchMap(({ quizAnswers }) => this.quizService.saveQuizAnswers(quizAnswers)
      .pipe(
        map((userToken: string) => new SaveQuizAnswersSuccess(userToken)),
        catchError((error: Error) => of(new SaveQuizAnswersError(error)))
      )
    )
  ));

  saveQuizAnswerSuccess$: Observable<SendResultAfterQuizSuccess | SendResultAfterQuizError> = createEffect(() => this.actions$.pipe(
    ofType<SaveQuizAnswersSuccess>(QuizActionTypes.SaveQuizAnswersSuccess),
    switchMap(({ userToken }) => this.quizService.sendResultAfterQuiz(userToken)
      .pipe(
        map((token: string) => new SendResultAfterQuizSuccess(token)),
        catchError((error: Error) => of(new SendResultAfterQuizError(error)))
      )
    )
  ));

  sendResultAfterQuizSuccess$: Observable<GetResultSuccess | GetResultError> = createEffect(() => this.actions$.pipe(
    ofType<SendResultAfterQuizSuccess>(QuizActionTypes.SendResultAfterQuizSuccess),
    switchMap(({ userToken }) => this.quizService.getResult(userToken)
      .pipe(
        map((result: FinalResult) => new GetResultSuccess(result)),
        catchError((error: Error) => of(new GetResultError(error)))
      )
    )
  ));

  sendResultBeforeQuiz$: Observable<SendResultBeforeQuizSuccess | SendResultBeforeQuizError> = createEffect(() => this.actions$.pipe(
    ofType<SendResultBeforeQuiz>(QuizActionTypes.SendResultBeforeQuiz),
    switchMap(({ userToken }) => this.quizService.sendResultBeforeQuiz(userToken)
      .pipe(
        map(() => new SendResultBeforeQuizSuccess()),
        catchError((error: Error) => of(new SendResultBeforeQuizError(error)))
      )
    )
  ));

  public constructor(
    private actions$: Actions,
    private quizService: QuizService
  ) { }
}
