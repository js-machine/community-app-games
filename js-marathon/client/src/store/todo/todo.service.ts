import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getTodos } from './todo.selector';
import { AddTodo, } from './todo.action';

import { State } from '../store.config';

@Injectable()
export class TodosService {
    public constructor(private store: Store<State>) { }

    public getTodos(): Observable<string[]> {
        return this.store.select(getTodos);
    }

    public addTodo(todo: string): void {
        this.store.dispatch(new AddTodo(todo));
    }
}
