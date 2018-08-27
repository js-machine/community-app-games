import { TodoStatus } from 'models';

export interface TodoState {
  status: TodoStatus;
  todos: string[];
}
