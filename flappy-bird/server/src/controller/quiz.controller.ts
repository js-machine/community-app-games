import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';

import { inject } from 'inversify';
import { QuizService } from 'service/quiz';

import { technicalErr } from 'errors';

@controller('/api')
export class QuizController {
    public constructor(
        @inject(QuizService) private quizService: QuizService) {
    }

    @httpPost('/get-quiz')
    public async getQuiz(request: Request, response: Response): Promise<void | Response> {
        const userToken: string = request.body.userToken;

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
