import { Component, ViewEncapsulation, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { gameCore, onGameEnd, onGetQuiz } from 'js/main';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from 'store';
import { StartGame, SaveGameResults, GetQuiz } from 'store/quiz/quiz.action';

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

export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
  private userToken: string;
  private onGameEndSubscription;
  private onGetQuizSubscription;

  public constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private router: Router
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
    this.onGameEndSubscription = onGameEnd
      .subscribe((data: EndGameData) =>
        this.store.dispatch(new SaveGameResults({
          userToken: this.userToken,
          score: data.score,
          question: data.question
        }))
      );

    this.onGetQuizSubscription = onGetQuiz.subscribe(() => {
      this.store.dispatch(new GetQuiz(this.userToken));
      this.router.navigate(['./quiz', this.userToken]);
    });
  }

  ngOnDestroy() {
    this.onGameEndSubscription.unsubscribe();
    this.onGetQuizSubscription.unsubscribe();
  }
}

