import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Status } from 'models';

import { QuizFacade } from 'store';

import { Subscription } from 'rxjs';

import {faCheck, faTimes, faCircle} from '@fortawesome/free-solid-svg-icons';

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
  public questionsAndAnswers: string[];
  public status: Status = Status.Init;
  public isCorrectAnswer: boolean;

  public faCheck = faCheck;
  public faTimes = faTimes;
  public faCircle = faCircle;

  private userToken: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizFacade: QuizFacade
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.route.paramMap.subscribe(params => {
      this.userToken = params.get('userToken');
    }));

    this.subscriptions.push(this.quizFacade.getResultStatus$.subscribe(status => {
      this.status = status;
    }));

    this.subscriptions.push(this.quizFacade.getLastSessionResult$.subscribe(result => {
      this.totalScore = result ? result.totalScore : 0;
      this.totalQuestions = result ? result.totalQuestions : 0;
      this.correctAnswers = result ? result.correctAnswers : 0;
      this.questionsAndAnswers = result ? result.questionsAndAnswers : [];
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
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }
  }
}
