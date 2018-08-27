import { todoReducer, TodoState } from './todo';

export enum Status {
    INITIAL,
    LOADING,
    SUCCESS,
    ERROR,
    UPDATING,
    DELETING
}

export interface State {
    todo: TodoState;
}

export const reducers: any = {
    todo: todoReducer
};
