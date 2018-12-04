import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { GetResultService } from 'service/get-result';

import { inject } from 'inversify';
import { technicalErr } from 'errors';

@controller('/api')
export class GetResultController {
    public constructor(
        @inject(GetResultService) private getResultService: GetResultService) {
    }

    @httpPost('/get-result')
    public async getResult(request: Request, response: Response): Promise<void | Response> {
        const userToken: string = request.body.userToken;

        try {
            const result = await this.getResultService.getResult(userToken);

            return response.send(result);

        } catch (err) {
            return response.status(400).json({
                status: 'error',
                message: technicalErr.getResultService.getResult.msg
            });
        }
    }
}
