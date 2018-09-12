import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';

import { AppTokenRepository } from 'service/app-token';
import { PlayersBindService } from '../service/players-bind/players-bind.service';

@controller('/api')
export class PlayerBindController {
    public constructor(
        @inject(AppTokenRepository) private appTokenRepository: AppTokenRepository,
        @inject(PlayersBindService) private playersBindService: PlayersBindService) {
    }

    @httpPost('/set-user-bind')
    public async SetUserBind(request: Request, response: Response): Promise<void | Response> {
        try {
            const appToken = await this.appTokenRepository.getAppToken();

            if (request.headers.authorization === appToken) {
                let errorMessage;
                try {
                    this.playersBindService.savePlayersBind(request.body);
                } catch (error) {
                    errorMessage = error.message;
                }

                if (errorMessage) {
                    response.status(400).send(errorMessage);
                } else {
                    response.status(200).send();
                }
            } else {
                response.status(401).send('You don`t have application token');
            }
        } catch (err) {
            return response.status(400).json(err);
        }
    }
}
