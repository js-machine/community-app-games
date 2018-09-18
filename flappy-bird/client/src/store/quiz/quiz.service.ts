import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quiz } from 'models';

@Injectable()
export class QuizService {
    private serverUrl = 'http://localhost:8030/api/';

    constructor(
        private http: HttpClient
    ) { }

    saveGameResults(userToken: string, score: number, question: number): Observable<boolean> {
        const body = {
            userToken,
            score,
            question
        };

        return this.http.post(this.serverUrl + 'save-game-results', body).pipe(
            map<Response, boolean>(response => !!response)
        );
    }

    startGame(userToken: string): Observable<boolean> {
        const body = { userToken };

        return this.http.post(this.serverUrl + 'start-game', body).pipe(
            map<Response, boolean>(response => !!response)
        );
    }

    getQuiz(userToken: string): Observable<Quiz[]> {
        const body = { userToken };

        return this.http.post(this.serverUrl + 'get-quiz', body).pipe(
            map<Response, Quiz[]>(response => {
                return (response.json ? response.json() : response);
            })
        );
    }
}
