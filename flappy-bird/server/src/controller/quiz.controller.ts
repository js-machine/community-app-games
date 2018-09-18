import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';

import { inject } from 'inversify';
import { QuizService } from '../service/quiz';

import { technicalErr } from './../../errors';

@controller('/api')
export class QuizController {
    public constructor(
        @inject(QuizService) private quizService: QuizService) {
    }

    @httpGet('/get-quiz')
    public async getQuiz(request: Request, response: Response): Promise<void | Response> {
        // const userToken: string = request.body.userToken;
        const userToken = 'daaaad8a92-a650-4afa-9a8-9880611dc2d2';
        try {
            const quiz = await this.quizService.getQuiz(userToken);

            return response.status(200).send(quiz);
        } catch (err) {
            return response.status(400).json({
                status: 'error',
                message: technicalErr.quizService.getQuiz.msg
            });
        }
    }
}
