import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { SendAnswerService } from 'service/send-answer';

import { inject } from 'inversify';
import { technicalErr } from 'errors';
import { Quiz } from 'model';

@controller('/api')
export class SendAnswerController {
    public constructor(
        @inject(SendAnswerService) private sendAnswerService: SendAnswerService) {
    }

    @httpPost('/send-quiz-answer')
    public async sendQuizAnswers(request: Request, response: Response): Promise<void | Response> {
        const userToken: string = request.body.userToken;
        const quiz: Quiz[] = request.body.quiz;

        try {
            const isSave = await this.sendAnswerService.sendAnswers(userToken, quiz);

            if (isSave) {
                return response.json(userToken);
            }

        } catch (err) {
            return response.status(400).json({
                status: 'error',
                message: technicalErr.sendAnswerService.sendAnswer.msg
            });
        }
    }
}
