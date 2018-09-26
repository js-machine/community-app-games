import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';

import { AppTokenService } from 'service/app-token';

import { technicalErr } from 'errors';
@controller('/api')
export class AppTokenController {
    public constructor(
        @inject(AppTokenService) private appTokenService: AppTokenService) {
    }

    @httpGet('/save-app-token/:token')
    public async saveAppToken(request: Request, response: Response): Promise<void | Response> {
        const appToken = request.params.token;
        try {
            const isSave = await this.appTokenService.saveAppToken(appToken);

            if (isSave) {
                response.status(200).send({status: 'Saved'});
            } else {
                response.status(400).send({status: 'Error'});
            }

        } catch (err) {
            return response.status(400)
                .json(technicalErr.appTokenRepository.getAppToken.msg);
        }
    }
}
