import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import { Quiz } from '../../../models';

import { State } from 'store';
import { SendQuizAnswers } from 'store/quiz/quiz.action';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  public form: FormGroup;
  public question: string;
  public answers: string[];

  public quiz: Quiz[] = [];
  private currentQuiz = 0;
  private userAnswers: Quiz[] = [];
  private userToken: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<State>,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.createControls();

    this.route.paramMap.subscribe(params => {
      this.userToken = params.get('userToken');
    });

    this.store.select('quiz').subscribe((quiz) => {
      this.quiz = quiz.quiz;

      if (this.quiz[this.currentQuiz]) {
        this.answers = this.quiz[this.currentQuiz].answers;
        this.question = this.quiz[this.currentQuiz].question;
        this.createControls();
      }
    });
  }

  public onSubmit() {
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

      this.createControls();
    } else {
      this.store.dispatch(new SendQuizAnswers({
        userToken: this.userToken,
        quiz: this.userAnswers
      }));

      this.router.navigate(['./result', this.userToken]);
    }
  }

  private createControls() {
    const controls = (this.answers && this.answers.length) ? this.answers.map(c => new FormControl(false)) : [];

    this.form = this.formBuilder.group({
      answers: new FormArray(controls)
    });
  }
}
