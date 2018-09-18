import { quizReducer, QuizState } from './quiz';
import { todoReducer, TodoState } from './todo';


export enum Status {
    Initial,
    Loading,
    Success,
    Error,
    Updating,
    Deleting
}

export interface State {
    quiz: QuizState;
    todo: TodoState;
}

export const reducers: any = {
    quiz: quizReducer,
    todo: todoReducer
};
