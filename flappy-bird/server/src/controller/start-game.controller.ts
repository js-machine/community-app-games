import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { StartGameService } from 'service/start-game';

import { inject } from 'inversify';
import { technicalErr } from './../../errors';

@controller('/api')
export class StartGameController {
    public constructor(
        @inject(StartGameService) private startGameService: StartGameService) {
    }

    @httpPost('/start-game')
    public async startGame(request: Request, response: Response): Promise<void | Response> {
        const userToken = request.body.userToken;

        try {
            const isAdd = await this.startGameService.startGame(userToken);

            if (isAdd) {
                response.status(200).send(isAdd);
            }

        } catch {
            response.status(400).json({
                status: 'error',
                message: technicalErr.startGameService.startGame.msg
            });
        }
    }
}
