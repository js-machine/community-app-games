import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { QUESTIONS } from '../common/mock/mock-quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  form: FormGroup;
  questions = QUESTIONS;
  answers = this.questions[1].answers;

  constructor(private formBuilder: FormBuilder) {
    const controls = this.answers.map(c => new FormControl(false));

    this.form = this.formBuilder.group({
      answers: new FormArray(controls)
    });
  }

  public onSubmit() {
    const selectedOrderIds = this.form.value.answers
      .map((v, i) => v ? this.answers[i].id : null)
      .filter(v => v !== null);

    console.log(selectedOrderIds);
  }
}
