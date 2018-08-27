import { TodoState } from './interfaces';
import { initialState } from './todo.initial';
import { TodoActions, TodoActionsTypes } from './todo.action';
import { TodoStatus } from 'models';

type State = TodoState;

export function todoReducer(state: State = initialState, action: TodoActions): State {
    switch (action.type) {
        case TodoActionsTypes.AddTodo: {
            const todos = action.payload as string;
            return {
                ...state,
                status: TodoStatus.ADDING,
                todos: [...state.todos, todos]
            };
        }
        case TodoActionsTypes.AddTodoSuccess: {
            return {
                ...state,
                status: TodoStatus.ADDED,
            };
        }
        case TodoActionsTypes.AddTodoError: {
            return {
                ...state,
                status: TodoStatus.ERROR,
            };
        }
        default: {
            return state;
        }
    }
}
