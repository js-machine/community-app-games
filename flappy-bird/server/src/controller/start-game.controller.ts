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
        const userToken = 'daaaad8a92-a650-4afa-9a8-9880611dc2d2';

        // const userToken = request.body;

        try {
            const isAdd = await this.startGameService.startGame(userToken);
            response.status(200).send({status: isAdd});
        } catch (err) {
            response.status(400).json({status: 'error', message: err});
        }
    }
}
