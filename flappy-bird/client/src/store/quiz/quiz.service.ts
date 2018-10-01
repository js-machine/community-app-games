import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quiz, QuizAnswers } from 'models';

@Injectable()
export class QuizService {
    private serverUrl = 'http://localhost:8030/api/';

    constructor(
        private http: HttpClient
    ) { }

    saveGameResults(userToken: string, score: number, question: number, createdAt: Date): Observable<Object> {
        const body = {
            userToken,
            score,
            question,
            createdAt
        };

        return this.http.post(this.serverUrl + 'save-game-results', body);
    }

    startGame(userToken: string): Observable<Object> {
        const body = { userToken };

        return this.http.post(this.serverUrl + 'start-game', body);
    }

    getQuiz(userToken: string): Observable<Quiz[]> {
        const body = { userToken };

        return this.http.post(this.serverUrl + 'get-quiz', body).pipe(
            map<Response, Quiz[]>(response => {
                return (response.json ? response.json() : response);
            })
        );
    }

    saveQuizAnswers(quizAnswers: QuizAnswers): Observable<Object> {
        const body = {
            userToken: quizAnswers.userToken,
            quiz: quizAnswers.quiz,
            updatedAt: quizAnswers.updatedAt
        };

        return this.http.post(this.serverUrl + 'save-quiz-answer', body);
    }

    getResult(userToken: string): Observable<Object> {
        const body = { userToken };

        return this.http.post(this.serverUrl + 'get-result', body);
    }

    sendResultBeforeQuiz(userToken: string): Observable<Object> {
        const body = {userToken};

        return this.http.post(this.serverUrl + 'send-result/' + 'before-quiz', body);
    }

    sendResultAfterQuiz(userToken: string): Observable<Object> {
        const body = {userToken};

        return this.http.post(this.serverUrl + 'send-result/' + 'after-quiz', body);
    }
}
