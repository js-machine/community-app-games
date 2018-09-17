import { Component, ViewEncapsulation, AfterViewInit, OnInit } from '@angular/core';
import { gameCore, onGameEnd } from 'js/main';
import { DataService } from '../../services';
import { ActivatedRoute } from '@angular/router';

interface EndGameData {
  score: number;
  question: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation : ViewEncapsulation.None
})

export class HomeComponent implements AfterViewInit, OnInit  {
  private userToken: string;

  public constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userToken = params.get('userToken');
    });
    this.startGame();
    this.endGame();
  }

  public ngAfterViewInit() {
    gameCore();
  }

  private startGame() {
    this.dataService.startGame(this.userToken);
  }

  private endGame() {
    onGameEnd.subscribe((data: EndGameData) =>
      this.dataService.saveGameResults(
        this.userToken,
        data.score,
        data.question
      )
    );
  }
}

