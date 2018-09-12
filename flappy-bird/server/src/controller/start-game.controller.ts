import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { StartGameService } from 'service/start-game';

import { inject } from 'inversify';

@controller('/api')
export class StartGameController {
    public constructor(
        @inject(StartGameService) private startGameService: StartGameService) {
    }

    @httpGet('/start-game')
    public async startGame(request: Request, response: Response): Promise<void | Response> {
        const userToken = 'd3268a92-a650-4afa-9a86-9880611dc2d2';
        // const userToken = request.body;

        try {
            const isAdd = await this.startGameService.startGame(userToken);
            response.status(200).send(isAdd);
        } catch (err) {
            return response.status(400).json(err);
        }
    }
}
