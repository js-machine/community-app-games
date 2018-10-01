import { Component, ViewEncapsulation, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { gameCore, onGameEnd, onGetQuiz, onRetry, stopAllActiveGames } from 'js/main';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from 'store';
import { StartGame, SaveGameResults, GetQuiz, SendResultBeforeQuiz } from 'store/quiz/quiz.action';
import { Subscription } from 'rxjs';

interface EndGameData {
    score: number;
    question: number;
    createdAt: Date;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
    private userToken: string;
    private subscriptions: Subscription[] = [];

    public constructor(
        private route: ActivatedRoute,
        private store: Store<State>,
        private router: Router
    ) {
    }

    public ngOnInit() {
        this.subscriptions.push(this.route.paramMap.subscribe(params => {
            this.userToken = params.get('userToken');
        }));

        this.store.dispatch(new StartGame(this.userToken));

        this.endGame();
    }

    public ngAfterViewInit() {
        gameCore();
    }

    private endGame() {
        this.subscriptions.push(onGameEnd
            .subscribe((data: EndGameData) =>
                this.store.dispatch(new SaveGameResults({
                    userToken: this.userToken,
                    score: data.score,
                    question: data.question,
                    createdAt: data.createdAt
                }))
            )
        );

        this.subscriptions.push(onRetry
            .subscribe(() => this.store.dispatch(new SendResultBeforeQuiz(this.userToken)))
        );

        this.subscriptions.push(onGetQuiz.subscribe(() => {
            this.store.dispatch(new GetQuiz(this.userToken));
            this.router.navigate(['./quiz', this.userToken]);
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
        stopAllActiveGames();
    }
}

