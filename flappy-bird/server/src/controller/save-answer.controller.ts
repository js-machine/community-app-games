import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { SaveAnswerService } from 'service/save-answer';

import { inject } from 'inversify';
import { technicalErr } from 'errors';
import { Quiz } from 'model';

@controller('/api')
export class SendAnswerController {
    public constructor(
        @inject(SaveAnswerService) private saveAnswerService: SaveAnswerService) {
    }

    @httpPost('/save-quiz-answer')
    public async saveQuizAnswers(request: Request, response: Response): Promise<void | Response> {
        const userToken: string = request.body.userToken;
        const quiz: Quiz[] = request.body.quiz;
        const updatedAt: Date = request.body.updatedAt;

        try {
            const isSave = await this.saveAnswerService.saveAnswers(userToken, quiz, updatedAt);

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
