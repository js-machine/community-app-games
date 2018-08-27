import { Component } from '@angular/core';
import { TodosService } from 'store/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todo: string;
  public title = 'client';

  public constructor(private todosStoreService: TodosService) { }

  public addTodo(): void {
    this.todosStoreService.addTodo(this.todo);
  }
}
