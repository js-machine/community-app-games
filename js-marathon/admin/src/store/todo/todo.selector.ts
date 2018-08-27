import { createSelector, MemoizedSelector } from '@ngrx/store';

import { TodoState } from './interfaces';
import { State } from '../store.config';

const getAppTodo: (state: State) => TodoState = (state: State): TodoState => state.todo;

export const getTodos: MemoizedSelector<State, string[]> = createSelector(
    getAppTodo,
    (state: TodoState) => state.todos
);
