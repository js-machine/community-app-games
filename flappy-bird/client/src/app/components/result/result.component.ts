import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import { Status } from 'models';

import { State } from 'store';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy, AfterViewInit {
  public readonly Status = Status;

  public totalScore = 0;
  public totalQuestions = 0;
  public correctAnswers = 0;
  public status: Status = Status.Init;

  private userToken: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.route.paramMap.subscribe(params => {
      this.userToken = params.get('userToken');
    }));

    this.subscriptions.push(this.store.select('quiz').subscribe(({ lastSessionResults, getResultStatus }) => {
      this.status = getResultStatus;

      this.totalScore = lastSessionResults ? lastSessionResults.totalScore : 0;
      this.totalQuestions = lastSessionResults ? lastSessionResults.totalQuestions : 0;
      this.correctAnswers = lastSessionResults ? lastSessionResults.correctAnswers : 0;
    }));
  }

  ngAfterViewInit() {
    if (this.status === Status.Init || this.status === Status.Error) {
      this.router.navigate(['./home', this.userToken]);
    }
  }

  public onClick() {
    this.router.navigate(['./home', this.userToken]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
