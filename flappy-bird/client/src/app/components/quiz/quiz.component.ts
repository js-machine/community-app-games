import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import { Quiz, Status } from 'models';
import { State } from 'store';
import { SaveQuizAnswers } from 'store/quiz/quiz.action';
import { Subscription } from 'rxjs';
import { TimerService } from '../../services';

const QUIZ_TIME = 15000;
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})



export class QuizComponent implements OnInit, OnDestroy, AfterViewInit {
  public form: FormGroup;
  public question: string;
  public answers: string[];
  public status: Status = Status.Init;

  public quiz: Quiz[] = [];
  public currentTime: number;
  private currentQuiz = 0;
  private userAnswers: Quiz[] = [];
  private userToken: string;
  private storeSubscription: Subscription;
  private routerSubscription: Subscription;
  private timer;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<State>,
    private router: Router,
    private timerService: TimerService
  ) {
  }

  ngOnInit() {
    this.createControls([]);

    this.routerSubscription = this.route.paramMap.subscribe(params => {
      this.userToken = params.get('userToken');
    });

    this.storeSubscription = this.store.select('quiz').subscribe((quiz) => {

      this.quiz = quiz.quiz;
      this.status = quiz.getQuizStatus;

      if (this.quiz[this.currentQuiz]) {
        this.answers = this.quiz[this.currentQuiz].answers;
        this.question = this.quiz[this.currentQuiz].question;
        this.createControls(this.answers);
      }
    });
  }

  ngAfterViewInit() {
    if (this.status === 0 || this.status === 3) {
      this.router.navigate(['./home', this.userToken]);
    }

    this.startTimer();
  }

  public onSubmit() {
    this.timerService.end(this.timer);
    const selectedOrderIds = this.form.value.answers
      .map((v, i) => v ? this.answers[i] : null)
      .filter(v => v !== null);

    this.userAnswers.push({
      question: this.question,
      answers: selectedOrderIds
    });

    if (this.currentQuiz < this.quiz.length - 1) {
      this.currentQuiz += 1;
      this.answers = [...this.quiz[this.currentQuiz].answers];
      this.question = this.quiz[this.currentQuiz].question;

      this.createControls(this.answers);
      this.startTimer();
    } else {
      this.timerService.end(this.timer);

      this.store.select('quiz')
        .subscribe(({ getResultStatus }) => {
          if (getResultStatus === 2) {
            this.router.navigate(['./result', this.userToken]);
          }
        });

      this.store.dispatch(new SaveQuizAnswers({
        userToken: this.userToken,
        quiz: this.userAnswers,
        updatedAt: new Date()
      }));
    }
  }

  private createControls(answers: string[]) {
    const controls = answers.map(c => new FormControl(false));

    this.form = this.formBuilder.group({
      answers: new FormArray(controls)
    });
  }

  private startTimer() {
    this.timer = this.timerService.start(
      (distance) => {
        const roundDistance = Math.round(distance / 1000);
        this.currentTime = roundDistance;
      },
      () => {
        this.onSubmit();
      },
      QUIZ_TIME
    );
  }

  ngOnDestroy() {
    this.timerService.end(this.timer);

    this.storeSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}
