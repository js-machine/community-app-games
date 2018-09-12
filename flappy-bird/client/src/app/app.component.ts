import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { TodosService } from 'store/todo';
import { gameCore } from 'js/main';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  public todo: string;
  public title = 'client';
  public zIndex = 1;
  public constructor(private todosStoreService: TodosService) { }

  public addTodo(): void {
    this.todosStoreService.addTodo(this.todo);
  }

  public ngAfterViewInit() {
    gameCore();
  }

  public onFinishQuiz(text: string) {
    console.log(text);
    this.zIndex = 2;
  }
}
