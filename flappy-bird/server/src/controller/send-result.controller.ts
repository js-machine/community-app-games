import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { SendResultService } from 'service/send-result';

import { inject } from 'inversify';
import { technicalErr } from 'errors';

@controller('/api')
export class SendResultController {
    public constructor(
        @inject(SendResultService) private sendResultService: SendResultService) {
    }

    @httpPost('/send-result')
    public async saveQuizAnswers(request: Request, response: Response): Promise<void | Response> {
        const userToken: string = request.body.userToken;
        const isAfterQuiz: boolean = request.body.isAfterQuiz;

        try {
            const isSend = await this.sendResultService.sendResult(userToken, isAfterQuiz);

            if (isSend) {
                return response.status(200).json(userToken);
            }

        } catch (err) {
            return response.status(400).json({
                status: 'error',
                message: technicalErr.sendResultService.sendResult.msg
            });
        }
    }
}
