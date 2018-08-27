import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TodoActionsTypes, AddTodoError, AddTodoSuccess } from './todo.action';

@Injectable()
export class TodoEffects {

  @Effect() public addTodo$: Observable<AddTodoSuccess | AddTodoError> = this.actions$.pipe(
    ofType(TodoActionsTypes.AddTodo),
    switchMap((action) => this.http.get('https://www.google.by').pipe(
      map(() => new AddTodoSuccess()),
      catchError((error) => of(new AddTodoError(error))
      ))
    ));


  public constructor(
    private http: HttpClient,
    private actions$: Actions,
  ) { }
}
