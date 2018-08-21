import { Action } from '@ngrx/store';

export enum TodoActionsTypes {
    AddTodo = '[todo] Add Todo',
    AddTodoSuccess = '[todo] Add Todo Success',
    AddTodoError = '[todo] Add Todo Error',
}

export class AddTodo implements Action {
    public readonly type: string = TodoActionsTypes.AddTodo;

    constructor(public payload: string) { }
}

export class AddTodoSuccess implements Action {
    public readonly type: string = TodoActionsTypes.AddTodoSuccess;

    constructor(public payload?: string) { }
}

export class AddTodoError implements Action {
    public readonly type: string = TodoActionsTypes.AddTodoError;

    constructor(public payload: Error) { }
}
export type TodoActions =
    | AddTodo
    | AddTodoSuccess
    | AddTodoError;
