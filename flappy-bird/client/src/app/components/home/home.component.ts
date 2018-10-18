import { Component, ViewEncapsulation, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { gameCore, onGameEnd, onGetQuiz, onRetry, stopAllActiveGames } from 'js/main';
import { ActivatedRoute, Router } from '@angular/router';

import { QuizFacade } from 'store';
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
    public userToken: string;
    private subscriptions: Subscription[] = [];

    public constructor(
        private route: ActivatedRoute,
        private router: Router,
        private quizFacade: QuizFacade
    ) {
    }

    public ngOnInit() {
        this.subscriptions.push(this.route.paramMap.subscribe(params => {
            this.userToken = params.get('userToken');
        }));
        this.quizFacade.startNewGame(this.userToken);

        this.createSubscriptions();
    }

    public ngAfterViewInit() {
        gameCore();
    }

    private createSubscriptions() {
        this.subscriptions.push(onGameEnd
            .subscribe((data: EndGameData) =>
                this.quizFacade.saveGameResult(data, this.userToken)
            )
        );

        this.subscriptions.push(onRetry
            .subscribe(() =>
                this.quizFacade.sendResultBeforeQuiz(this.userToken)
            )
        );

        this.subscriptions.push(onGetQuiz.subscribe(() => {
            this.quizFacade.loadQuiz(this.userToken);
            this.router.navigate(['./quiz', this.userToken]);
        }));
    }

    ngOnDestroy() {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
        }
        stopAllActiveGames();
    }
}

