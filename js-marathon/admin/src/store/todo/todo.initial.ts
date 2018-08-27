import { TodoStatus } from 'models';

import { TodoState } from './interfaces';

type State = TodoState;

export const initialState: State = {
  status: TodoStatus.INIT,
  todos: [],
};
