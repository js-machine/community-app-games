import { Component, ViewEncapsulation, AfterViewInit, OnInit } from '@angular/core';
import { gameCore, onGameEnd } from 'js/main';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { State, /* QuizActions */ } from 'store';
import { StartGame, SaveGameResults } from 'store/quiz/quiz.action';



interface EndGameData {
  score: number;
  question: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements AfterViewInit, OnInit {
  private userToken: string;

  public constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) { }

  public ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userToken = params.get('userToken');
    });
    this.store.dispatch(new StartGame(this.userToken));
    this.endGame();
  }

  public ngAfterViewInit() {
    gameCore();
  }

  private endGame() {
    onGameEnd.subscribe((data: EndGameData) =>
      this.store.dispatch(new SaveGameResults (
        this.userToken,
        data.score,
        data.question
      ))
    );
  }
}

