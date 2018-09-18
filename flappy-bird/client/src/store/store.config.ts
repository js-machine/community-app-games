import { quizReducer, QuizState } from './quiz';
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
    quiz: QuizState;
    todo: TodoState;
}

export const reducers: any = {
    quiz: quizReducer,
    todo: todoReducer
};
