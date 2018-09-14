import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { SendAnswerService } from 'service/send-answer';

import { inject } from 'inversify';

@controller('/api')
export class SendAnswerController {
    public constructor(
        @inject(SendAnswerService) private sendAnswerService: SendAnswerService) {
    }

    @httpGet('/send-answer')
    public async startGame(request: Request, response: Response): Promise<void | Response> {
        const userToken = 'd3268a92-a650-4afa-9a86-9880611dc2d2';
        const question = 'Какое понятие не относится к основным понятиям ООП?';
        const answers = [
            'Мультипликация'
        ];

        try {
            const isRight = await this.sendAnswerService.sendAnswer(question, answers, userToken);
            response.status(200).send({status: isRight});
        } catch (err) {
            return response.status(400).json({status: 'error', message: `Problem with send answer!`});
        }
    }
}
