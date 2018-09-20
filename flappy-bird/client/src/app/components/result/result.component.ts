import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import { State } from 'store';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  public totalScore = 0;
  public totalQuestions = 0;
  public correctAnswers = 0;

  private userToken: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userToken = params.get('userToken');
    });

    this.store.select('quiz').subscribe(({lastSessionResults}) => {
      this.totalScore = lastSessionResults ? lastSessionResults.totalScore : 0;
      this.totalQuestions = lastSessionResults ? lastSessionResults.totalQuestions : 0;
      this.correctAnswers = lastSessionResults ? lastSessionResults.correctAnswers : 0;
    });
  }

  public onClick() {
    this.router.navigate(['./home', this.userToken]);
  }

}
