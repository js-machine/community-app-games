import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private serverUrl = 'http://localhost:8030/api/';

    constructor (
        private http: HttpClient
    ) {}

    startGame(userToken: string): Promise<void> {
        const body = {userToken};

        return this.http
            .post(this.serverUrl + 'start-game', body)
                .toPromise()
                .then(response => console.log(response))
                .catch((error) => console.log(error));
    }

    saveGameResults(userToken: string, score: number, question: number): Promise<void> {
        const body = {
            userToken,
            score,
            question
        };

        return this.http
            .post(this.serverUrl + 'save-game-results', body)
                .toPromise()
                .then(response => console.log(response))
                .catch((error) => console.log(error));
    }
}
