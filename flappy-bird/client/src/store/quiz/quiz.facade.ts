import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { QuizState } from './interfaces';

import { quizQuery } from './quiz.selectors';
import { Quiz } from 'models';

import {
    StartGame,
    SaveGameResults,
    SendResultBeforeQuiz,
    GetQuiz,
    SaveQuizAnswers
} from './quiz.action';

interface EndGameData {
    score: number;
    question: number;
    createdAt: Date;
}

@Injectable()
export class QuizFacade {

    getQuiz$ = this.store.select(quizQuery.getQuiz);
    getQuizStatus$ = this.store.select(quizQuery.getQuizStatus);
    getResultStatus$ = this.store.select(quizQuery.getResultStatus);
    getLastSessionResult$ = this.store.select(quizQuery.getLastSessionResults);

    public constructor(
        private store: Store<QuizState>,
    ) { }

    startNewGame(userToken: string) {
        this.store.dispatch(new StartGame(userToken));
    }

    saveGameResult(data: EndGameData, userToken: string) {
        this.store.dispatch(new SaveGameResults({
            userToken,
            score: data.score,
            question: data.question,
            createdAt: data.createdAt
        }));
    }

    sendResultBeforeQuiz(userToken: string) {
        this.store.dispatch(new SendResultBeforeQuiz(userToken));
    }

    loadQuiz(userToken: string) {
        this.store.dispatch(new GetQuiz(userToken));
    }

    saveQuizAnswers(userToken: string, quiz: Quiz[], updatedAt: Date) {
        this.store.dispatch(new SaveQuizAnswers({
            userToken,
            quiz,
            updatedAt
        }));
    }
}
