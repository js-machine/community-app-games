import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { AppTokenRepository } from 'service/app-token';

import { inject } from 'inversify';
import { QuizService } from '../service/quiz';

@controller('/api')
export class QuizController {
    public constructor(
        @inject(AppTokenRepository) private appTokenRepository: AppTokenRepository,
        @inject(QuizService) private quizService: QuizService) {
    }

    @httpGet('/get-quiz')
    public async getQuiz(request: Request, response: Response): Promise<void | Response> {
        // const userToken = request.body;
        const userToken = 'd3268a92-a650-4afa-9a86-9880611dc2d2';
        try {
            const quiz = await this.quizService.getQuiz(userToken);

            return response.status(200).send(quiz);
        } catch (err) {
            return response.status(400).json({status: 'error', message: `Unknown user!`});
        }
    }
}
