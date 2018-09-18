import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';

import { inject } from 'inversify';
import { GameService } from '../service/game';

import { technicalErr } from './../../errors';

@controller('/api')
export class GameController {
    public constructor(
        @inject(GameService) private gameService: GameService) {
    }

    @httpPost('/save-game-results')
    public async saveGameResult(request: Request, response: Response): Promise<void | Response> {
        const userToken: string = request.body.userToken;
        const score: number = request.body.score;
        const question: number = request.body.question;

        try {
            const isSaveResults = await this.gameService.saveGameResult(userToken, score, question);

            return response.status(200).send(isSaveResults);
        } catch {
            return response.status(400).json({
                status: 'error',
                message: technicalErr.gameService.saveResults.msg
            });
        }
    }
}
